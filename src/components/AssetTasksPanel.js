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
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import FilterListIcon from '@material-ui/icons/FilterList'
import { default as AssetNameTextField } from './AssetName'

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
  getFocusingTasks,
  getTaskPriorityTypes,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  formControl: {
    marginTop: theme.spacing(1),
    width: '100%',
  },
  bottomAction: {
    width: '100%',
    bottom: 0,
  },
  listTasks: {
    overflow: 'auto',
    marginBottom: '10px',
    height: '100%',
  },
}))


export function AssetName(props) {
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

export default function AssetTasksPanel({
  asset,
  isDetailsWindowExpanded,
  setIsDetailsWindowExpanded,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const tasks = useSelector(getFocusingTasks)

  const assetId = asset.id
  // const assetName = asset.name
  const assetTypeCode = asset.typeCode
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name
  const taskPriorityTypes = useSelector(getTaskPriorityTypes)
  const priorityTypeNormal = taskPriorityTypes['10'].code

  const [archived, setArchived] = useState(false)
  const [query, setQuery] = useState('')
  const [name, setName]  = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(priorityTypeNormal)
  const [dialog, setDialog] = useState(false)	   
  const [taskDetails, setTaskDetails] = useState(false)
  const [anchorEl, setAnchorEl] = useState(false)
  const [taskFilter, setTaskFilter] = useState(false)

  function handleClickToCreateAddTask() {
    setDialog(false)
    dispatch(addTask(assetId, name, description, priority))
    setName('')
    setDescription('')
    setPriority(priorityTypeNormal)
  }

  const notArchived = (task) => { return task.status !== TASK_ARCHIVE_STATUS && task.status !== TASK_STATUS_CANCELLED }
  const isArchived = (task) => { return task.status === TASK_ARCHIVE_STATUS || task.status === TASK_STATUS_CANCELLED }

  const partialTasks = tasks.filter(task => task.name.includes(query)).filter(
    task => (
      taskFilter ?
        (
          !archived ?
            notArchived(task) && task.priority === taskFilter :
            isArchived(task) && task.priority === taskFilter
        )
      :
        (
          !archived ?
            notArchived(task) :
            isArchived(task)
        )
    ),
  )

  const handleDisplayDetails = (task) => {
    dispatch(refreshTaskComments(task.id))
    setTaskDetails(task)
  }

  const selectTaskFilter = (event) => {
    setTaskFilter(event.target.value)
    setAnchorEl(false)
  }

  const listTasks = (<>
    <FormGroup row>
      <TextField fullWidth id="search" label="Search task" value={query}
        onChange={(e) => setQuery(e.target.value) } />
      <div className={classes.actions}>
        <FormControlLabel control={
          <Switch checked={archived} onChange={ () => setArchived(!archived) } value="archived" />}
          label="Show closed tasks" />
        <Tooltip title="Filter tasks">
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(false)}
        >
          <MenuItem onClick={selectTaskFilter} value={10}>Normal</MenuItem>
          <MenuItem onClick={selectTaskFilter} value={100}>Important</MenuItem>
          <MenuItem onClick={selectTaskFilter} value={false}>Clear</MenuItem>
        </Menu>
      </div>
    </FormGroup>
    <div className={classes.listTasks}>
      <TasksList showDetails={handleDisplayDetails} asset={asset} tasks={partialTasks}/>
    </div>
    <div>
      <Button className={classes.bottomAction} startIcon={<AddIcon />} onClick={() => setDialog(true)}>
        Add task
      </Button>
    </div>
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
    <ListItem component='div' disableGutters>
      <Tooltip title={assetTypeName} placement='left'>
        <ListItemIcon>
          <AssetTypeSvgIcon assetTypeCode={assetTypeCode} />
        </ListItemIcon>
      </Tooltip>

      <ListItemText>
        <AssetNameTextField asset={asset} setExpand={setIsDetailsWindowExpanded} expand={isDetailsWindowExpanded} />
      </ListItemText>
    </ListItem>
    {listTasks}

    <Dialog open={dialog} onClose={() => setDialog(false)} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Add task</DialogTitle>
      <DialogContent>
        <TextField id='name' label='Task name' value={name}
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
        <Button onClick={() => {setDialog(false)}}  color='primary'>
          Cancel
        </Button>
        <Button
          onClick={handleClickToCreateAddTask}
          color="secondary"
          disabled={name === ''}
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
