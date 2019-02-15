import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { ASSET_TYPE_BY_ID } from '../constants'

const styles = () => ({
	root: {
    height: '100%',
	},
  hover: {
    cursor: 'pointer',
  },
})

class TableWindow extends PureComponent {
  render() {
    const {
      classes,
      // Get local variables
      onSelect,
      // Get global variables
      visibleAssets,
      highlightedAssetId,
      setHighlightedAsset,
    } = this.props
    return (
      <div className={classes.root}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Asset Name</TableCell>
              <TableCell align='right'>Asset Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {visibleAssets.map(asset => {
            const assetId = asset.get('id')
            const assetName = asset.get('name')
            const assetTypeId = asset.get('typeId')
            return (
              <TableRow
                hover
                selected={assetId === highlightedAssetId}
                classes={{
                  hover: classes.hover,
                }}
                onClick={() => {
                  setHighlightedAsset({id: assetId})
                  onSelect()
                }}
                key={assetId}
              >
                <TableCell component='th' scope='row'>
                  {assetName}
                </TableCell>
                <TableCell align='right'>
                  {ASSET_TYPE_BY_ID[assetTypeId].name}
                </TableCell>
              </TableRow>
            )
          })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default withStyles(styles)(TableWindow)
