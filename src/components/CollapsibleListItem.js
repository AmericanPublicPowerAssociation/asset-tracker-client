// TODO: Review from scratch

import React from 'react'
import clsx from 'clsx'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

export default function CollapsibleListItem({
  title,
  description,
  isHighlighted,
  isOpen,
  children,
  setIsOpen,
  onClick,
  entered,
  styling,
}) {

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
          highlighted: isHighlighted,
        }, styling)}
      >
        <ListItemText primary={title} secondary={description} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={isOpen} classes={{ entered:  entered }} className= {clsx({
          highlighted: isHighlighted,
        }, styling)}
      >
        {children}
      </Collapse >
    </>
  )
}
