import React from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import {
  CONTENT_PADDING,
  INFORMATION_DRAWER_WIDTH,
  FILTER_LIST_DRAWER_WIDTH,
} from '../constants'
import AssetMap from './AssetMap'
import AssetList from './AssetList'

const styles = theme => ({
  window: {
    height: `calc(100vh - 56px - ${CONTENT_PADDING * 2}px)`,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: `calc(100vh - 48px - ${CONTENT_PADDING * 2}px)`,
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - 64px - ${CONTENT_PADDING * 2}px)`,
    },
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  windowTransition: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  windowWithInformation: {
    marginRight: INFORMATION_DRAWER_WIDTH,
  },
  windowWithFilterList: {
    marginRight: FILTER_LIST_DRAWER_WIDTH,
  },
  frame: {
    height: '100%',
  },
  mapPanel: {
    backgroundColor: 'red',
  },
  listPanel: {
    backgroundColor: 'blue',
    overflow: 'auto',
    maxWidth: INFORMATION_DRAWER_WIDTH,
  },
})

const MapWindow = (props) => {
  const {
    classes,
    isInformationDrawerOpen,
    isFilterListDrawerOpen,
    onItemSelect,
  } = props
  const isRightDrawerOpen = isInformationDrawerOpen || isFilterListDrawerOpen
  return (
    <Paper className={classNames(classes.window, {
      [classes.windowTransition]: isRightDrawerOpen,
      [classes.windowWithInformation]: isInformationDrawerOpen,
      [classes.windowWithFilterList]: isFilterListDrawerOpen,
    })}>
      <Grid container className={classes.frame} onClick={onItemSelect}>
        <Grid item xs className={classes.mapPanel}>
          <AssetMap />
        </Grid>
        <Grid item xs className={classes.listPanel}>
          <AssetList />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles, {withTheme: true})(MapWindow)
