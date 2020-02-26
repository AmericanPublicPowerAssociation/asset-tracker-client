import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import SendIcon from "@material-ui/icons/Send";
import {getCurrentTaskComments, getFocusingAsset} from "../selectors";
import Identicon from 'react-identicons';
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";


const useStyles = makeStyles(theme => ({
  bottomAction: {
    margin: '15px 0 15px 0',
    display: 'flex'
  },
  scroll: {
    maxHeight: '60%',
    overflowY: 'auto',
  },
  noPadding: {
    padding: 0
  },
  centerElements: {
    display: 'flex',
    alignItems: 'center'
  },
  marginComment: {
    marginLeft: '20px'
  },
  timestamp: {
    fontSize: '0.6em',
    color: '#333333',
    display: 'block'
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

  return (
    <>
    <List disablePadding className={classes.scroll}>
      { comments.reverse().map( (comment, index) => (
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
        className={classes.noPadding}
        >
        <ListItemText >
          <div className={classes.centerElements}>
            <Identicon bg='#FFFFFF' string={`${creationUserId}`} size={30}/>
            <div className={classes.marginComment}>
              <Typography component='p'>{text}
                <Typography component='label' className={classes.timestamp}>{timestamp}</Typography>
              </Typography>
            </div>
          </div>
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
    <Input id="new_comment" type={'text'} label="New Comment" value={comment} autoComplete={false}
           onChange={(e) => setComment(e.target.value) }
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