import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import {getCurrentTaskComments, getFocusingAsset} from "../selectors";


const useStyles = makeStyles(theme => ({
  bottomAction: {
    width: '95%',
    position: 'absolute',
    bottom: 0,
    marging: 0,
  },
  scroll: {
    height: '50vh',
    overflowY: 'auto',
  }
}));


export default function TaskComments(props) {
  const classes = useStyles()
  const {
    asset,
    task,
  } = props
  const assetId = asset.id

  const comments = useSelector(getCurrentTaskComments)

  return (<List disablePadding className={classes.scroll}>
      { comments.map( (comment, index) => (
        <CommentItem
          key={`task-comment-${assetId}-${comment.id}`}
          itemKey={`task-comment-${comment.id}`}
          assetId={assetId}
          task={task}
          comment={comment}
        />
      ))}
    </List>
  )
}


function CommentItem(props) {
  const dispatch = useDispatch()
  const {
    comment,
    itemKey
  } = props
  const {
      id,
      text,
  } = comment

  
  const classes = useStyles();

  return (
    <>
      <ListItem
        key={`${itemKey}-li`}
        disableGutters
        >
        <ListItemText>
          {text}
        </ListItemText>
      </ListItem>
    </>
  )
}

export function CommentForm(props) {
  const classes = useStyles()

  const {onSubmit} = props;
  const [comment, setComment] = useState('')

  const onClick = () => {
    if (comment !== '') {
      onSubmit(comment)
      setComment('')
    }
  }

  return (<div className={classes.bottomAction}>
    <TextField id="new_comment" label="New Comment" value={comment}
               onChange={(e) => setComment(e.target.value) } />
    <Button  startIcon={<SendIcon />} onClick={onClick}>

    </Button>
  </div>)
}