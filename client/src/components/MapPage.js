import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles';

const styles = {
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

class MapPage extends Component {
  render() {
    return (
      <Grid container>
        <Grid item xs={6} className={this.props.classes.mapPanel}>Map</Grid>
        <Grid item className={this.props.classes.filterPanel}>Filter</Grid>
        <Grid item xs>
          <Grid container direction='column'>
            <Grid item xs className={this.props.classes.circuitPanel}>Circuit</Grid>
            <Grid item xs className={this.props.classes.detailPanel}>Detail</Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(MapPage)
