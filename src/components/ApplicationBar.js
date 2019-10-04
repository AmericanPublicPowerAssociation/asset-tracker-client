import React from 'react'
import { Route } from 'react-router-dom'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import EditingOpenIcon from '@material-ui/icons/CenterFocusStrong'
import EditingSaveIcon from '@material-ui/icons/Check'
import AddIcon from '@material-ui/icons/Add'
import UploadIcon from '@material-ui/icons/VerticalAlignTop'
import DownloadIcon from '@material-ui/icons/VerticalAlignBottom'
import Typography from '@material-ui/core/Typography'
import {
  INFORMATION_DRAWER_WIDTH,
  NAVIGATION_DRAWER_WIDTH,
  RIGHT_DRAWER_MINIMUM_WIDTH,
  TOOLTIP_DELAY,
} from '../constants'


const useStyles = makeStyles(theme => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    padding: `0 ${theme.spacing(1)}px 0 ${theme.spacing(1)}px`,
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
    paddingLeft: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing(2),
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
}))


export default function ApplicationBar(props) {
  const classes = useStyles()
  const {
    isUserMember,
    isNavigationDrawerOpen,
    isInformationDrawerOpen,
    focusingAssetId,
    locatingAsset,
    relatingAsset,
    relatingAssetKey,
    openNavigationDrawer,
    openAssetAddDialog,
    openAssetsUploadDialog,
    downloadAssetsUploadDialog,
    downloadDSSAssets,
    setFocusingAsset,
    setLocatingAsset,
    setRelatingAsset,
  } = props

  const isDrawerOpen = isNavigationDrawerOpen || isInformationDrawerOpen
  const locatingAssetId = locatingAsset.get('id')
  const relatingAssetId = relatingAsset.get('id')

  const editingAssetId = locatingAssetId || relatingAssetId
  const editingAsset = locatingAssetId ? locatingAsset : relatingAsset
  const editingAssetName = editingAsset.get('name')
  const editingAttributeName = locatingAssetId ? 'Location' : {
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
          setLocatingAsset({id: null})
          setRelatingAsset({id: null, key: null})
        }}
      ><EditingSaveIcon /></IconButton>
    </Tooltip>

  const assetAddButton = isUserMember && !editingAssetId &&
    <Tooltip title='Add Asset' enterDelay={TOOLTIP_DELAY}>
      <IconButton aria-label='Add Asset' color='inherit'
        onClick={openAssetAddDialog}
      ><AddIcon /></IconButton>
    </Tooltip>

  const uploadAssetsCSV = isUserMember && !editingAssetId &&
    <Tooltip title='Upload CSV' enterDelay={TOOLTIP_DELAY}>
      <IconButton aria-label='Upload CSV' color='inherit'
        onClick={openAssetsUploadDialog}
      ><UploadIcon /> </IconButton>
    </Tooltip>

  const downloadAssetsCSV = isUserMember && !editingAssetId &&
    <Tooltip title='Download CSV' enterDelay={TOOLTIP_DELAY}>
      <IconButton aria-label='Download CSV' color='inherit'
        onClick={downloadAssetsUploadDialog}
      ><DownloadIcon /> </IconButton>
    </Tooltip>

  const downloadAssetsDSS = isUserMember && !editingAssetId &&
      <Tooltip title='Download DSS Script' enterDelay={TOOLTIP_DELAY}>
        <IconButton aria-label='Download DSS Script' color='inherit'
                    onClick={downloadDSSAssets}
        ><DownloadIcon /> </IconButton>
      </Tooltip>


  const assetButtonGroup =
    <>
      {editingAssetOpenButton}
      {editingAssetSaveButton}
      {assetAddButton}
      {uploadAssetsCSV}
      {downloadAssetsCSV}
      {downloadAssetsDSS}
    </>

  return (
    <AppBar
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isDrawerOpen,
        [classes.appBarWithNavigation]: isNavigationDrawerOpen,
        [classes.appBarWithInformation]: isInformationDrawerOpen,
      })}
      color={editingAssetId ? 'secondary' : 'default'}
    >
      <Toolbar disableGutters>

        <Tooltip title='Open Navigation' enterDelay={TOOLTIP_DELAY}>
          <IconButton aria-label='Open Navigation' color='inherit'
            className={clsx(classes.leftButton, {
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

        <Route exact path='/assets' render={() => assetButtonGroup }/>
        <Route exact path='/maps' render={() => assetButtonGroup }/>
        <Route exact path='/circuits' render={() => assetButtonGroup }/>

      </Toolbar>
    </AppBar>
  )
}
