import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'
import {
  FILTER_LIST_DRAWER_WIDTH,
  INFORMATION_DRAWER_WIDTH,
} from '../constants'

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarTransition: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarWithInformation: {
    width: `calc(100% - ${INFORMATION_DRAWER_WIDTH}px)`,
    marginRight: INFORMATION_DRAWER_WIDTH,
  },
  appBarWithFilterList: {
    width: `calc(100% - ${FILTER_LIST_DRAWER_WIDTH}px)`,
    marginRight: FILTER_LIST_DRAWER_WIDTH,
  },
  menuButton: {
    marginRight: 16,
  },
})

const ApplicationBar = (props) => {
  const {
    classes,
    isInformationDrawerOpen,
    isFilterListDrawerOpen,
  } = props
  const {
    onAddIconClick,
    onFilterIconClick,
    onMenuIconClick,
  } = props
  const isRightDrawerOpen = isInformationDrawerOpen || isFilterListDrawerOpen
  return (
    <AppBar
      position='fixed'
      color='default'
      className={classNames(classes.appBar, {
        [classes.appBarTransition]: isRightDrawerOpen,
        [classes.appBarWithInformation]: isInformationDrawerOpen,
        [classes.appBarWithFilterList]: isFilterListDrawerOpen,
      })}
    >
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          onClick={onMenuIconClick}
        ><MenuIcon /></IconButton>
        <Typography
          variant='h6'
          color='inherit'
          className={classes.grow}
        >Asset Tracker</Typography>
        <IconButton
          onClick={onAddIconClick}
        ><AddIcon /></IconButton>
        <IconButton disabled><SearchIcon /></IconButton>
        <IconButton
          className={(isFilterListDrawerOpen && classes.hide) || ''}
          onClick={onFilterIconClick}
        ><FilterListIcon /></IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles, {withTheme: true})(ApplicationBar)
