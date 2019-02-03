import React from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Badge from '@material-ui/core/Badge'

const styles = theme => ({
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
})

const ListItemLink = ({
  classes,
  to, text, icon,
  badgeContent, badgeColor,
}) => {
  return (
    <ListItem button component={NavLink}
      exact
      to={to}
      activeClassName={classes.selected}
    >
      <ListItemIcon>{badgeContent ?
        <Badge
          badgeContent={badgeContent}
          color={badgeColor}
        >{icon}</Badge> :
        icon}
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  )
}

export default withStyles(styles)(ListItemLink)
