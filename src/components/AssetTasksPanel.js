// TODO: Review from scratch
// TODO: Fix this panel because it is fugly
// TODO: Show task counts in filters
// TODO: Move filter to be at end of search
// TODO: Move toggle for Show Closed as checkbox in filter
// TODO: Make all filters checkboxes

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import FormGroup from '@material-ui/core/FormGroup'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ListSubheader from '@material-ui/core/ListSubheader'
import Tooltip from '@material-ui/core/Tooltip'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import AddIcon from '@material-ui/icons/Add'
import TasksList, { TaskFullscreen } from './TasksList'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import MenuItem from '@material-ui/core/MenuItem'
import Link from '@material-ui/core/Link'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import Checkbox from '@material-ui/core/Checkbox'
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
  getSelectedTasks,
  getTaskPriorityTypes,
  getTaskStatusTypes,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  adornedEnd: {
    paddingRight: '0',
  },
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
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  filterGrouping: {
    background: 'white',
    pointerEvents: 'none',
    userSelect: 'none',
  },
  iconButton: {
    padding: 10,
  },
  input: {
    padding: '14px 14px',
  },
  listTasks: {
    overflow: 'auto',
    marginBottom: '10px',
    //height: '100%',
    flex: '1 1 auto',
  },
  noTasks: {
    fontWeight: 'bold',
    fontSize: '1.3rem',
    textAlign: 'center',
    marginTop: '35px',
    marginBottom: '20px',
  },
  sidePadding: {
    paddingLeft: '10px',
    paddingRight: '10px',
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
          <Typography variant='h5' style={{ fontSize: '1rem', overflowWrap: 'anywhere'  }}>
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
  const tasks = useSelector(getSelectedTasks)

  const assetId = asset.id
  // const assetName = asset.name
  const assetTypeCode = asset.typeCode
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name
  const taskPriorityTypes = useSelector(getTaskPriorityTypes)
  const taskStatusTypes = useSelector(getTaskStatusTypes)
  const priorityTypeNormal = taskPriorityTypes['10'].code

  const [query, setQuery] = useState('')
  const [name, setName]  = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(priorityTypeNormal)
  const [dialog, setDialog] = useState(false)	   
  const [taskDetails, setTaskDetails] = useState(false)
  const [prioritySelected, setPrioritySelected] = useState(true)
  const [statusSelected, setStatusSelected] = useState(true)
  const [filterNameSelection, setFilterNameSelection] = useState(['Normal', 'Important', 'New', 'Pending'])

  function handleClickToCreateAddTask() {
    setDialog(false)
    dispatch(addTask(assetId, name, description, priority))
    setName('')
    setDescription('')
    setPriority(priorityTypeNormal)
  }

  const filteredTasks = tasks.filter(task => task.name.toLowerCase().includes(query.toLowerCase())).filter(
    task => (
      // if priority or status filter is on
      (prioritySelected || statusSelected) ?
        (
          // if priority and status are selected
          (prioritySelected && statusSelected) ?
            (
              filterNameSelection.includes(taskPriorityTypes[task.priority].name) &&
              filterNameSelection.includes(taskStatusTypes[task.status].name)
            )
          :
            // otherwise priority or staus is selected
            (
              prioritySelected ?
                filterNameSelection.includes(taskPriorityTypes[task.priority].name)
              :
                filterNameSelection.includes(taskStatusTypes[task.status].name)
            )
        )
      :
        task
    ),
  )

  const handleDisplayDetails = (task) => {
    dispatch(refreshTaskComments(task.id))
    setTaskDetails(task)
  }

  const priorityList = [
    'Normal',
    'Important',
  ]

  const statusList = [
    'New',
    'Pending',
    'Done',
    'Cancelled',
  ]

  const handleChange = (event) => {
    // event.target.value is an array of all selected values
    const selectedFiltersArray = event.target.value

    // priorityFound = whether a priority is found in the selected values
    const priorityFound = priorityList.some(elem => selectedFiltersArray.includes(elem))
    // statusFound = whether a priority is found in the selected values
    const statusFound = statusList.some(elem => selectedFiltersArray.includes(elem))

    // if priority is found, a priority has been selected, otherwise hasn't
    if (priorityFound) {
      setPrioritySelected(true)
    } else {
      setPrioritySelected(false)
    }

    // if status is found, a status has been selected, otherwise hasn't
    if (statusFound) {
      setStatusSelected(true)
    } else {
      setStatusSelected(false)
    }
    setFilterNameSelection(selectedFiltersArray)
  }

    /*
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8
  const FilterListProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  }
  */

  const setFilterItems = filterDict => {
    return Object.entries(filterDict).map(([filterKey, filterValue]) => (
      <MenuItem disableGutters key={filterValue.name} value={filterValue.name} onClick={() => console.log('test')}>
        <Checkbox checked={filterNameSelection.indexOf(filterValue.name) > -1} />
        <ListItemText primary={filterValue.name} />
      </MenuItem>
    ))
  }

  const clearFilter = () => {
    setFilterNameSelection([])
    setPrioritySelected(false)
    setStatusSelected(false)
  }

  const listTasks = (<>
    <FormGroup row style={{ paddingLeft: '10px', paddingRight: '10px', flex: '0 0 auto' }}>
      <OutlinedInput
        classes={{ input: classes.input, adornedEnd: classes.adornedEnd }}
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value) }
        placeholder='Search tasks...'
        endAdornment={ query === '' ?
            <InputAdornment position='end'>
              <SearchIcon style={{ marginRight: '14px' }}/>
            </InputAdornment>
          :
            <InputAdornment position='end'>
              <IconButton
                onClick={() => setQuery('')}
              >
                <CloseIcon />
              </IconButton>
            </InputAdornment>
        }
      />
      <div className={classes.actions}>
        <FormControl size='small' variant='outlined' className={classes.formControl} style={{ maxWidth: '162px' }}>
          <InputLabel id="demo-mutiple-checkbox-label">Filter</InputLabel>
          <Select
            multiple
            value={filterNameSelection}
            onChange={handleChange}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={{ getContentAnchorEl: () => null }}
            input={
              <OutlinedInput
                label='Filter'
                labelWidth={50}
              />
            }
          >
            <ListSubheader className={classes.filterGrouping}>Priority</ListSubheader>
            {setFilterItems(taskPriorityTypes)}
            <ListSubheader className={classes.filterGrouping}>Status</ListSubheader>
            {setFilterItems(taskStatusTypes)}
          </Select>
        </FormControl>
        <Link
          component='button'
          variant='body2'
          onClick={clearFilter}
          style={{ paddingTop: '8px', paddingRight: '8px' }}
        >
          Clear All
        </Link>
      </div>
    </FormGroup>
    <Divider style={{ marginTop: '15px' }} />
    <div className={classes.listTasks}>
      { 
        (tasks.length===0) ? 
          <Typography variant='h6' className={clsx(classes.noTasks, classes.sidePadding)}>
            No tasks to show
          </Typography> 
        :
          <TasksList showDetails={handleDisplayDetails} asset={asset} tasks={filteredTasks}/>
      }
    </div>
    <Divider />
    <div style={{ flex: '0 0 auto' }}>
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
    <div style={{ display: 'flex', flexDirection:'column', height: '100%', overflow: 'hidden' }}>
      <ListItem component='div' disableGutters style={{ flex: '0 0 auto', padding: '10px' }}>
        <Tooltip title={assetTypeName} placement='left'>
          <ListItemIcon>
            <AssetTypeSvgIcon assetTypeCode={assetTypeCode} />
          </ListItemIcon>
        </Tooltip>

        <ListItemText>
          <AssetNameTextField asset={asset} setIsFullScreen={setIsDetailsWindowExpanded} isFullScreen={isDetailsWindowExpanded} />
        </ListItemText>
      </ListItem>
      {listTasks}
    </div>

    <Dialog open={dialog} onClose={() => setDialog(false)} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Add task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id='name'
          label='Task name'
          value={name}
          onChange={(e) => setName(e.target.value) }
        />
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='status'>Priority</InputLabel>
            <Select
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
            </Select>
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
