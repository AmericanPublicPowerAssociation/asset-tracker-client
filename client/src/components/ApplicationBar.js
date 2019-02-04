import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
import SunnyIcon from '@material-ui/icons/WbSunny'
import SunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined'
import SearchIcon from '@material-ui/icons/Search'
import FilterListIcon from '@material-ui/icons/FilterList'
import TeleportIcon from '@material-ui/icons/CenterFocusStrong'

import {
  FILTER_LIST_DRAWER_WIDTH,
  INFORMATION_DRAWER_WIDTH,
  RELATION_NAME_BY_KEY,
} from '../constants'

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  vanish: {
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
    [theme.breakpoints.down('md')]: {
      width: `calc(100% - 256px)`,
      marginRight: 256,
    },
  },
  appBarWithFilterList: {
    width: `calc(100% - ${FILTER_LIST_DRAWER_WIDTH}px)`,
    marginRight: FILTER_LIST_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      width: `calc(100% - 256px)`,
      marginRight: 256,
    },
  },
  menuButton: {
    marginRight: 16,
  },
})

const ApplicationBar = ({
  classes,
  // Get local variables
  isDark,
  isInformationDrawerOpen,
  isFilterListDrawerOpen,
  onMenuIconClick,
  onAddIconClick,
  onThemeIconClick,
  onFilterIconClick,
  // Get global variables
  highlightedAssetId,
  exposedAssetId,
  exposedAssetKey,
  assetById,
  addSelectedAssetType,
  setHighlightedAsset,
}) => {
  const isRightDrawerOpen = isInformationDrawerOpen || isFilterListDrawerOpen
  const applicationTitle = exposedAssetId ?
    `Editing ${
      RELATION_NAME_BY_KEY[exposedAssetKey]
    } for ${
      assetById[exposedAssetId].name
    }` :
    'Asset Tracker'
  const withTeleportIcon = exposedAssetId && exposedAssetId !== highlightedAssetId
  return (
    <AppBar
      position='fixed'
      color={exposedAssetId ? 'secondary' : 'default'}
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
          noWrap
        >{applicationTitle}</Typography>
        <IconButton
          className={(!withTeleportIcon && classes.vanish) || ''}
          onClick={() => {
            addSelectedAssetType({id: assetById[exposedAssetId].typeId})
            setHighlightedAsset({id: exposedAssetId})
          }}
        ><TeleportIcon /></IconButton>
        <IconButton
          onClick={onAddIconClick}
        ><AddIcon /></IconButton>
        <IconButton
          onClick={onThemeIconClick}
        >{isDark ? <SunnyIcon /> : <SunnyOutlinedIcon />}</IconButton>
        <IconButton disabled><SearchIcon /></IconButton>
        <IconButton
          className={(isFilterListDrawerOpen && classes.vanish) || ''}
          onClick={onFilterIconClick}
        ><FilterListIcon /></IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(ApplicationBar)
