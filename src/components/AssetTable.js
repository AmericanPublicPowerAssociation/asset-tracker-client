import React, { PureComponent } from 'react'
import { findDOMNode }  from 'react-dom'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { getAssetTypeName } from '../routines'


const styles = theme => ({
  hover: {
    cursor: 'pointer',
  },
})


class AssetTable extends PureComponent {

  componentDidUpdate() {
    const { focusingAssetId } = this.props
    if (focusingAssetId) {
      findDOMNode(this.refs[focusingAssetId]).scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  render() {
    const {
      classes,
      // Get redux variables
      visibleAssets,
      focusingAssetId,
      setFocusingAsset,
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
              hover
              classes={{
                hover: classes.hover,
              }}
              selected={assetId === focusingAssetId}
              onClick={() => {
                setFocusingAsset({id: assetId})
              }}
              key={assetId}
              ref={assetId}
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


export default withStyles(styles)(AssetTable)
