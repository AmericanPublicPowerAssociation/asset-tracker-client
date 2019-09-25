import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'


const useStyles = makeStyles(theme => ({
  taskCancelled: {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: 'white',
      color: 'red',
    },
  },
  taskNew: {
    '&:hover': {
      backgroundColor: 'black',
      color: 'white',
    },
  },
  taskPending: {
    backgroundColor: 'yellow',
    '&:hover': {
      backgroundColor: 'black',
      color: 'yellow',
    },
  },
  taskDone: {
    backgroundColor: 'green',
    color: 'white',
    '&:hover': {
      backgroundColor: 'white',
      color: 'green',
    },
  },
}))


export default function AssetTasks(props) {
  const classes = useStyles()
  const {
    className,
    assetId,
    taskById,
    setEditingTaskValues,
    openTaskEditDialog,
  } = props

  return (
      <FormControl fullWidth className={className}>
        <FormLabel>Tasks</FormLabel>

        <List>
      {taskById.entrySeq().map(([id, task]) => {
        const status = task.get('status')
        const statusClassName = {
          '-100': classes.taskCancelled,
          '0': classes.taskNew,
          '50': classes.taskPending,
          '100': classes.taskDone,
        }[status]
        return (
          <ListItem
            className={statusClassName}
            button
            key={id}
            disableGutters
            onClick={() => {
              setEditingTaskValues(task)
              openTaskEditDialog()
            }}
          >
            <ListItemText primary={task.get('name')} />
          </ListItem>
        )
      })}
        </List>

        <div>
          <Chip
            label=<AddIcon />
            color='primary'
            onClick={() => {
              setEditingTaskValues({
                id: null,
                assetId,
                name: '',
                status: 0,
                referenceUri: '',
              })
              openTaskEditDialog()
            }}
          />
        </div>
      </FormControl>
  )
}
