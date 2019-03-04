import React, { PureComponent } from 'react'
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
import ReturnIcon from '@material-ui/icons/CenterFocusStrong'
import Tooltip from '@material-ui/core/Tooltip';
import {
  FILTER_LIST_DRAWER_WIDTH,
  INFORMATION_DRAWER_WIDTH,
} from '../constants'

const styles = theme => ({
  grow: {
    flexGrow: 1,
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

class ApplicationBar extends PureComponent {
  render() {
    const {
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
      focusingAssetId,
      locatingAsset,
      relatingAssetKey,
      relatingAsset,
      addSelectedAssetType,
      setFocusingAsset,
    } = this.props
    const isRightDrawerOpen =
      isInformationDrawerOpen ||
      isFilterListDrawerOpen
    const locatingAssetId = locatingAsset.get('id')
    const relatingAssetId = relatingAsset.get('id')
    const editingAssetId = locatingAssetId || relatingAssetId
    const editingAsset = locatingAssetId ? locatingAsset : relatingAsset
    const editingAssetName = editingAsset.get('name')
    const editingAssetTypeId = editingAsset.get('typeId')
    const editingAttributeName = locatingAssetId ? 'Location' : {
      connectedIds: 'Connections',
      parentIds: 'Parents',
      childIds: 'Children',
    }[relatingAssetKey]
    const withReturnIcon =
      editingAssetId &&
      editingAssetId !== focusingAssetId
    const applicationTitle = editingAssetId ?
      `Editing ${editingAttributeName} for ${editingAssetName}` :
      'Asset Tracker'
    return (
      <AppBar
        position='fixed'
        color={editingAssetId ? 'secondary' : 'default'}
        className={classNames(classes.appBar, {
          [classes.appBarTransition]: isRightDrawerOpen,
          [classes.appBarWithInformation]: isInformationDrawerOpen,
          [classes.appBarWithFilterList]: isFilterListDrawerOpen,
        })}
      >
        <Toolbar>
          <Tooltip title='Open Navigation' enterDelay={500}>
            <IconButton aria-label='Open Navigation'
              className={classes.menuButton}
              onClick={onMenuIconClick}
            ><MenuIcon /></IconButton>
          </Tooltip>

          <Typography
            variant='h6'
            color='inherit'
            className={classes.grow}
            noWrap
          >{applicationTitle}</Typography>

        {withReturnIcon &&
          <Tooltip title='Return to Asset' enterDelay={500}>
            <IconButton aria-label='Return to Asset'
              onClick={() => {
                addSelectedAssetType({id: editingAssetTypeId})
                setFocusingAsset({id: editingAssetId})
              }}
            ><ReturnIcon /></IconButton>
          </Tooltip>}

          <Tooltip title='Add Asset' enterDelay={500}>
            <IconButton aria-label='Add Asset'
              onClick={onAddIconClick}
            ><AddIcon /></IconButton>
          </Tooltip>

          <Tooltip title='Toggle Brightness' enterDelay={500}>
            <IconButton aria-label='Toggle Brightness'
              onClick={onThemeIconClick}
            >{isDark ? <SunnyIcon /> : <SunnyOutlinedIcon />}</IconButton>
          </Tooltip>

          <Tooltip title='Search Assets' enterDelay={500}>
            <IconButton aria-label='Search Assets' disabled
              onClick={() => alert('Not yet implemented!')}
            ><SearchIcon /></IconButton>
          </Tooltip>

          <Tooltip title='Filter Assets' enterDelay={500}>
            <IconButton aria-label='Filter Assets'
              className={(isFilterListDrawerOpen && classes.vanish) || ''}
              onClick={onFilterIconClick}
            ><FilterListIcon /></IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(ApplicationBar)
