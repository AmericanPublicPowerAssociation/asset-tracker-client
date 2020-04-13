import React, { useState, useEffect, useRef } from 'react'
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
import Scrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'


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
  },
  scrollBar: {
    paddingRight: '1rem',
  }
}))


export default function TaskComments(props) {
  const classes = useStyles()
  const {
    asset,
    task,
  } = props
  const assetId = asset.id
  const scrollBarRef = useRef()

  const comments = useSelector(getCurrentTaskComments)

  useEffect( () => {
    const scrollBarContainer = scrollBarRef.current._container
    let prevScrollHeight = scrollBarContainer.scrollHeight
    const intervalId = setInterval( function () {
      let nextScrollHeight = scrollBarContainer.scrollHeight
      if (nextScrollHeight === prevScrollHeight) {
        console.log(nextScrollHeight)
        scrollBarContainer.scrollTop = nextScrollHeight
        clearInterval(intervalId)
      }
      else {
        prevScrollHeight = nextScrollHeight
      }
    }, 50)
  }, [asset.id, task])

  return (
    <>
      <List disablePadding className={props.classes || classes.scroll}>
        <Scrollbar className={classes.scrollBar} ref={scrollBarRef}>
          { comments.map((comment, index) => (
            <CommentItem
              key={`task-comment-${assetId}-${comment.id}`}
              itemKey={`task-comment-${comment.id}`}
              assetId={assetId}
              task={task}
              comment={comment}
            />
          ))}
        </Scrollbar>
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
    creationTimestamp
  } = comment

  // JS datetime works in milliseconds, that's why you times 1000
  const timestamp = (new Date(creationTimestamp * 1000)).toLocaleString();
  
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

  function onEnterKeyPress(e) {
    if ( e.key === 'Enter') {
      submitComment()
      e.preventDefault()
    }
  }

  function submitComment() {
    if (comment !== '') {
      onSubmit(comment)
      setComment('')
    }
  }

  return (<div className={classes.bottomAction}>
    <Input id="new_comment" type={'text'} label="New Comment" value={comment} autoComplete=''
      onChange={(e) => setComment(e.target.value) }
      onKeyPress={onEnterKeyPress}
      fullWidth={true}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            disabled={ comment === ''}
            aria-label="Send comment"
            onClick={submitComment}
            onMouseDown={submitComment}>
            <SendIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  </div>)
}
