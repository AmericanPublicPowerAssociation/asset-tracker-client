import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AssetMapContainer from '../containers/AssetMapContainer'
import AssetListContainer from '../containers/AssetListContainer'

const styles = theme => ({
  root: {
    height: '100%',
  },
  mapPanel: {
    minHeight: '50%',
    backgroundColor: 'lightblue',
  },
  listPanel: {
    height: '100%',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: '50%',
    },
  },
})

class MapWindow extends PureComponent {
  render() {
    const {
      classes,
      onSelect,
    } = this.props
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={12} md={9} className={classes.mapPanel}>
          <AssetMapContainer onSelect={onSelect} />
        </Grid>
        <Grid item xs={12} sm={12} md={3} className={classes.listPanel}>
          <AssetListContainer onSelect={onSelect} />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(MapWindow)
