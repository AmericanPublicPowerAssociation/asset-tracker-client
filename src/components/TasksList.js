import clsx from "clsx"
import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import Container from "@material-ui/core/Container"
import CloseIcon from '@material-ui/icons/Close'
import Chip from '@material-ui/core/Chip'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Button from "@material-ui/core/Button"
import InputBase from '@material-ui/core/InputBase'
import Input from '@material-ui/core/Input'
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import Dialog from "@material-ui/core/Dialog"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Slide from "@material-ui/core/Slide"
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import Radio from "@material-ui/core/Radio"
import { Box } from "@material-ui/core"
import CollapsibleListItem from "./CollapsibleListItem"
import AssetConnectionsListItems from "./AssetConnectionsListItems"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import Collapse from "@material-ui/core/Collapse"
import {AssetName} from "./AssetTasksPanel"
import TaskComments, { CommentForm } from "./TaskComments"
import {
  addAssetTaskComment,
  setTaskPriority,
  setTaskStatus,
  setTaskName,
} from '../actions'
import {
  TASK_PRIORITY_LOW,
  TASK_PRIORITY_NORMAL,
  TASK_STATUS_NEW,
  TASK_STATUS_PENDING,
  TASK_STATUS_DONE,
  TASK_STATUS_CANCELLED,
  TASK_ARCHIVE_STATUS,
} from "../constants"
import {
 getAssetTypeByCode,
} from '../selectors'


const getPriorityColor  = (priority) => ({
  1: 'default',
  10:  'primary',
  100:  'secondary',
}[priority] || 'default')

const getPriorityLabel  = (priority) => ({
  1: 'Normal',
  10:  'Important',
  100:  'High',
}[priority] || 'default')


const getStatusLabel = (status) => ({
  '-1': 'Cancelled',
  '0': 'New',
  '10': 'Pending',
  '100': 'Done'
}[status])



const useStyles = makeStyles(theme => ({
  background: {
    backgroundColor: '#FAFAFA',
  },
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
    height: '25px',
    marginLeft: '6px',
  },
  showComments: {
    fontSize: '0.7em',
    padding: 0
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
    paddingLeft: '15px'
  },
  label: {
    color: 'rgba(0, 0, 0, 0.54)',
    padding: '0',
    fontSize: '1rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '400',
    lineHeight: '1',
    letterSpacing: '0.00938em',
  },
  priorityIndicator: {
    fontSize: '0.8rem',
    marginTop: '9px',
  },
  noPadding: {
    padding: 0
  },
  moMargin: {
    margin: 0
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
    backgroundColor: `${theme.palette.warning.main} !important`,
    color: 'white',
    '&$checked': {
      backgroundColor: `${theme.palette.warning.main} !important`,
      color: 'white',
    },
  },
  urgent: {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    '&$checked': {
      backgroundColor: theme.palette.secondary.main,
      color: 'white',
    }
  },
  desktopContent: {
    marginTop: theme.spacing(4)
  },
  chat: {
    display: 'flex',
    flexGrow: 2,
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
    height: '95%'
  },
  innerChat: {
    paddingLeft: '25px',
    paddingRight: '25px',
    backgroundColor: 'white',
    height: '100%'
  },
  overflow: {
    'overflow': 'auto'
  },
  entered: {
    minHeight: '75px !important'
  },
  importantCheckbox: {
    color: `${theme.palette.warning.main} !important`,
    '&$checked': {
      color: `${theme.palette.warning.main} !important`,
    },
  },
  urgentCheckbox: {
    color: theme.palette.secondary.main,
    '&$checked': {
      color: theme.palette.secondary.main,
    }
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})


const Priority = (priorityColor, priority, label) => {
  const classes = useStyles()
  return <Radio
    checked={label === TASK_STATUS_CANCELLED || label === TASK_ARCHIVE_STATUS}
    onChange={(e) => {e.preventDefault();}}
    color={priorityColor}
    disableRipple={true}
    classes={{colorPrimary: classes.importantCheckbox, colorSecondary: classes.urgentCheckbox}}
  />
}


export default function TasksList(props) {
  const classes = useStyles()
  const {
    asset,
    tasks,
    showComments,
    showDetails
  } = props
  const assetId = asset.id

  return (<List disablePadding className={classes.scroll}>
      { tasks.map( (task, index) => (
        <TaskItem
          key={`task-item-${assetId}-${task.id}`}
          itemKey={`task-item-${assetId}`}
          assetId={assetId}
          task={task}
          showDetails={showDetails}
          showComments={showComments}
        />
      ))}
    </List>
  )
}

function TaskItem(props) {
  const {
    itemKey,
    task,
    showComments,
    showDetails
  } = props
  const {
      name,
      status,
      priority,
      commentCount
  } = task

  const classes = useStyles()

  const priorityLabel  = getPriorityLabel(priority.toString())
  const priorityColor  = getPriorityColor(priority.toString())
  const statusLabel = getStatusLabel(status.toString())
  const PriorityIndicator = Priority(priorityColor, priority, status)
  return (
    <>
      <ListItem
        key={`${itemKey}-li`}
        disableGutters
        onClick={ () => showDetails(task) }>
        <div className={classes.spaceBetween}>
          <div className={classes.alignStart}>
          <div className={classes.fullWidth}>
            <Box display="flex">{PriorityIndicator} <ListItemText primary={name}/></Box>

            <div className={classes.actions}>
              <div>
                { priorityLabel !== 'Normal' &&
                  <Chip
                    className={classes.status}
                    color={priorityColor}
                    classes={{
                      colorPrimary: classes.important,
                      colorSecondary: classes.urgent}}
                    label={priorityLabel}
                  />
                }
                { statusLabel && <Chip className={classes.status} label={statusLabel} /> }
              </div>
            <Button className={classes.showComments}
                    onClick={() => showComments(task)}> {commentCount} Comments
            </Button>
            </div>
          </div>
          </div>
        </div>
      </ListItem>
    </>
  )
}


export const TaskFullscreen = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles()
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
    priority
  } = task

  const assetName = asset.name
  const assetTypeCode = asset.typeCode
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name

  const isScreenXS = useMediaQuery('(max-width:600px)')

  const [openTask, setOpenTask] = useState(true)
  const [openTaskDetails, setOpenTaskDetails] = useState(false)
  const setPriority = (priority) => dispatch(setTaskPriority(id, parseInt(priority), status))
  const setStatus = (status) => dispatch(setTaskStatus(id, parseInt(status), priority))

  const priorityColor  = getPriorityColor((priority || '').toString())

  function handleChangeTaskName(e) {
    dispatch(setTaskName(id, e.target.value))
  }

  function handleCommentFormSubmit(task, comment) {
    dispatch(addAssetTaskComment(task.id, comment))
  }

  function handleToggleEditTaskName() {
    setToggleEditTaskName(!toggleEditTaskName)
  }

  const taskheader = (<div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={`priority`}>Priority</InputLabel>
        <NativeSelect
          value={priority}
          onChange={ (e) => setPriority(e.target.value)}
          inputProps={{
            name: 'priority',
            id: `priority`,
          }}
        >
          <option value={TASK_PRIORITY_LOW}>Normal</option>
          <option value={TASK_PRIORITY_NORMAL}>Important</option>
        </NativeSelect>
        <FormHelperText>Select the priority for the task</FormHelperText>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor={`status`}>Status</InputLabel>
        <NativeSelect
          value={status}
          onChange={ (e) => setStatus(e.target.value)}
          inputProps={{
            name: 'status',
            id: `status`,
          }}>
          <option value={TASK_STATUS_NEW}>New</option>
          <option value={TASK_STATUS_PENDING}>Pending</option>
          <option value={TASK_STATUS_DONE}>Done</option>
          <option value={TASK_STATUS_CANCELLED}>Cancelled</option>
        </NativeSelect>
        <FormHelperText>Select the status for the task</FormHelperText>
      </FormControl>
    </div>)

