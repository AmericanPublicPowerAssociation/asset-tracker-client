import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AssetsMap from '../containers/AssetsMap'
import AssetsFilter from '../containers/AssetsFilter'
import AssetList from '../containers/AssetList'


const styles = theme => ({
  grid: {
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
  frame: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
    height: '100%',
  },
  filterPanel: {
    maxHeight: '50%',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '100%',
      maxWidth: '50%',
    },
    overflow: 'auto',
  },
  listPanel: {
    flex: 1,
    overflow: 'auto',
  },
})


class MapsWindow extends PureComponent {

  componentDidMount() {
    const {
      refreshAssetsKit,
    } = this.props
    refreshAssetsKit()
  }

  render() {
    const {
      classes,
    } = this.props
    return (
      <Grid container className={classes.grid}>
        <Grid item xs={12} sm={12} md={9} className={classes.mapFrame}>
          <AssetsMap />
        </Grid>
        <Grid item xs={12} sm={12} md={3} className={classes.tableFrame}>
          <div className={classes.frame}>
            <div className={classes.filterPanel}>
              <AssetsFilter />
            </div>
            <div className={classes.listPanel}>
              <AssetList />
            </div>
          </div>
        </Grid>
      </Grid>
    )
  }

}


export default withStyles(styles)(MapsWindow)
