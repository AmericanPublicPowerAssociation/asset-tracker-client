import React, { PureComponent } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItemLink from './ListItemLink'
import MapIcon from '@material-ui/icons/Map'
import TableIcon from '@material-ui/icons/ListAlt'
import ReportIcon from '@material-ui/icons/Assessment'
import WarningIcon from '@material-ui/icons/Warning'
import AlertIcon from '@material-ui/icons/Notifications'
import AccountIcon from '@material-ui/icons/AccountCircle'

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
					<List
						component='div'
						disablePadding
					>
						<ListItemLink
							to='/reports/vulnerability'
							text='Vulnerability'
							icon={<WarningIcon />}
							inset
						/>
					</List>
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
}

export default NavigationDrawer
