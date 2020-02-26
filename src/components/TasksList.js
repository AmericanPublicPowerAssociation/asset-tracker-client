import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import Chip from '@material-ui/core/Chip'
import Radio from '@material-ui/core/Radio'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Button from "@material-ui/core/Button"
import MessageIcon from '@material-ui/icons/Message'
import {
  setTaskPriority,
  setTaskStatus
} from '../actions'


const getPriorityColor  = (priority) => ({
  1: 'default',
  10:  'primary',
  100:  'secondary',
}[priority] || 'default')

const getStatusLabel = (status) => ({
  '-1': 'Cancelled',
  '0': 'New',
  '10': 'Pending',
  '100': 'Done'
}[status])


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  scroll: {
    height: '70%',
    overflowY: 'auto',
  },
  spaceBetween: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  alignStart: {
    display: 'flex',
    alignItems: 'start',
    width: '100%'
  },
  actions: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'space-between'
  },
  fullWidth: {
    width: '100%'
  },
  status: {
    fontSize: '0.7em',
    height: '25px'
  },
  showComments: {
    fontSize: '0.7em',
    padding: 0
  }
}));



export default function TasksList(props) {

  const classes = useStyles()
  const {
    asset,
    tasks,
    showComments
  } = props
  const assetId = asset.id

  return (<List disablePadding className={classes.scroll}>
      { tasks.map( (task, index) => (
        <TaskItem
          key={`task-item-${assetId}-${task.id}`}
          itemKey={`task-item-${assetId}`}
          assetId={assetId}
          task={task}
          showComments={showComments}
        />
      ))}
    </List>
  )
}


function TaskItem(props) {
  const dispatch = useDispatch()
  const [
    isWithExpandConnect,
    setIsWithExpandConnect
  ] = useState(false)
  const {
    itemKey,
    task,
    showComments,
  } = props
  const {
      id,
      name,
      status,
      priority
  } = task


  
  const classes = useStyles();  
  // To emulate update on the backend
    
  const setPriority = (priority) => dispatch(setTaskPriority(id,
                                                             parseInt(priority),
                                                             status))
  const setStatus = (status) => dispatch(setTaskStatus(id,
                                                       parseInt(status),
                                                       priority))
    
  const arrowComponent = (
    isWithExpandConnect ?
    <ExpandLess /> :
    <ExpandMore />
  )

  const priorityColor  = getPriorityColor(priority.toString())
  const statusLabel = getStatusLabel(status.toString())
  
  return (
    <>
      <ListItem
        key={`${itemKey}-li`}
        disableGutters
        onClick={ () => setIsWithExpandConnect(!isWithExpandConnect)}>
        <div className={classes.spaceBetween}>
          <div className={classes.alignStart}>
          <Radio
            checked={true}
            value={priority}
            color={priorityColor}
            name="priorityIndicator"
            inputProps={{ 'aria-label': 'A' }}
            style={{paddingLeft: 0}}
          />
          <div className={classes.fullWidth}>
            <ListItemText primary={name}/>
            <div className={classes.actions}>
            { statusLabel && <Chip className={classes.status} label={statusLabel} /> }

            <Button className={classes.showComments}
                    startIcon={<MessageIcon/>}
                    onClick={() => showComments(task)}>Comments
            </Button>
            </div>
          </div>
          </div>
          { arrowComponent }
        </div>
      </ListItem>

      <Collapse key={`${itemKey}-collapse`} in={isWithExpandConnect}>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor={`status-${itemKey}`}>Priority</InputLabel>
        <NativeSelect
          value={priority}
          onChange={ (e) => setPriority(e.target.value)}
          inputProps={{
            name: 'priority',
              id: `priority-${itemKey}`,
          }}
        >
      <option value={1}>Low</option>
      <option value={10}>Normal</option>
	  <option value={100}>High</option>          
        </NativeSelect>
        <FormHelperText>Select the priority for the task</FormHelperText>
	</FormControl>

     <FormControl className={classes.formControl}>
        <InputLabel htmlFor={`status-${itemKey}`}>Status</InputLabel>
        <NativeSelect
          value={status}
          onChange={ (e) => setStatus(e.target.value)}
          inputProps={{
            name: 'status',
            id: `status-${itemKey}`,
          }}
        >
      <option value={0}>New</option>
      <option value={10}>Pending</option>
      <option value={100}>Done</option>
      <option value={-1}>Cancelled</option>
        </NativeSelect>
        <FormHelperText>Select the status for the task</FormHelperText>
      </FormControl>
      </Collapse>

    </>
  )
}


export const TaskOverview = (props) => {
  const {
    id,
    name,
    status,
    priority
  } = props.task

  const classes = useStyles()
  
  const priorityColor  = getPriorityColor(priority.toString())
  const statusLabel = getStatusLabel(status.toString())

  return (
    <div style={{display: 'flex', alignItems: 'start'}}>
      <Radio
        checked={true}
        value={priority}
        color={priorityColor}
        name="priorityIndicator"
        inputProps={{ 'aria-label': 'A' }}
        style={{paddingLeft: 0}}
      />
      <div>
      <ListItemText primary={name}/>
      { statusLabel && <Chip className={classes.status} label={statusLabel} /> }
      </div>
    </div>
  )
}