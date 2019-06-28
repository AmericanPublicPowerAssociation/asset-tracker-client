import React, { PureComponent } from 'react'
import {
  VulnerabilitiesCard,
} from 'asset-vulnerability-report'


class DashboardsWindow extends PureComponent {
  render() {
    return (
      <>
        <VulnerabilitiesCard />
      </>
    )
  }
}


export default DashboardsWindow
