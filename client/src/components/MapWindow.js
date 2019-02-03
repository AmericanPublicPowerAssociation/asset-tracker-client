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
    backgroundColor: 'blue',
    minHeight: '50%',
  },
  listPanel: {
    overflow: 'auto',
  },
})

const MapWindow = ({
  classes,
  exposedAssetKey,
  onSelect,
}) => {
  return (
    <Paper className={classes.window}>
      <Grid container className={classes.frame}>
        <Grid item xs={12} sm={9} className={classes.mapPanel}>
          <AssetMap
            onSelect={onSelect}
          />
        </Grid>
        <Grid item xs={12} sm={3} className={classes.listPanel}>
          <AssetListContainer
            onSelect={onSelect}
            exposedAssetKey={exposedAssetKey}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(MapWindow)
