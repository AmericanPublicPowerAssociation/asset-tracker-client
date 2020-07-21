// TODO: Review from scratch
// TODO: Focus task on click edit

import clsx from 'clsx'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import makeStyles from '@material-ui/core/styles/makeStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Badge from '@material-ui/core/Badge'
import Container from '@material-ui/core/Container'
import CloseIcon from '@material-ui/icons/Close'
import Chip from '@material-ui/core/Chip'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Slide from '@material-ui/core/Slide'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import CommentIcon from '@material-ui/icons/Comment'
// import Radio from '@material-ui/core/Radio'
import CollapsibleListItem from './CollapsibleListItem'
import AssetConnectionsListItems from './AssetConnectionsListItems'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import { AssetName } from './AssetTasksPanel'
import TaskComments, { CommentForm } from './TaskComments'
import {
  addAssetTaskComment,
  setSelectedTaskId,
  setTaskPriority,
  setTaskStatus,
  setTaskName,
} from '../actions'
import {
  IsLayoutMobileContext,
} from '../contexts'
import {
  getAssetTypeByCode,
  getSelectedTaskId,
  getTaskPriorityTypes,
  getTaskStatusTypes,
} from '../selectors'

const getPriorityColor  = (priority) => ({
  1: 'default',
  10:  'primary',
  100:  'secondary',
}[priority] || 'default')

const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: '#FAFAFA',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  scroll: {
    height: '100%',
    overflowY: 'auto',
  },
  spaceBetween: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  alignStart: {
    display: 'flex',
    alignItems: 'start',
    width: '100%',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    /*
    '&.Mui-selected': {
      backgroundColor: 'yellow',
    },
    */
  },
  fullWidth: {
    width: '100%',
  },
  status: {
    height: '25px',
    fontSize: '0.7em',
    marginLeft: '6px',
    marginTop: '0',
    marginBottom: '0',
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  listComments: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingTop: '25px',
    overflowY: 'auto',
    backgroundColor: 'white',
    paddingLeft: '15px',
  },
  listItemText: {
    marginLeft: '6px',
    marginTop: '0',
    marginBottom: '0',
  },
  label: {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: '0',
    fontSize: '1rem',
    fontWeight: '400',
    lineHeight: '1',
    letterSpacing: '0.00938em',
  },
  priorityIndicator: {
    fontSize: '0.8rem',
    marginTop: '9px',
  },
  noPadding: {
    padding: 0,
  },
  moMargin: {
    margin: 0,
  },
  maxHeight: {
    height: '100% !important',
    overflow: 'hidden',
  },
  propertiesSection: {
    paddingTop: '25px',
    paddingLeft: '35px',
  },
  input: {
    height: theme.typography.h6.fontSize,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    color: 'inherit',
    width: '15ch',
  },
  important: {
    'backgroundColor': `${theme.palette.warning.main} !important`,
    'color': 'white',
    /*
    '&$checked': {
      backgroundColor: `${theme.palette.warning.main} !important`,
      color: 'white',
    },
    */
  },
  urgent: {
    'backgroundColor': theme.palette.secondary.main,
    'color': 'white',
    /*
    '&$checked': {
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
    },
    */
  },
  desktopContent: {
    marginTop: theme.spacing(4),
  },
  chat: {
    display: 'flex',
    flexGrow: 2,
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    height: '95%',
  },
  innerChat: {
    paddingLeft: '25px',
    paddingRight: '25px',
    backgroundColor: 'white',
    height: '100%',
  },
  overflow: {
    'overflow': 'auto',
  },
  entered: {
    minHeight: '75px !important',
  },
  importantCheckbox: {
    'color': `${theme.palette.warning.main} !important`,
    /*
    '&$checked': {
      color: `${theme.palette.warning.main} !important`,
    },
    */
  },
  urgentCheckbox: {
    'color': theme.palette.secondary.main,
    /*
    '&$checked': {
      color: theme.palette.secondary.main,
    },
    */
  },
}))


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})


