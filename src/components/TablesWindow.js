import React, { PureComponent } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { getAssetTypeName } from '../routines'


class TablesWindow extends PureComponent {

  componentDidMount() {
    const {
      refreshAssets,
    } = this.props
    refreshAssets()
  }

  render = () => {
    const {
      visibleAssets,
    } = this.props
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {visibleAssets.map(asset => {
          const assetId = asset.get('id')
          const assetName = asset.get('name')
          const assetTypeName = getAssetTypeName(asset)
          return (
            <TableRow
              key={assetId}
            >
              <TableCell component='th' scope='row'>
                {assetName}
              </TableCell>
              <TableCell>
                {assetTypeName}
              </TableCell>
            </TableRow>
          )
        })}
        </TableBody>
      </Table>
    )
  }
}


export default TablesWindow
