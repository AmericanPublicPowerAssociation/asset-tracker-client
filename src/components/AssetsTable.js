import React from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {
  setFocusingAssetId,
  setFocusingBusId,
} from '../actions' 
import {
  getAssetById,
  getAssetTypeByCode,
  getAssetsGeoJson,
} from '../selectors'

const ASSET_TABLE_COLUMN_NAMES = [
  'type',
  'name',
]

export default function AssetsTable(props) {
  const dispatch = useDispatch()
  const {
    setSelectedAssetIndexes,
    setSelectedBusIndexes,
  } = props
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetById = useSelector(getAssetById)
  const { features } = useSelector(getAssetsGeoJson)

  const data = Object.values(assetById).map(
    asset => {
      const assetType = asset['typeCode']
      const attributes = asset['attributes']
      const vendorName = attributes ? attributes['vendorName'] : ''
      return {
        ...asset,
        vendorName,
        type: assetTypeByCode[assetType]['name'],
      }
  })

  const head = ASSET_TABLE_COLUMN_NAMES

  const name = 'asset'

  function onClick(id, is_deleted) {
    if (is_deleted) return
    const selectedIndex = features.reduce(
      (selectedIndex, feature, index) => {
        const featureId = feature.properties.id
        if (featureId === id )
          return index
        return selectedIndex
      },
      null
    )
    dispatch(setFocusingAssetId(id))
    dispatch(setFocusingBusId(null))
    setSelectedAssetIndexes([selectedIndex])
    setSelectedBusIndexes([])
  }

  function getHeaderLabel(header) {
    const result = header.replace( /([A-Z])/g, " $1" );
    var headerLabel = result.charAt(0).toUpperCase() + result.slice(1);
    return headerLabel
  }
  
  return (
    <Table>
      <TableHead>
        <TableRow>
          { head.map( header => { 
            const key = `table-${name}-${header}`
            return <TableCell key={key} align='center'>{getHeaderLabel(header)}</TableCell>
          })}
        </TableRow>
      </TableHead>

      <TableBody>
      {data.map(asset => {
        const is_deleted = asset['deleted']
        return (
          <TableRow key={asset.id}>
            { head.map(header => {
              const key = `table-${name}-${header}-${asset.id}`
              return (
                <TableCell
                  align='center'
                  key={key}
                  onClick={ () => onClick(asset.id, is_deleted)}
                  className={clsx({
                    'tcell-strikethrough': is_deleted
                  })}
                >
                  {asset[header]}
                </TableCell>
              )
            })}
          </TableRow>
        )}
      )}
      </TableBody>
    </Table>
  )
}
