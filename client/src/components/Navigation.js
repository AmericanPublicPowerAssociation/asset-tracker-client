import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import MapIcon from '@material-ui/icons/Map'
import TableIcon from '@material-ui/icons/ListAlt'
import ReportIcon from '@material-ui/icons/Assessment'
import AlertIcon from '@material-ui/icons/Notifications'
import AccountIcon from '@material-ui/icons/AccountCircle'

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 16,
  }
}

class Navigation extends Component {
  state = {
    open: false,
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    const { open } = this.state
    return (
      <React.Fragment>
        <AppBar position='fixed' color='default'>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              aria-label='Open navigation'
              onClick={this.handleDrawerOpen}
            ><MenuIcon /></IconButton>
            <Typography variant='h6' color='inherit' className={classes.grow} noWrap>Asset Tracker</Typography>
            <IconButton><SearchIcon /></IconButton>
          </Toolbar>
        </AppBar>
        <Drawer open={open} onClose={this.handleDrawerClose}>
          <List>
            <ListItem button>
              <ListItemIcon><MapIcon /></ListItemIcon>
              <ListItemText primary='Maps' />
            </ListItem>

            <ListItem button>
              <ListItemIcon><TableIcon /></ListItemIcon>
              <ListItemText primary='Tables' />
            </ListItem>

            <ListItem button>
              <ListItemIcon><ReportIcon /></ListItemIcon>
              <ListItemText primary='Reports' />
            </ListItem>

            <ListItem button>
              <ListItemIcon><Badge badgeContent={3} color='error'><AlertIcon /></Badge></ListItemIcon>
              <ListItemText primary='Alerts' />
            </ListItem>

            <ListItem button>
              <ListItemIcon><AccountIcon /></ListItemIcon>
              <ListItemText primary='Accounts' />
            </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    )
  }
}

export default withStyles(styles, {withTheme: true})(Navigation)
