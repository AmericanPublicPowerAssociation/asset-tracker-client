import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import MapIcon from '@material-ui/icons/Map'
import TableIcon from '@material-ui/icons/ListAlt'
import ReportIcon from '@material-ui/icons/Assessment'
import AlertIcon from '@material-ui/icons/Notifications'
import AccountIcon from '@material-ui/icons/AccountCircle'
import ListItemLink from './ListItemLink'

const NavigationDrawer = ({ onClose, ...etc }) => {
  return (
    <Drawer
      onClose={onClose}
      {...etc}
    >
      <List>
        <ListItemLink
          to='/'
          text='Maps'
          icon={<MapIcon />}
        />
        <ListItemLink
          to='/tables'
          text='Tables'
          icon={<TableIcon />}
        />
        <ListItemLink
          to='/reports'
          text='Reports'
          icon={<ReportIcon />}
        />
        <ListItemLink
          to='/alerts'
          text='Alerts'
          icon={<AlertIcon />}
          badgeContent={3}
          badgeColor='error'
        />
        <ListItemLink
          to='/accounts'
          text='Accounts'
          icon={<AccountIcon />}
        />
      </List>
    </Drawer>
  )
}

export default NavigationDrawer
