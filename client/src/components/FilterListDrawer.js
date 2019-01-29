import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { FILTER_LIST_DRAWER_WIDTH } from '../constants'
import AssetTypeFilterContainer from '../containers/AssetTypeFilterContainer'

const styles = theme => ({
  drawer: {
    width: FILTER_LIST_DRAWER_WIDTH,
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      width: 256,
    },
  },
  drawerPaper: {
    width: FILTER_LIST_DRAWER_WIDTH,
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
    overflow: 'auto',
  },
})

const FilterListDrawer = props => {
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
        <AssetTypeFilterContainer />
      </div>
    </Drawer>
  )
}

export default withStyles(styles, {withTheme: true})(FilterListDrawer)
