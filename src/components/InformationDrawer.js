import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import {
  INFORMATION_DRAWER_WIDTH,
  RIGHT_DRAWER_MINIMUM_WIDTH,
} from '../constants'
import AssetDetail from '../containers/AssetDetail'


const styles = theme => ({
  drawerPaper: {
    width: INFORMATION_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      width: RIGHT_DRAWER_MINIMUM_WIDTH,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing.unit}px`,
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  frame: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  overviewPanel: {
    height: '33%',
  },
  detailPanel: {
  },
})


class InformationDrawer extends PureComponent {
  render = () => {
    const {
      classes,
      isInformationDrawerOpen,
      closeInformationDrawer,
    } = this.props
    return (
      <Drawer
        variant='persistent'
        anchor='right'
        classes={{
          paper: classes.drawerPaper,
        }}
        open={isInformationDrawerOpen}
        onClose={closeInformationDrawer}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={closeInformationDrawer}>
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.frame}>
          <div className={classes.overviewPanel}>
            {/* <AssetCircuit /> */}
          </div>
          <div className={classes.detailPanel}>
            <AssetDetail />
          </div>
        </div>
      </Drawer>
    )
  }
}


export default withStyles(styles)(InformationDrawer)
