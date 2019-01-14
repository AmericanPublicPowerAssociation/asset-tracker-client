import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AssetFilter from './AssetFilter'

const styles = theme => ({
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
  mapPanel: {
    backgroundColor: 'red',
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
  circuitPanel: {
    backgroundColor: 'green',
  },
  detailPanel: {
    backgroundColor: 'yellow',
  },
})

const MapPage = props => {
  const { classes } = props
  return (
    <Grid container className={classes.dashboardContainer}>
      <Grid item xs={6} className={classes.mapPanel}>
        <Typography variant='body1'>Map</Typography>
      </Grid>
      <Grid item className={classes.listPanel}>
        <AssetFilter />
      </Grid>
      <Grid item xs>
        <Grid container direction='column' className={classes.informationContainer}>
          <Grid item xs className={classes.circuitPanel}>
            <Typography variant='body1'>Circuit</Typography>
          </Grid>
          <Grid item xs className={classes.detailPanel}>
            <Typography variant='body1'>Detail</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(MapPage)
