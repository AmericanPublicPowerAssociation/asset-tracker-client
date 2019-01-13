import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
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
}

const NavigationBar = props => {
  const { classes } = props;
  return (
    <AppBar position='fixed' color='default'>
      <Toolbar>
        <Typography variant='h6' color='inherit' className={classes.grow}>Asset Tracker</Typography>
        <IconButton><SearchIcon /></IconButton>
        <IconButton><MapIcon /></IconButton>
        <IconButton><TableIcon /></IconButton>
        <IconButton><ReportIcon /></IconButton>
        <IconButton><Badge badgeContent={3} color='error'><AlertIcon /></Badge></IconButton>
        <IconButton><AccountIcon /></IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(NavigationBar)
