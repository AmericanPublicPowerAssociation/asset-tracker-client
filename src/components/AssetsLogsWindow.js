import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import AssetFilter from '../containers/AssetFilter'
// import AssetLogsTable from '../containers/AssetLogsTable'


const styles = theme => ({
  fullHeight: {
    height: '100%',
  },
  frame: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
    overflow: 'auto',
  },
})


class AssetsLogsWindow extends PureComponent {

  componentDidMount() {
    const {
      refreshAssetsLogs,
    } = this.props
    refreshAssetsLogs()
  }

  render() {
    const { classes, assetsLogs } = this.props
    return (
      <Paper className={classes.fullHeight}>
        <Grid container className={classes.fullHeight}>
          <Grid item className={classes.frame}>
            <AssetFilter />
          </Grid>
          <Grid item className={classes.frame} xs={12} sm>
            {/*
              <AssetLogsTable />
            */}
            {assetsLogs}
          </Grid>
        </Grid>
      </Paper>
    )
  }
}


export default withStyles(styles)(AssetsLogsWindow)
