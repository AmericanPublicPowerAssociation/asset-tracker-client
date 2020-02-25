import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

export default function CollapsibleListItem(props) {
  const {
    title,
    description,
    isOpen,
    children,
    setIsOpen,
    onClick,
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
      >
        <ListItemText primary={title} secondary={description} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={isOpen}>
        {children}
      </Collapse >
    </>
  )
}
