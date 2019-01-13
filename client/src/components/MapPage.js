import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';

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
  filterPanel: {
    backgroundColor: 'blue',
  },
  circuitPanel: {
    backgroundColor: 'green',
  },
  detailPanel: {
    backgroundColor: 'yellow',
  },
})

class MapPage extends Component {
  render() {
    return (
      <Grid container className={this.props.classes.dashboardContainer}>
        <Grid item xs={6} className={this.props.classes.mapPanel}>Map</Grid>
        <Grid item className={this.props.classes.filterPanel}>Filter</Grid>
        <Grid item xs>
          <Grid container direction='column' className={this.props.classes.informationContainer}>
            <Grid item xs className={this.props.classes.circuitPanel}>Circuit</Grid>
            <Grid item xs className={this.props.classes.detailPanel}>Detail</Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(MapPage)
