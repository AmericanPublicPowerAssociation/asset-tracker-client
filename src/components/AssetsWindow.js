import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import AssetFilter from '../containers/AssetFilter'
import AssetTable from '../containers/AssetTable'


const styles = theme => ({
  paper: {
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  frame: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '50%',
    },
    overflow: 'auto',
  },
})


class AssetsWindow extends PureComponent {

  componentDidMount() {
    const {
      refreshAssetsKit,
    } = this.props
    refreshAssetsKit()
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper}>
        <Grid container className={classes.grid}>
          <Grid item className={classes.frame}
            xs={12} sm={5} md={4} lg={3} xl={2}
          >
            <AssetFilter />
          </Grid>
          <Grid item className={classes.frame}
            xs={12} sm={7} md={8} lg={9} xl={10}
          >
            <AssetTable />
          </Grid>
        </Grid>
      </Paper>
    )
  }
}


export default withStyles(styles)(AssetsWindow)
