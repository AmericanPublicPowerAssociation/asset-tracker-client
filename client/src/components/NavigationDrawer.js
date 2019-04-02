import React, { PureComponent } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItemLink from './ListItemLink'
import TableIcon from '@material-ui/icons/ListAlt'
import MapIcon from '@material-ui/icons/Map'
import CircuitIcon from '@material-ui/icons/SettingsInputComponent'
import ReportIcon from '@material-ui/icons/Assessment'
// import AlertIcon from '@material-ui/icons/Notifications'
// import AccountIcon from '@material-ui/icons/AccountCircle'

class NavigationDrawer extends PureComponent {
  render() {
    const {
			classes,
      onClose,
      ...etc
    } = this.props
    return (
      <Drawer
        onClose={onClose}
        {...etc}
      >
        <List>
          <ListItemLink
            to='/'
            text='Tables'
            icon={<TableIcon />}
          />
          <ListItemLink
            to='/maps'
            text='Maps'
            icon={<MapIcon />}
          />
          <ListItemLink
            to='/circuits'
            text='Circuits'
            icon={<CircuitIcon />}
          />
          <ListItemLink
            to='/reports'
            text='Reports'
            icon={<ReportIcon />}
          />
          {/*
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
          */}
        </List>
      </Drawer>
    )
  }
}

export default NavigationDrawer
