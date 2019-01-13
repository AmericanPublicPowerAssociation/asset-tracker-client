import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  dashboardContainer: {
  },
  informationContainer: {
  },
  informationPanel: {
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
}

class Dashboard extends Component {
  render() {
    return (
      <Grid container className={this.props.classes.dashboardContainer}>
        <Grid item xs={6} className={this.props.classes.mapPanel}>
          Map
        </Grid>
        <Grid item className={this.props.classes.filterPanel}>
          Filter
        </Grid>
        <Grid item className={this.props.classes.informationPanel}>
          <Grid container direction='column' className={this.props.classes.informationContainer}>
            <Grid item xs={6} className={this.props.classes.circuitPanel}>
              Circuit
            </Grid>
            <Grid item xs={6} className={this.props.classes.detailPanel}>
              Detail
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Dashboard)
