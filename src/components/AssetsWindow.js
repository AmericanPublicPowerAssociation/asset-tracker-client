import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AssetsFilter from '../containers/AssetsFilter'
import AssetsTable from '../containers/AssetsTable'


const styles = theme => ({
  grid: {
    height: '100%',
  },
  frame: {
    height: '100%',
    [theme.breakpoints.down('xs')]: {
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
      <Grid container className={classes.grid}>
        <Grid item className={classes.frame}
          xs={12} sm={5} md={4} lg={3} xl={2}
        >
          <AssetsFilter />
        </Grid>
        <Grid item className={classes.frame}
          xs={12} sm={7} md={8} lg={9} xl={10}
        >
          <AssetsTable />
        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(AssetsWindow)