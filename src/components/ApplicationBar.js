import React, { Fragment, PureComponent } from 'react'
import { Route } from 'react-router-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import EditingOpenIcon from '@material-ui/icons/CenterFocusStrong'
import EditingSaveIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import {
  CONTENT_PADDING,
  INFORMATION_DRAWER_WIDTH,
  NAVIGATION_DRAWER_WIDTH,
  RIGHT_DRAWER_MINIMUM_WIDTH,
  TOOLTIP_DELAY,
} from '../constants'


const styles = theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    padding: `0 ${theme.spacing.unit}px 0 ${theme.spacing.unit}px`,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
  },
  appBarShift: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarWithNavigation: {
    width: `calc(100% - ${NAVIGATION_DRAWER_WIDTH}px)`,
    marginLeft: NAVIGATION_DRAWER_WIDTH,
    paddingLeft: CONTENT_PADDING,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
    },
  },
  appBarWithInformation: {
    width: `calc(100% - ${INFORMATION_DRAWER_WIDTH}px)`,
    marginRight: INFORMATION_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      width: `calc(100% - ${RIGHT_DRAWER_MINIMUM_WIDTH}px)`,
      marginRight: RIGHT_DRAWER_MINIMUM_WIDTH,
    },
  },
  grow: {
    flexGrow: 1,
  },
  leftButton: {
    marginRight: 8,
  },
  vanish: {
    display: 'none',
  },
})


class ApplicationBar extends PureComponent {

  render() {
    const {
      classes,
      isUserMember,
      isNavigationDrawerOpen,
      isInformationDrawerOpen,
      focusingAssetId,
      relatingAsset,
      relatingAssetKey,
      openNavigationDrawer,
      openAssetAddDialog,
      setFocusingAsset,
      setRelatingAsset,
    } = this.props

    const isDrawerOpen = isNavigationDrawerOpen || isInformationDrawerOpen
    const relatingAssetId = relatingAsset.get('id')
    const editingAssetId = relatingAssetId
    const editingAsset = relatingAsset
    const editingAssetName = editingAsset.get('name')
    const editingAttributeName = {
      connectedIds: 'Connections',
      parentIds: 'Parents',
      childIds: 'Children',
    }[relatingAssetKey]

    const applicationTitle = editingAssetId ?
      `Editing ${editingAttributeName} for ${editingAssetName}` :
      'Asset Tracker'

    const editingAssetOpenButton =
      editingAssetId &&
      editingAssetId !== focusingAssetId &&
      <Tooltip title='Open Editing Asset' enterDelay={TOOLTIP_DELAY}>
        <IconButton aria-label='Open Editing Asset' color='inherit'
          onClick={() => setFocusingAsset({id: editingAssetId})}
        ><EditingOpenIcon /></IconButton>
      </Tooltip>

    const editingAssetSaveButton =
      editingAssetId &&
      <Tooltip title='Save Editing Asset' enterDelay={TOOLTIP_DELAY}>
        <IconButton aria-label='Save Editing Asset' color='inherit'
          onClick={() => {
            setFocusingAsset({id: editingAssetId})
            setRelatingAsset({id: null, key: null})
          }}
        ><EditingSaveIcon /></IconButton>
      </Tooltip>

    const assetAddButton = isUserMember &&
      <Tooltip title='Add Asset' enterDelay={TOOLTIP_DELAY}>
        <IconButton aria-label='Add Asset' color='inherit'
          onClick={openAssetAddDialog}
        ><AddIcon /></IconButton>
      </Tooltip>

    const assetButtonGroup =
      <Fragment>
        {editingAssetOpenButton}
        {editingAssetSaveButton}
        {assetAddButton}
      </Fragment>

    return (
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: isDrawerOpen,
          [classes.appBarWithNavigation]: isNavigationDrawerOpen,
          [classes.appBarWithInformation]: isInformationDrawerOpen,
        })}
        color={editingAssetId ? 'secondary' : 'default'}
      >
        <Toolbar disableGutters>

          <Tooltip title='Open Navigation' enterDelay={TOOLTIP_DELAY}>
            <IconButton aria-label='Open Navigation' color='inherit'
              className={classNames(classes.leftButton, {
                [classes.vanish]: isNavigationDrawerOpen,
              })}
              onClick={openNavigationDrawer}
            ><MenuIcon /></IconButton>
          </Tooltip>

          <Typography
            variant='h6'
            color='inherit'
            className={classes.grow}
            noWrap
          >{applicationTitle}</Typography>

          <Route exact path='/tables' render={() => assetButtonGroup }/>
          <Route exact path='/maps' render={() => editingAssetSaveButton }/>
          <Route exact path='/circuits' render={() => assetAddButton }/>

        </Toolbar>
      </AppBar>
    )
  }

}


export default withStyles(styles)(ApplicationBar)
