import React, { PureComponent } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { ASSET_TYPE_BY_ID } from '../constants'


class TablesWindow extends PureComponent {

  componentDidMount() {
    const {
      refreshAssets,
    } = this.props
    refreshAssets()
  }

  render() {
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
          const assetTypeId = asset.get('typeId')
          const primaryType = ASSET_TYPE_BY_ID[assetTypeId[0]]
          const secondaryType = primaryType.typeById[assetTypeId[1]]
          const assetTypeNameParts = [primaryType.name]
          if (secondaryType) {
            assetTypeNameParts.push(secondaryType.name)
          }
          return (
            <TableRow
              key={assetId}
            >
              <TableCell component='th' scope='row'>
                {assetName}
              </TableCell>
              <TableCell>
                {assetTypeNameParts.join(' > ')}
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
