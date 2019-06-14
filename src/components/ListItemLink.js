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
      ...props
    } = this.props

    let component
    let componentProps
    if (to.startsWith('/')) {
      component = NavLink
      componentProps = {exact: true, to, activeClassName: classes.selected}
    } else {
      component = 'a'
      componentProps = {href: to}
    }

    return (
      <ListItem button component={component}
        {...componentProps}
        className={nested ? classes.nested : ''}
        {...props}
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
