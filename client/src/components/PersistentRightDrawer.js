import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const styles = theme => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
})

const PersistentRightDrawer = (props) => {
  const { children, classes, isOpen, onClose } = props
  return (
    <Drawer
      variant='persistent'
      anchor='right'
      open={isOpen}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      {children}
    </Drawer>
  )
}

export default withStyles(styles, {withTheme: true})(PersistentRightDrawer)
