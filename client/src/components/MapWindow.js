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
import AssetListContainer from '../containers/AssetListContainer'

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
    minHeight: '50%',
  },
  listPanel: {
    backgroundColor: 'blue',
    overflow: 'auto',
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
        <Grid item xs={12} sm={9} className={classes.mapPanel}>
          <AssetMap />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.listPanel}>
          <AssetListContainer />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles, {withTheme: true})(MapWindow)
