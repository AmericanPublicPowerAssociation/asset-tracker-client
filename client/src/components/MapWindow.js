import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AssetMap from './AssetMap'
import AssetListContainer from '../containers/AssetListContainer'

const styles = theme => ({
  frame: {
    height: '100%',
  },
  mapPanel: {
    minHeight: '50%',
    backgroundColor: 'lightblue',
  },
  listPanel: {
    overflow: 'auto',
  },
})

const MapWindow = ({
  classes,
  onSelect,
}) => (
  <Grid container className={classes.frame}>
    <Grid item xs={12} sm={9} className={classes.mapPanel}>
      <AssetMap onSelect={onSelect} />
    </Grid>
    <Grid item xs={12} sm={3} className={classes.listPanel}>
      <AssetListContainer onSelect={onSelect} />
    </Grid>
  </Grid>
)

export default withStyles(styles)(MapWindow)
