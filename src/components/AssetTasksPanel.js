import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AddIcon from '@material-ui/icons/Add'
import TasksList, { TaskFullscreen } from './TasksList'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  addTask,
  refreshTaskComments,
} from '../actions'
import {
  TASK_ARCHIVE_STATUS,
  TASK_STATUS_CANCELLED,
} from '../constants'
import {
  getAssetTypeByCode,
  getTaskPriorityTypes,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  bottomAction: {
    width: '95%',
    position: 'absolute',
    bottom: 0,
    marging: 0,
  },
  scroll: {
    height: '50vh',
    overflowY: 'auto',
  },
}))

export const AssetName = (props) => {
  const {
    assetTypeName,
    assetTypeCode,
    assetName,
  } = props

  return (<ListItem
    disableGutters
    component='div'>
    <Tooltip title={assetTypeName} placement='left'>
      <ListItemIcon>
        <AssetTypeSvgIcon
          assetTypeCode={assetTypeCode}
        />
      </ListItemIcon>
    </Tooltip>
    <Tooltip title={assetName} placement='bottom'>
      <ListItemText
        primary={
          <Typography variant='h5' style={{ fontSize: '1rem' }}>
            {assetName}
          </Typography>
        }
      />
    </Tooltip>
  </ListItem>)
}

export default function AssetTasksPanel(props) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const {
    asset,
    tasks,
    disableInput,
  } = props

  const assetId = asset.id
  const assetName = asset.name
  const assetTypeCode = asset.typeCode
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name
  const taskPriorityTypes = useSelector(getTaskPriorityTypes)

  const [archived, setArchived] = useState(false)
  const [query, setQuery] = useState('')
  const [name, setName]  = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('')
  const [dialog, setDialog] = useState(false)	   
  const [taskDetails, setTaskDetails] = useState(false)
  
  function handleTaskAddClick() {
    setDialog(false)
    dispatch(addTask(assetId, name, description, priority))
    setName('')
    setDescription('')
    setPriority('')
  }

  const partialTasks = tasks.filter(task => task.name.includes(query)).filter(
    task => (
      !archived ?
      task.status !== TASK_ARCHIVE_STATUS && task.status !== TASK_STATUS_CANCELLED :
      task.status === TASK_ARCHIVE_STATUS || task.status === TASK_STATUS_CANCELLED
  ))

  const assetNameComponent = AssetName({
    assetName, assetTypeCode, assetTypeName })

  const handleDisplayDetails = (task) => {
    dispatch(refreshTaskComments(task.id))
    setTaskDetails(task)
  }

  const listTasks = (<>
    <FormGroup row>
      <TextField id="search" label="Search task" value={query}
                 onChange={(e) => setQuery(e.target.value) } />
      <FormControlLabel control={
        <Switch checked={archived} onChange={ () => setArchived(!archived) } value="archived" />}
                        label="Show archived tasks" />
    </FormGroup>
    <TasksList showDetails={handleDisplayDetails} showComments={() => {}} asset={asset} tasks={partialTasks} disableInput={disableInput}/>

    <Button className={classes.bottomAction} startIcon={<AddIcon />} onClick={() => setDialog(true)}>
      Add task
    </Button>
  </>)

  const getTaskById = () => {
      if (taskDetails) {
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i].id === taskDetails.id) return tasks[i]
        }
      }
      return {}
  }

  return (<>
    {assetNameComponent}
    {listTasks}

    <Dialog open={dialog} onClose={() => setDialog(false)} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add task</DialogTitle>
      <DialogContent>
        <TextField id="name" label="Task name" value={name}
                   onChange={(e) => setName(e.target.value) } />

        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='status'>Priority</InputLabel>
            <NativeSelect
              value={priority}
              onChange={ (e) => setPriority(e.target.value)}
              inputProps={{
                name: 'priority',
                  id: 'priority',
              }}
            >
              <option aria-label="None" value="" />
              {
                Object.values(taskPriorityTypes).map( priorityType => (
                  <option
                    key={`priority-type-${priorityType.code}`}
                    value={priorityType.code}>{priorityType.name}
                  </option>
                ))
              }
            </NativeSelect>
            <FormHelperText>Select the priority for the task</FormHelperText>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {setDialog(false)}}  color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleTaskAddClick}
          color='secondary'
          disabled={name === '' || priority === ''}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
    <TaskFullscreen open={taskDetails !== false} asset={asset} task={getTaskById()}
                      handleClose={ () => setTaskDetails(false)}
    />
  </>)
}