/*
const Priority = (priorityColor, priority, label) => {
  const classes = useStyles()
  return <Radio
    checked={label === TASK_STATUS_CANCELLED || label === TASK_ARCHIVE_STATUS}
    onChange={(e) => {e.preventDefault()}}
    color={priorityColor}
    disableRipple={true}
    classes={{
      colorPrimary: classes.importantCheckbox,
      colorSecondary: classes.urgentCheckbox,
    }}
  />
}
*/


export default function TasksList(props) {
  const classes = useStyles()
  const {
    asset,
    tasks,
    showDetails,
  } = props
  const assetId = asset.id
  const selectedTaskId = useSelector(getSelectedTaskId)

  return (<List disablePadding className={classes.scroll}>
      { tasks.map( (task, index) => (
        <TaskItem
          key={`task-item-${assetId}-${task.id}`}
          itemKey={`task-item-${assetId}`}
          assetId={assetId}
          task={task}
          showDetails={showDetails}
          selectedTaskId={selectedTaskId}
        />
      ))}
    </List>
  )
}

function TaskItem(props) {
  const {
    itemKey,
    task,
    showDetails,
    selectedTaskId,
  } = props
  const {
    name,
    status,
    priority,
    commentCount,
  } = task

  const dispatch = useDispatch()
  const classes = useStyles()
  const priorityType = useSelector(getTaskPriorityTypes)
  const statusType = useSelector(getTaskStatusTypes)
  const priorityLabel = priorityType[priority].name
  const priorityColor = getPriorityColor(priority.toString())
  const statusLabel = statusType[status].name
  const taskId = task.id

  return (
    <>
      <ListItem button
        key={`${itemKey}-li`}
        disableGutters
        classes={{ root: classes.actions }}
        onClick={ () => {
          dispatch(setSelectedTaskId(taskId))
          showDetails(task)
        }}
        selected={taskId === selectedTaskId}
      >
        <div className={classes.spaceBetween}>
          <div className={classes.alignStart}>
            <div className={classes.fullWidth}>
              <ListItemText primary={name} className={classes.listItemText} />
              <div className={classes.actions}>
                <div>
                  { priorityLabel !== 'Normal' &&
                    <Chip
                      className={classes.status}
                      color={priorityColor}
                      classes={{
                        colorPrimary: classes.important,
                        colorSecondary: classes.urgent }}
                      label={priorityLabel}
                    />
                  }
                  { statusLabel && <Chip className={classes.status} label={statusLabel} /> }
                </div>
                <IconButton>
                  <Badge badgeContent={commentCount} color='secondary'>
                    <CommentIcon />
                  </Badge>
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </ListItem>
      <Divider />
    </>
  )
}


export const TaskFullscreen = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const taskPriorityTypes = useSelector(getTaskPriorityTypes)
  const taskStatusTypes = useSelector(getTaskStatusTypes)
  const [toggleEditTaskName, setToggleEditTaskName] = useState(false)

  const {
    open,
    handleClose,
    task,
    asset,
  } = props

  const {
    id,
    status,
    priority,
  } = task

  const assetName = asset.name
  const assetTypeCode = asset.typeCode
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name

  const isLayoutMobile = useContext(IsLayoutMobileContext)

  const [taskNameState, setTaskNameState] = useState()
  const [openTask, setOpenTask] = useState(true)
  const [openTaskDetails, setOpenTaskDetails] = useState(false)
  const setPriority = (priority) => dispatch(setTaskPriority(id, parseInt(priority), status))
  const setStatus = (status) => dispatch(setTaskStatus(id, parseInt(status), priority))

  const priorityColor  = getPriorityColor((priority || '').toString())

  useEffect(()=> {
    const { name } = task
    setTaskNameState(name)
  }, [task])

  function handleChangeTaskName(e) {
    setTaskNameState(e.target.value)
  }

  function handleSubmitTaskName() {
    dispatch(setTaskName(id, taskNameState, priority, status))
    handleToggleEditTaskName()
  }

  function handleCommentFormSubmit(task, comment) {
    dispatch(addAssetTaskComment(task.id, comment))
  }

  function handleToggleEditTaskName() {
    setToggleEditTaskName(!toggleEditTaskName)
  }

  const taskheader = (<div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='priority'>Priority</InputLabel>
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
                value={priorityType.code}
              >
                {priorityType.name}
              </option>
            ))
          }
        </Select>
        <FormHelperText>Select the priority for the task</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={'status'}>Status</InputLabel>
        <Select
          value={status}
          onChange={ (e) => setStatus(e.target.value)}
          inputProps={{
            name: 'status',
            id: 'status',
          }}>
          {
            Object.values(taskStatusTypes).map( statusType => (
              <option
                key={`status-type-${statusType.code}`}
                value={statusType.code}
              >
                {statusType.name}
              </option>
            ))
          }
        </Select>
        <FormHelperText>Select the status for the task</FormHelperText>
      </FormControl>
    </div>)

