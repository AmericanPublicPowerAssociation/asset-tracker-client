import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { INFORMATION_DRAWER_WIDTH } from '../constants'
import AssetCircuitContainer from '../containers/AssetCircuitContainer'
import AssetDetail from './AssetDetail'

const styles = theme => ({
  drawer: {
    width: INFORMATION_DRAWER_WIDTH,
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      width: 256,
    },
  },
  drawerPaper: {
    width: INFORMATION_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      width: 256,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  frame: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '0 24px',
  },
  circuitPanel: {
    height: '40%',
  },
  detailPanel: {
  },
})

const InformationDrawer = ({
  classes,
  onClose,
  ...etc
}) => {
  return (
    <Drawer
      className={classes.drawer}
      variant='persistent'
      anchor='right'
      classes={{
        paper: classes.drawerPaper,
      }}
      {...etc}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <div className={classes.frame}>
        <div className={classes.circuitPanel}>
          <AssetCircuitContainer />
        </div>
        <div className={classes.detailPanel}>
          <AssetDetail />
        </div>
      </div>
    </Drawer>
  )
}

export default withStyles(styles)(InformationDrawer)
