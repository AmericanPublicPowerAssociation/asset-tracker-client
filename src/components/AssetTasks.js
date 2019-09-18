import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'


export default function AssetTasks(props) {
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
        return (
          <ListItem
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
              })
              openTaskEditDialog()
            }}
          />
        </div>
      </FormControl>
  )
}
