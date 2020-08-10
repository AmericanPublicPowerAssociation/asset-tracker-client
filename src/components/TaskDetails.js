import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputBase from '@material-ui/core/InputBase'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import AssetNameWithIcon from './AssetNameWithIcon'
import {
  getAssetById,
  getCurrentTaskComments,
  getTaskById,
  getTaskPriorityTypes,
  getTaskStatusTypes,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  inputLabelRoot: {
    'label + &': {
      marginTop: theme.spacing(1),
    },
  },
  input: {
    borderRadius: theme.spacing(1),
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '0px 20px 0px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: theme.spacing(1),
    },
  },
  toolbar: {
    padding: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  marginTB: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

export default function TaskDetails({ taskId }) {
  const classes = useStyles()
  const taskById = useSelector(getTaskById)
  const task = taskById[taskId] || {}
  const {
    name,
    status,
    priority,
    assetId,
  } = task
  const priorityTypes = useSelector(getTaskPriorityTypes) || {}
  const statusTypes = useSelector(getTaskStatusTypes) || {}
  const assetById = useSelector(getAssetById)
  const asset = assetById[assetId] || {}
  const comments = useSelector(getCurrentTaskComments)

  console.log(taskById, taskId,  task, priorityTypes, comments)
  console.log('aa', comments)

  const InputBaseComponent = (<InputBase 
    classes={{ root: classes.inputLabelRoot, input: classes.input }} />)

  return (
    <Box display='flex' flexDirection='column' flexGrow={1}>
      <div>
        <AppBar position='static' color='inherit' component='div'>
          <Toolbar className={ classes.toolbar }>
            <Typography variant="h6">{name}</Typography>
          </Toolbar>
        </AppBar>
      </div>
      <Box flexGrow={1} display='flex' flexDirection='column' p={1}>
        <div className={classes.marginTB}>
          <Typography variant='body2' component='h3'>Asset</Typography>
          <AssetNameWithIcon asset={asset}/>
        </div>
        <Divider />
        <div className={classes.marginTB}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel shrink htmlFor='priority'>Priority</InputLabel>
                <Select
                  native
                  value={priority}
                  onChange={ () => {}}
                  input={InputBaseComponent}
                  inputProps={{
                    name: 'priority',
                    id: 'priority',
                  }}
                >
                  {
                    Object.values(priorityTypes).map( priorityType => (
                      <option
                        key={`priority-type-${priorityType.code}`}
                        value={priorityType.code}
                      >
                        {priorityType.name}
                      </option>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel shrink htmlFor={'status'}>Status</InputLabel>
                <Select
                  native
                  value={status}
                  onChange={ () => {}}
                  input={InputBaseComponent}
                  inputProps={{
                    name: 'status',
                    id: 'status',
                  }}>
                  {
                    Object.values(statusTypes).map( statusType => (
                      <option
                        key={`status-type-${statusType.code}`}
                        value={statusType.code}
                      >
                        {statusType.name}
                      </option>
                    ))
                  }
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <Box flexGrow={1} className={classes.marginTB}>
          <Typography variant='subtitle2' component='h2'>
            Comments ({comments.length})
          </Typography>
          {
            comments.map(comment => comment.text)
          }
        </Box>
      </Box>
      <Box>
        <Input id="new_comment" type={'text'} label="New Comment" value='' autoComplete=''
          onChange={(e) => {} }
          onKeyPress={() => {}}
          fullWidth={true}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disabled={false}
                aria-label="Send comment"
                onClick={() => {} }
                onMouseDown={() => {}}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    </Box>
  )
}
