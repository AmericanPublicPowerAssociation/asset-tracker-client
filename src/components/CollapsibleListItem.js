import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'


const useStyles = makeStyles({
  root: {
    background: 'rgb(255,250,205)',
    '&:hover': {
      background: 'rgb(255,250,205)',
    },
  },
})


export default function CollapsibleListItem(props) {
  const classes = useStyles()
  const {
    title,
    description,
    isOpen,
    children,
    setIsOpen,
    onClick,
    highlight,
  } = props

  function handleClick() {
    setIsOpen(!isOpen)
    if (onClick) onClick()
  }

  return (
    <>
      <ListItem
        button
        disableGutters
        component='div'
        onClick={handleClick}
        className={clsx({
          [classes.root]: highlight
        })}
      >
        <ListItemText primary={title} secondary={description} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={isOpen} className= {clsx({
          [classes.root]: highlight
        })}
      >
        {children}
      </Collapse >
    </>
  )
}
