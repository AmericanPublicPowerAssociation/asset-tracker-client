import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  selected: {
    backgroundColor: theme.palette.action.selected,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

class ListItemLink extends PureComponent {
  render() {
    const {
      classes,
      to, text, icon, inset, nested,
      badgeContent, badgeColor,
    } = this.props
    return (
      <ListItem button component={NavLink}
        exact to={to} activeClassName={classes.selected}
        className={nested ? classes.nested : ''}
      >
      {icon &&
        <ListItemIcon>
        {badgeContent ?
          <Badge badgeContent={badgeContent} color={badgeColor}>
            {icon}
          </Badge> :
          icon
        }
        </ListItemIcon>
      }
        <ListItemText inset={inset} primary={text} />
      </ListItem>
    )
  }
}

export default withStyles(styles)(ListItemLink)
