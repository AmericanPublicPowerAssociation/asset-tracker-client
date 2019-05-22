import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AssetFilter from '../containers/AssetFilter'
import AssetTable from '../containers/AssetTable'


const styles = theme => ({
  root: {
    height: '100%',
  },
  frame: {
    height: '100%',
    overflow: 'auto',
  },
})


class TablesWindow extends PureComponent {

  componentDidMount() {
    const { refreshAssets } = this.props
    refreshAssets()
  }

  render = () => {
    const { classes } = this.props
    return (
      <Grid container className={classes.root}>
        <Grid item className={classes.frame}>
          <AssetFilter />
        </Grid>
        <Grid item className={classes.frame} xs>
          <AssetTable />
        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(TablesWindow)
