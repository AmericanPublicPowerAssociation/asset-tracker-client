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
    height: `calc(100vh - 56px - ${theme.spacing.unit * 3}px)`,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: `calc(100vh - 48px - ${theme.spacing.unit * 3}px)`,
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - 64px - ${theme.spacing.unit * 3}px)`,
    },
  },
  mapFrame: {
    height: '100%',
  },
  detailFrame: {
    height: '100%',
  },
  mapPanel: {
    backgroundColor: 'red',
  },
  listPanel: {
    maxWidth: theme.spacing.unit * 24,
    overflow: 'auto',
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
    <Grid container spacing={24} className={classes.root}>
      <Grid item xs={8}>
        <Paper className={classes.paper}>
          <Grid container className={classes.mapFrame}>
            <Grid item xs className={classes.mapPanel}>
              <AssetMap />
            </Grid>
            <Grid item xs className={classes.listPanel}>
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
