import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import AssetFilter from './AssetFilter'
import AssetMap from './AssetMap'
import AssetDetail from './AssetDetail'
import AssetCircuit from './AssetCircuit'

const styles = theme => ({
  dashboardContainer: {
    // padding: "16px",
    // height: "100%",
    // margin: '16px',
    // margin: 16,
    // padding: 16,
    height: 'calc(100vh - 56px - 32px)',
    // height: 100,
  },
  /*
  dashboardContainer: {
    height: 'calc(100vh - 56px)',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: 'calc(100vh - 48px)',
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 64px)',
    },
  },
  informationContainer: {
    height: '100%',
  },
  listPanel: {
    maxHeight: 'calc(100vh - 56px)',
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      maxHeight: 'calc(100vh - 48px)',
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight: 'calc(100vh - 64px)',
    },
    overflow: 'auto',
  },
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
    // backgroundColor: 'black',
    // textAlign: 'center',
    // padding: theme.spacing.unit * 3,
    // margin: '16px',
    height: "100%",
    // height: 100,
    // height: '100vh',
  }
})

const MapPage = props => {
  const { classes } = props
  return (
    <div style={{ padding: 16 }}>
    <Grid container className={classes.dashboardContainer} spacing={16}>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>
        </Paper>
      </Grid>
    {/*
      <Grid item xs={8}>
        <Grid container>
          <Grid item xs={9} className={classes.mapPanel}>
            <AssetMap />
          </Grid>
          <Grid item xs={3} className={classes.listPanel}>
            <AssetFilter />
          </Grid>
            
        </Grid>
      </Grid>

      <Grid item xs>
        <Grid container direction='column' className={classes.informationContainer}>
          <Grid item xs className={classes.circuitPanel}>
            <AssetCircuit />
          </Grid>
          <Grid item xs className={classes.detailPanel}>
            <AssetDetail />
          </Grid>
        </Grid>
      </Grid>
    */}

    </Grid>
    </div>
  )
}

export default withStyles(styles)(MapPage)
