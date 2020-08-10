import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Badge from '@material-ui/core/Badge'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import CommentIcon from '@material-ui/icons/Comment'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import CollapsibleListItem from './CollapsibleListItem'
import {
  getTaskPriorityTypes,
  getTaskStatusTypes,
  getSelectedTasks,
} from '../selectors'

export default function CollapsibleTaskList({ asset }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const tasks = useSelector(getSelectedTasks)

  return (
    <CollapsibleListItem title='Tasks' isOpen={isCollapsed} setIsOpen={setIsCollapsed} >
      <List>
        <ListItem>
          <Button fullWidth variant='contained' color='primary'>+ Add Task</Button>
        </ListItem>
        { tasks.map(task => <TaskItem key={task.id} task={task} />) }
      </List>
    </CollapsibleListItem>
  )
}

export function TaskItem({ task }) {
  const { name, status, priority, commentCount } = task
  const priorityType = useSelector(getTaskPriorityTypes)
  const statusType = useSelector(getTaskStatusTypes)
  const priorityLabel = priorityType[priority].name
  const statusLabel = statusType[status].name
  const priorityColor = getPriorityColor(priority)

  function getPriorityColor(priority) {
    return {
      1: 'default',
      10:  'primary',
      100:  'secondary',
    }[priority] || 'default'
  }

  return (
    <>
      <ListItem button
        component='div'
        disableGutters
        style={{ display: 'block' }}
        onClick={ () => {}}
      >
        <div>
          <div>
            <Typography variant='body1' component='span' gutterBottom>{ name }</Typography>
            { priorityLabel !== 'Normal' &&
              <Chip
                style={{ marginLeft: '8px' }}
                color={priorityColor}
                label={priorityLabel}
              />
            }
          </div>
          <IconButton size='small'>
            <Badge badgeContent={commentCount} color='secondary'>
              <CommentIcon />
            </Badge>
          </IconButton>
        </div>
      </ListItem>
      <Divider />
    </>
  )
}
