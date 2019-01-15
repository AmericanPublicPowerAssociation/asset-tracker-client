import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import AssetFilter from './AssetFilter'
import AssetMap from './AssetMap'
import AssetDetail from './AssetDetail'
import AssetCircuit from './AssetCircuit'

const styles = theme => ({
  root: {
    // backgroundColor: 'green',
    height: 'calc(100vh - 56px - 24px)',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      // backgroundColor: 'yellow',
      height: 'calc(100vh - 48px - 24px)',
    },
    [theme.breakpoints.up('sm')]: {
      // backgroundColor: 'orange',
      height: 'calc(100vh - 64px - 24px)',
    },
  },
  mapFrame: {
    height: '100%',
  },
  detailFrame: {
    height: '100%',
  },
  /*
    maxHeight: 'calc(100vh - 56px)',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      maxHeight: 'calc(100vh - 48px)',
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight: 'calc(100vh - 64px)',
    },
    overflow: 'auto',
  */
  mapPanel: {
    backgroundColor: 'red',
  },
  circuitPanel: {
    backgroundColor: 'green',
  },
  detailPanel: {
    backgroundColor: 'yellow',
  },
  paper: {
    height: '100%',
  }
})

const MapPage = props => {
  const { classes } = props
  return (
    <Grid container className={classes.root} spacing={24}>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <Grid container className={classes.mapFrame}>
            <Grid item xs={10} className={classes.mapPanel}>
              <AssetMap />
            </Grid>
            <Grid item xs={2} className={classes.listPanel}>
              <AssetFilter />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <Grid container direction='column' className={classes.detailFrame}>
            <Grid item xs className={classes.circuitPanel}>
              <AssetCircuit />
            </Grid>
            <Grid item xs className={classes.detailPanel}>
              <AssetDetail />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(MapPage)
