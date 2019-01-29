import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Badge from '@material-ui/core/Badge'
import MapIcon from '@material-ui/icons/Map'
import TableIcon from '@material-ui/icons/ListAlt'
import ReportIcon from '@material-ui/icons/Assessment'
import AlertIcon from '@material-ui/icons/Notifications'
import AccountIcon from '@material-ui/icons/AccountCircle'

const NavigationDrawer = props => {
  const { onClose, ...etc } = props
  return (
    <Drawer
      onClose={onClose}
      {...etc}
    >
      <List>
        <ListItem button>
          <ListItemIcon><MapIcon /></ListItemIcon>
          <ListItemText primary='Maps' />
        </ListItem>

        <ListItem button>
          <ListItemIcon><TableIcon /></ListItemIcon>
          <ListItemText primary='Tables' />
        </ListItem>

        <ListItem button>
          <ListItemIcon><ReportIcon /></ListItemIcon>
          <ListItemText primary='Reports' />
        </ListItem>

        <ListItem button>
          <ListItemIcon><Badge badgeContent={3} color='error'><AlertIcon /></Badge></ListItemIcon>
          <ListItemText primary='Alerts' />
        </ListItem>

        <ListItem button>
          <ListItemIcon><AccountIcon /></ListItemIcon>
          <ListItemText primary='Accounts' />
        </ListItem>
      </List>
    </Drawer>
  )
}

export default NavigationDrawer
