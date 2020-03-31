import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from "@material-ui/icons/Send"
import {getCurrentTaskComments} from "../selectors"
import Identicon from 'react-identicons'
import Typography from "@material-ui/core/Typography"
import InputAdornment from "@material-ui/core/InputAdornment"
import IconButton from "@material-ui/core/IconButton"
import Input from "@material-ui/core/Input"


const useStyles = makeStyles(theme => ({
  bottomAction: {
    margin: '15px 0 15px 0',
    display: 'flex'
  },
  scroll: {
    maxHeight: '60%',
    overflowY: 'auto',
  },
  commentListItem: {
    padding: 0,
    marginBottom: '1.2rem',
  },
  commentWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    width: '100%',
  },
  commentTexts: {
    marginLeft: '20px',
    width: '100%',
    wordWrap: 'break-word',
    overflow: 'hidden',
  },
  timestamp: {
    fontSize: '0.6em',
    color: '#333333',
    display: 'block'
  },
  userImage: {
    paddingTop: '.3rem'
  }
}))


export default function TaskComments(props) {
  const classes = useStyles()
  const {
    asset,
    task,
  } = props
  const assetId = asset.id

  const comments = useSelector(getCurrentTaskComments)

  return (
    <>
    <List disablePadding className={props.classes || classes.scroll}>
      { comments.map((comment, index) => (
        <CommentItem
          key={`task-comment-${assetId}-${comment.id}`}
          itemKey={`task-comment-${comment.id}`}
          assetId={assetId}
          task={task}
          comment={comment}
        />
      ))}
    </List>
    </>
  )
}


function CommentItem(props) {
  const {
    comment,
    itemKey
  } = props
  const {
    // id,
    text,
    creationUserId,
    // modificationTimestamp,
    // creationTimestamp
  } = comment

  const timestamp = (new Date()).toDateString();
  
  const classes = useStyles();

  return (
    <>
      <ListItem
        key={`${itemKey}-li`}
        disableGutters
        className={classes.commentListItem}
      >
        <div className={classes.commentWrapper}>
          <div className={classes.userImage}>
            <Identicon bg='#FFFFFF' string={`${creationUserId}`} size={30}/>
          </div>
          <div className={classes.commentTexts}>
            <Typography>{text}</Typography>
            <Typography component='label' className={classes.timestamp}>{timestamp}</Typography>
          </div>
        </div>
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
    <Input id="new_comment" type={'text'} label="New Comment" value={comment} autoComplete=''
      onChange={(e) => setComment(e.target.value) }
      fullWidth={true}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            aria-label="Send comment"
            onClick={onClick}
            onMouseDown={onClick}>
            <SendIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  </div>)
}
