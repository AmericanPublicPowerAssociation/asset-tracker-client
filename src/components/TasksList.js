import React  from 'react'
import { useDispatch } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Button from "@material-ui/core/Button"
import {
  addAssetTaskComment,
  setTaskPriority,
  setTaskStatus,
  setTaskName,
} from '../actions'
import InputBase from '@material-ui/core/InputBase';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Slide from "@material-ui/core/Slide";
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import TaskComments, {CommentForm} from "./TaskComments";
import Container from "@material-ui/core/Container";
// import EditIcon from '@material-ui/icons/Edit';
import {ASSET_TYPE_ICON_BY_CODE} from "../constants";
import {AssetName} from "./AssetTasksPanel";
import clsx from "clsx";


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
    height: '75vh',
    marginTop: '25px',
    overflowY: 'auto'
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
    maxHeight: '75vh'
  },
  propertiesSection: {
    paddingTop: '25px',
    paddingLeft: '35px',
  },
  input: {
    height: theme.typography.h6.fontSize,
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    color: 'white',
  }
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})


const Priority = (priorityColor, priority) => {
  const classes = useStyles()

  return <FiberManualRecordRoundedIcon className={classes.priorityIndicator} color={priorityColor} />
}


export const TaskOverview = (props) => {
  const {
    name,
    status,
    priority
  } = props.task

  const classes = useStyles()

  const priorityColor = getPriorityColor(priority.toString())
  const statusLabel = getStatusLabel(status.toString())

  return (
    <div style={{display: 'flex', alignItems: 'start'}}>
      <Priority priorityColor={priorityColor} priority={priority} />
      <div>
        <ListItemText primary={name}/>
        { statusLabel && <Chip className={classes.status} label={statusLabel} /> }
      </div>
    </div>
  )
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

  const classes = useStyles();

  const priorityColor  = getPriorityColor(priority.toString())
  const statusLabel = getStatusLabel(status.toString())
  const PriorityIndicator = Priority(priorityColor, priority)
  return (
    <>
      <ListItem
        key={`${itemKey}-li`}
        disableGutters
        onClick={ () => showDetails(task) }>
        <div className={classes.spaceBetween}>
          <div className={classes.alignStart}>
          {PriorityIndicator}
          <div className={classes.fullWidth}>
            <ListItemText primary={name}/>
            <div className={classes.actions}>
            { statusLabel && <Chip className={classes.status} label={statusLabel} /> }
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

  const {
    open,
    handleClose,
    task,
    asset,
  } = props;

  const {
    id,
    status,
    priority
  } = task

  const assetName = asset.name
  const assetTypeCode = asset.typeCode
  const assetType = ASSET_TYPE_ICON_BY_CODE[assetTypeCode]
  const assetTypeName = assetType.name

  const setPriority = (priority) => dispatch(setTaskPriority(id, parseInt(priority), status))
  const setStatus = (status) => dispatch(setTaskStatus(id, parseInt(status), priority))

  const priorityColor  = getPriorityColor((priority || '').toString())

  function handleChangeTaskName(e) {
    dispatch(setTaskName(id, e.target.value))
  }

  return (
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
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
      <Container className={classes.maxHeight}>
        <Grid container>
          <Grid item xs={12} md={9}>
            <TaskComments asset={asset} task={task} classes={classes.listComments} />
            <CommentForm onSubmit={(comment) => { dispatch(addAssetTaskComment(task.id, comment)) }} />
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.propertiesSection}>
              <AssetName assetTypeName={assetTypeName} assetTypeCode={assetTypeCode} assetName={assetName} />
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
                  <option value={1}>Low</option>
                  <option value={10}>Normal</option>
                  <option value={100}>High</option>
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
                  <option value={0}>New</option>
                  <option value={10}>Pending</option>
                  <option value={100}>Done</option>
                  <option value={-1}>Cancelled</option>
                </NativeSelect>
                <FormHelperText>Select the status for the task</FormHelperText>
              </FormControl>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Dialog>);
}
