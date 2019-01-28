import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { CONTENT_PADDING } from '../constants'
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
  },
  frame: {
    height: '100%',
  },
  mapPanel: {
    backgroundColor: 'red',
    minHeight: '50%',
  },
  listPanel: {
    // backgroundColor: 'blue',
    overflow: 'auto',
  },
})

const MapWindow = (props) => {
  const { classes, onItemSelect } = props
  return (
    <Paper className={classes.window}>
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
