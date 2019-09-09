import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import AssetTasksTable from '../components/AssetTasksTable'


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


class AssetTasksWindow extends PureComponent {

  componentDidMount() {
    const {
      refreshTasks,
    } = this.props
    refreshTasks()
  }

  render() {
    const {
      classes,
      assetsTasks,
    } = this.props

    console.log('WHEEE  ', assetsTasks)

      return (
        <Paper className={classes.fullHeight}>
          <Grid container className={classes.fullHeight}>
            <Grid item className={classes.frame} >
              {assetsTasks}
            </Grid>
            <Grid item className={classes.frame}>
            <AssetTasksTable rows = {assetsTasks}/>
            </Grid>
          </Grid>
        </Paper>
      )
    }
  }


  export default withStyles(styles)(AssetTasksWindow)
