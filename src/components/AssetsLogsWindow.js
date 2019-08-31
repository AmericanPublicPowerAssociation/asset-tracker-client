import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import AssetsLogsTable from '../components/AssetsLogsTable'


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
    const {
      classes,
      assetsLogs,
    } = this.props

      return (
        <Paper className={classes.fullHeight}>
          <Grid container className={classes.fullHeight}>
            <Grid item className={classes.frame} >
              {assetsLogs}
            </Grid>
            <Grid item className={classes.frame}>
            <AssetsLogsTable/>
            </Grid>
          </Grid>
        </Paper>
      )
    }
  }


  export default withStyles(styles)(AssetsLogsWindow)
