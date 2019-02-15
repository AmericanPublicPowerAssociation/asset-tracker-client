import React, { PureComponent } from 'react'
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

class ListItemLink extends PureComponent {
  render() {
    const {
      classes,
      to, text, icon,
      badgeContent, badgeColor,
    } = this.props
    return (
      <ListItem button component={NavLink}
        exact to={to} activeClassName={classes.selected}
      >
        <ListItemIcon>{badgeContent ?
          <Badge badgeContent={badgeContent} color={badgeColor}>
            {icon}
          </Badge> :
          icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    )
  }
}

export default withStyles(styles)(ListItemLink)
