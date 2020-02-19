import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'
import Collapse from '@material-ui/core/Collapse'
import Typography from '@material-ui/core/Typography'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import Chip from '@material-ui/core/Chip'
import Radio from '@material-ui/core/Radio'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import NativeSelect from '@material-ui/core/NativeSelect'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  setAssetConnectionAttribute
} from '../actions'


const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  scroll: {
    height: '50vh',
    overflowY: 'auto',
  }
}));



export default function TasksList(props) {

  const classes = useStyles()
  const {
    asset,
    disableInput,
    tasks
  } = props
  const assetId = asset.id

  return (<List disablePadding className={classes.scroll}>
      { tasks.map( (task, index) => (
        <TaskItem
          key={`task-item-${assetId}-${task.id}`}
          itemKey={`task-item-${assetId}`}
          assetId={assetId}
          task={task}
        />
      ))}
    </List>
  )
}


function TaskItem(props) {
  const [
    isWithExpandConnect,
    setIsWithExpandConnect
  ] = useState(false)
  const {
    itemKey,
    assetId,
    task
  } = props
  const {
    // busId,
      name,
      status,
      priority
  } = task

  const classes = useStyles();  
  // To emulate update on the backend
    
  const [localPriority, setPriority] = useState(priority)
  const [localStatus, setStatus] = useState(status)
    
  const dispatch = useDispatch()
  const arrowComponent = (
    isWithExpandConnect ?
    <ExpandLess /> :
    <ExpandMore />
  )

  const handleChange = (e, key) => {
      const value = e.target.value
  }

  const getKeyLabel = (key) => {
    return key.replace( /([A-Z])/g, ' $1' ).toLowerCase()
  }

  const priorityColor  = {
      'low': 'default',
      'medium': 'primary',
      'high': 'secondary',
  }[localPriority] || 'default'

    console.log(priorityColor)  
  return (
    <>
      <ListItem
        key={`${itemKey}-li`}
        disableGutters
        onClick={ () => setIsWithExpandConnect(!isWithExpandConnect)}>
	<Radio
          checked={true }
          value={localPriority}
      color={priorityColor}
          name="priorityIndicator"
          inputProps={{ 'aria-label': 'A' }}
        />
	<ListItemText primary={`Task ${name}`}/>
	  { localStatus && <Chip label={localStatus} /> }
        { arrowComponent } 
      </ListItem>
      <Collapse key={`${itemKey}-collapse`} in={isWithExpandConnect}>
        <FormControl className={classes.formControl}>
        <InputLabel htmlFor={`status-${itemKey}`}>Priority</InputLabel>
        <NativeSelect
          value={localPriority}
          onChange={ (e) => setPriority(e.target.value)}
          inputProps={{
            name: 'priority',
              id: `priority-${itemKey}`,
          }}
        >
          <option value='low'>Low</option>
          <option value='medium'>Medium</option>
	  <option value='high'>High</option>          
        </NativeSelect>
        <FormHelperText>Select the priority for the task</FormHelperText>
	</FormControl>

     <FormControl className={classes.formControl}>
        <InputLabel htmlFor={`status-${itemKey}`}>Status</InputLabel>
        <NativeSelect
          value={localStatus}
          onChange={ (e) => setStatus(e.target.value)}
          inputProps={{
            name: 'status',
              id: `status-${itemKey}`,
          }}
        >
          <option value="" />
          <option value='active'>Active</option>
          <option value='done'>Done</option>
          <option value='archive'>Archive</option>
        </NativeSelect>
        <FormHelperText>Select the status for the task</FormHelperText>
      </FormControl>
      </Collapse>
    </>
  )
}
