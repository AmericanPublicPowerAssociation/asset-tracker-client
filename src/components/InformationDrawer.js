import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import RightCloseIcon from '@material-ui/icons/ChevronRight'
import {
  INFORMATION_DRAWER_WIDTH,
  RIGHT_DRAWER_MINIMUM_WIDTH,
  TOOLTIP_DELAY,
} from '../constants'
import AssetDetail from '../containers/AssetDetail'


const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: `0 ${theme.spacing.unit}px`,
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  drawerPaper: {
    width: INFORMATION_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      width: RIGHT_DRAWER_MINIMUM_WIDTH,
    },
  },
  frame: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing.unit * 3,
    overflow: 'auto',
  },
})


class InformationDrawer extends PureComponent {
  render() {
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
          <Tooltip title='Close' enterDelay={TOOLTIP_DELAY}>
            <IconButton onClick={closeInformationDrawer}>
              <RightCloseIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Divider />
        <div className={classes.frame}>
          <AssetDetail />
        </div>
      </Drawer>
    )
  }
}


export default withStyles(styles)(InformationDrawer)
