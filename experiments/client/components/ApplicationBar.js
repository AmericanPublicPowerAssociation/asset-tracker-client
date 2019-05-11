import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import AddIcon from '@material-ui/icons/Add'
// import SunnyIcon from '@material-ui/icons/WbSunny'
// import SunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined'
// import SearchIcon from '@material-ui/icons/Search'
// import FilterListIcon from '@material-ui/icons/FilterList'
import ReturnIcon from '@material-ui/icons/CenterFocusStrong'
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'
import {
  // FILTER_LIST_DRAWER_WIDTH,
  INFORMATION_DRAWER_WIDTH,
  TOOLTIP_DELAY,
} from '../constants'

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
})

class ApplicationBar extends PureComponent {
  render() {
    const {
      classes,
      // Get local variables
      onMenuIconClick,
      onAddIconClick,
      // onThemeIconClick,
      // Get global variables
      selectedAssetIds,
      focusingAssetId,
      locatingAsset,
      relatingAssetKey,
      relatingAsset,
      vulnerableAssets,
      addSelectedAssetType,
      setFocusingAsset,
    } = this.props
    const isRightDrawerOpen = isInformationDrawerOpen
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
    const selectedAssetCount = selectedAssetIds.count()
    const applicationTitle = selectedAssetCount ?
      `Selected ${selectedAssetCount} Assets` :
      editingAssetId ?
        `Editing ${editingAttributeName} for ${editingAssetName}` :
        'Asset Tracker'
    return (
      <AppBar
        color={selectedAssetCount ? 'primary' :
          editingAssetId ? 'secondary' : 'default'}
      >
        <Toolbar>

          <Tooltip title='Open Navigation' enterDelay={TOOLTIP_DELAY}>
            <IconButton >
              <Badge badgeContent={vulnerableAssets.length ? vulnerableAssets.length : ''} color='error'>
                <MenuIcon />
              </Badge>
            </IconButton>
          </Tooltip>

        {withReturnIcon &&
          <Tooltip title='Return to Asset' enterDelay={TOOLTIP_DELAY}>
            <IconButton aria-label='Return to Asset'
              onClick={() => {
                addSelectedAssetType({id: editingAssetTypeId})
                setFocusingAsset({id: editingAssetId})
              }}
            ><ReturnIcon /></IconButton>
          </Tooltip>}

          <Tooltip title='Add Asset' enterDelay={TOOLTIP_DELAY}>
            <IconButton aria-label='Add Asset'
              onClick={onAddIconClick}
            ><AddIcon /></IconButton>
          </Tooltip>

          {/*
          <Tooltip title='Toggle Brightness' enterDelay={TOOLTIP_DELAY}>
            <IconButton aria-label='Toggle Brightness'
              onClick={onThemeIconClick}
            >{isDark ? <SunnyIcon /> : <SunnyOutlinedIcon />}</IconButton>
          </Tooltip>

          <Tooltip title='Search Assets' enterDelay={TOOLTIP_DELAY}>
            <IconButton aria-label='Search Assets'
              onClick={() => alert('Not yet implemented!')}
            ><SearchIcon /></IconButton>
          </Tooltip>

          <Tooltip title='Filter Assets' enterDelay={TOOLTIP_DELAY}>
            <IconButton aria-label='Filter Assets'
              className={(isFilterListDrawerOpen && classes.vanish) || ''}
              onClick={onFilterIconClick}
            ><FilterListIcon /></IconButton>
          </Tooltip>
          */}
        </Toolbar>
      </AppBar>
    )
  }
}