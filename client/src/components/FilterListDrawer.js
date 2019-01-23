import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FILTER_LIST_DRAWER_WIDTH } from '../constants'
import AssetTypeFilter from './AssetTypeFilter'
import PersistentRightDrawer from './PersistentRightDrawer'

const styles = {
  frame: {
    width: FILTER_LIST_DRAWER_WIDTH,
  },
}

const FilterListDrawer = (props) => {
  const { classes, isOpen, onClose } = props
  return (
    <PersistentRightDrawer
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={classes.frame}>
        <AssetTypeFilter />
      </div>
    </PersistentRightDrawer>
  )
}

export default withStyles(styles)(FilterListDrawer)
