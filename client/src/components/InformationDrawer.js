import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { INFORMATION_DRAWER_WIDTH } from '../constants'
import AssetCircuit from './AssetCircuit'
import AssetDetailContainer from '../containers/AssetDetailContainer'

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
    flexGrow: 1,
  },
  detailPanel: {
    flexGrow: 2,
  },
})

const InformationDrawer = props => {
  const { classes, onClose, ...etc } = props
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
          <AssetCircuit />
        </div>
        <div className={classes.detailPanel}>
          <AssetDetailContainer />
        </div>
      </div>
    </Drawer>
  )
}

export default withStyles(styles, {withTheme: true})(InformationDrawer)
