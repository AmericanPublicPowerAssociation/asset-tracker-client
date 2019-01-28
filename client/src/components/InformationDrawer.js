import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { INFORMATION_DRAWER_WIDTH } from '../constants'
import PersistentRightDrawer from './PersistentRightDrawer'
import AssetCircuit from './AssetCircuit'
import AssetDetail from './AssetDetail'

const styles = {
  frame: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: INFORMATION_DRAWER_WIDTH,
  },
  circuitPanel: {
    backgroundColor: 'green',
    flexGrow: 1,
  },
  detailPanel: {
    backgroundColor: 'yellow',
    flexGrow: 2,
  },
}

const InformationDrawer = props => {
  const { classes, isOpen, onClose } = props
  return (
    <PersistentRightDrawer
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={classes.frame}>
        <div className={classes.circuitPanel}>
          <AssetCircuit />
        </div>
        <div className={classes.detailPanel}>
          <AssetDetail />
        </div>
      </div>
    </PersistentRightDrawer>
  )
}

export default withStyles(styles)(InformationDrawer)
