import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
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
      refreshAssetsPack,
    } = this.props
    refreshAssetsPack()
  }

  render() {
    const {
      classes,
    } = this.props
    return (
      <Paper className={classes.fullHeight}>
        <Grid container className={classes.fullHeight}>
          <Grid item xs={12} sm={12} md={9} className={classes.mapFrame}>
            <AssetMap />
          </Grid>
          <Grid item xs={12} sm={12} md={3} className={classes.tableFrame}>
            <div className={classes.frame}>
              <div className={classes.filterPanel}>
                <AssetFilter />
              </div>
              <div className={classes.listPanel}>
                <AssetList />
              </div>
            </div>
          </Grid>
        </Grid>
      </Paper>
    )
  }

}


export default withStyles(styles)(MapsWindow)
