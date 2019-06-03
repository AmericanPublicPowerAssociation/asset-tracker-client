import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import Switch from '@material-ui/core/Switch'
import { capitalize } from '../macros'
import {
  getAssetTypeName,
  scrollToFocusingAsset,
} from '../routines'


const styles = theme => ({
  hover: {
    cursor: 'pointer',
  },
  hide: {
    visibility: 'hidden',
  },
  editing: {
    backgroundColor: theme.palette.secondary.main,
  },
})


class AssetTable extends PureComponent {

  componentDidUpdate() {
    scrollToFocusingAsset(this)
  }

  render() {
    const {
      classes,
      // Get redux variables
      visibleAssets,
      focusingAssetId,
      // locatingAssetId,
      relatingAssetId,
      relatingAssetKey,
      relatedAssetTypeIds,
      relatedAssetIds,
      assetTypeById,
      setFocusingAsset,
      addAssetRelation,
      dropAssetRelation,
    } = this.props

    // const editingAssetId = locatingAssetId || relatingAssetId
    const editingAssetId = relatingAssetId

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Name</TableCell>
          {relatingAssetId &&
            <TableCell align='right'>
              {capitalize(relatingAssetKey.replace('Ids', ''))}
            </TableCell>
          }
          </TableRow>
        </TableHead>
        <TableBody>
        {visibleAssets.map(asset => {
          const assetId = asset.get('id')
          const assetName = asset.get('name')
          const assetTypeId = asset.get('typeId')
          const primaryAssetTypeId = assetTypeId[0]
          const assetTypeName = getAssetTypeName(assetTypeId, assetTypeById)
          const isRelated = relatedAssetIds.includes(assetId)
          const actionPayload = {
            id: relatingAssetId,
            key: relatingAssetKey,
            otherId: assetId,
          }
          return (
            <TableRow
              className={classNames({
                [classes.editing]: editingAssetId && editingAssetId === assetId,
              })}
              hover
              classes={{
                hover: classes.hover,
              }}
              selected={assetId === focusingAssetId}
              key={assetId}
              ref={assetId}
              onClick={() => {
                setFocusingAsset({id: assetId})
              }}
            >
              <TableCell>
                {assetTypeName}
              </TableCell>
              <TableCell component='th' scope='row'>
                {assetName}
              </TableCell>
            {
              relatingAssetId &&
              <TableCell align='right'>
                <Switch
                  className={classNames({
                    [classes.hide]:
                      !relatedAssetTypeIds.includes(primaryAssetTypeId) ||
                      relatingAssetId === assetId
                  })}
                  checked={isRelated}
                  onChange={() => isRelated ?
                    dropAssetRelation(actionPayload) :
                    addAssetRelation(actionPayload)
                  }
                />
              </TableCell>
            }
            </TableRow>
          )
        })}
        </TableBody>
      </Table>
    )
  }
}


export default withStyles(styles)(AssetTable)