const commentSection = (<div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxHeight: '100%', height: '100%' }}>
      <TaskComments asset={asset} task={task} classes={classes.listComments} />
      <CommentForm onSubmit={(comment) => handleCommentFormSubmit(task, comment)} />
    </div>)

  const assetDetails = (<>
    <AssetName assetTypeName={assetTypeName} assetTypeCode={assetTypeCode} assetName={assetName} />

    <AssetConnectionsListItems
      asset={asset}
      isEditing={false}
      noHighlight={true}
    />
  </>)

  const mobileTaskDetail = (<>
      <AppBar color={priorityColor} className={classes.appBar}>
        <Container>
          <Toolbar className={classes.noPadding}>
            <Typography variant="h6" className={clsx(classes.title, classes.noMargin)}>
              {
                toggleEditTaskName ?
                <>
                  <Input
                    className={clsx(classes.input)}
                    disableUnderline
                    defaultValue={taskNameState}
                    onChange={handleChangeTaskName}
                  />
                  <IconButton edge={false} color="inherit" onClick={handleSubmitTaskName} aria-label="close">
                    <DoneIcon />
                  </IconButton>
                </>
                :
                <>
                  { taskNameState }
                  <IconButton edge={false} color="inherit" onClick={handleToggleEditTaskName} aria-label="close">
                    <EditIcon />
                  </IconButton>
                </>
              }
            </Typography>
            <IconButton edge='end' color='inherit' onClick={handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
   <Container>
    <CollapsibleListItem title='Task details' isOpen={openTaskDetails} setIsOpen={setOpenTaskDetails} entered={classes.entered}>
        {taskheader}
    </CollapsibleListItem>
   </Container>
    <Collapse in={openTask} classes={{
      entered: clsx(classes.overflow, classes.maxHeight),
      wrapper: classes.maxHeight,
    }}>
      {commentSection}
    </Collapse>
    <Container>
    <CollapsibleListItem title={assetName} isOpen={!openTask} setIsOpen={(status) => setOpenTask(!status)}>
      <Grid container>
        {assetDetails}
      </Grid>
    </CollapsibleListItem>
    </Container>
    </>
  )

  const desktopTaskDetails = (<>
    <AppBar color={priorityColor} className={classes.appBar}>
      <Container>
        <Toolbar className={classes.noPadding}>
          <Typography variant='h6' className={clsx(classes.title, classes.noMargin)}>
            {
              toggleEditTaskName ?
              <>
                <Input
                  className={clsx(classes.input)}
                  disableUnderline
                  defaultValue={ taskNameState }
                  onChange={handleChangeTaskName}
                />
                <IconButton edge={false} color="inherit" onClick={handleSubmitTaskName} aria-label="close">
                  <DoneIcon />
                </IconButton>
              </>
              :
              <>
                { taskNameState }
                <IconButton edge={false} color="inherit" onClick={handleToggleEditTaskName} aria-label="close">
                  <EditIcon />
                </IconButton>
              </>
            }
          </Typography>
          <IconButton edge='end' color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
    <Container className={classes.maxHeight}>
      <Grid container direction='row' className={classes.maxHeight}>
        <Grid item xs={2} className={classes.desktopContent}>
          {assetDetails}
        </Grid>
        <Grid item xs={8} className={classes.chat}>
          {commentSection}
        </Grid>
        <Grid item xs={2} className={classes.desktopContent}>
          {taskheader}
        </Grid>
      </Grid>
    </Container>
    </>)

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} classes={{ paper: classes.background }}>

      { isLayoutMobile ? mobileTaskDetail : desktopTaskDetails }

    </Dialog>)
}