const commentSection = (<div style={{display: 'flex', flexDirection: 'column', width: '100%', maxHeight: '100%', height: '100%'}}>
      <TaskComments asset={asset} task={task} classes={classes.listComments} />
      <CommentForm onSubmit={(comment) => handleCommentFormSubmit(task, comment)} />
    </div>)

  const assetDetails = (<>
    <AssetName assetTypeName={assetTypeName} assetTypeCode={assetTypeCode} assetName={assetName} />

    <AssetConnectionsListItems
      asset={asset}
      isEditing={false}
      setSelectedBusIndexes={() => {}}
      setSelectedAssetIndexes={() => {}}
      noHighlight={true}
    />
  </>)


  const mobileTaskDetail = (<>
      <AppBar color={priorityColor} className={classes.appBar}>
        <Container>
          <Toolbar className={classes.noPadding}>
            <Typography variant="h6" className={clsx(classes.title, classes.noMargin)}>
              <InputBase className={clsx(classes.input)} defaultValue={task.name} onChange={(e) => handleChangeTaskName(e) } />
              ({task.id})
              {/*<IconButton edge={false} color="inherit" onClick={handleClose} aria-label="close">
              <EditIcon />
            </IconButton>*/}
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
   <Container>
    <CollapsibleListItem title="Task details" isOpen={openTaskDetails} setIsOpen={setOpenTaskDetails} entered={classes.entered}>
        {taskheader}
    </CollapsibleListItem>
   </Container>
    <Collapse in={openTask} classes={{entered: clsx(classes.overflow, classes.maxHeight), wrapper: classes.maxHeight}}>
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
          <Typography variant="h6" className={clsx(classes.title, classes.noMargin)}>
            {
              toggleEditTaskName ?
              <>
                <Input
                  className={clsx(classes.input)}
                  disableUnderline
                  defaultValue={task.name}
                  onChange={handleChangeTaskName}
                />
                <IconButton edge={false} color="inherit" onClick={handleToggleEditTaskName} aria-label="close">
                  <DoneIcon />
                </IconButton>
              </>
              :
              <>
                { task.name }
                <IconButton edge={false} color="inherit" onClick={handleToggleEditTaskName} aria-label="close">
                  <EditIcon />
                </IconButton>
              </>
            }
          </Typography>
          <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
    <Container className={classes.maxHeight}>
      <Grid container direction="row" className={classes.maxHeight}>
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
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition} classes={{paper: classes.background}}>

        { isScreenXS ? mobileTaskDetail : desktopTaskDetails }

    </Dialog>);
}
