import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AssetMap from '../containers/AssetMap'
import AssetFilter from '../containers/AssetFilter'
import AssetList from '../containers/AssetList'


const styles = theme => ({
  fullHeight: {
    height: '100%',
  },
  mapFrame: {
    minHeight: '50%',
  },
  tableFrame: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '50%',
    },
  },
  filterPanel: {
  },
  listPanel: {
  },
})


class MapsWindow extends PureComponent {

  componentDidMount() {
    const { refreshAssets } = this.props
    refreshAssets()
  }

  render() {
    const {
      classes,
    } = this.props
    return (
      <Grid container className={classes.fullHeight}>
        <Grid item xs={12} sm={12} md={9} className={classes.mapFrame}>
          <AssetMap />
        </Grid>
        <Grid item xs={12} sm={12} md={3} className={classes.tableFrame}>
          <Grid container direction='column' className={classes.fullHeight}>
            <Grid item className={classes.filterPanel} xs>
              <AssetFilter />
            </Grid>
            <Grid item className={classes.listPanel} xs>
              <AssetList />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

}


export default withStyles(styles)(MapsWindow)
