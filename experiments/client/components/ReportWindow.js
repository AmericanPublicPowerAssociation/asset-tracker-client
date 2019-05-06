import React, { PureComponent, Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItemLink from './ListItemLink'
import WarningIcon from '@material-ui/icons/Warning'

class ReportWindow extends PureComponent {
  render() {
    const {
      vulnerableAssets,
    } = this.props
    return (
      <Fragment>
        <Typography variant='h6' align='center'>
          Reports
        </Typography>
        <List>
          <ListItemLink
            to='/reports/vulnerability'
            text='Vulnerability'
            icon={<WarningIcon />}
            badgeContent={vulnerableAssets.length ? vulnerableAssets.length : ''}
            badgeColor='error'
            inset
          />
        </List>
      </Fragment>
    )
  }
}

export default ReportWindow
