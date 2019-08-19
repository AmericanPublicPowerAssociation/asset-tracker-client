import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import AssetFilter from '../containers/AssetFilter'
import AssetTable from '../containers/AssetTable'


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


class TablesWindow extends PureComponent {

  componentDidMount() {
    const {
      refreshAssetsKit,
    } = this.props
    refreshAssetsKit()
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.fullHeight}>
        <Grid container className={classes.fullHeight}>
          <Grid item className={classes.frame}>
            <AssetFilter />
          </Grid>
          <Grid item className={classes.frame} xs={12} sm>
            <AssetTable />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}


export default withStyles(styles)(TablesWindow)
