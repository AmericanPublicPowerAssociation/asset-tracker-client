import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {
  setFocusingAssetId,
} from '../actions' 
import {
  getAssetTableData,
  getAssetsGeoJson,
} from '../selectors'

export default function AssetsTable(props) {
  const dispatch = useDispatch()
  const {
    setSelectedAssetIndexes,
  } = props
  const { head, data, name } = useSelector(getAssetTableData)
  const { features } = useSelector(getAssetsGeoJson)

  const clickCallBack = (id) => {
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
    setSelectedAssetIndexes([selectedIndex])
  }

  const getHeaderLabel = header => {
    const result = header.replace( /([A-Z])/g, " $1" );
    var headerLabel = result.charAt(0).toUpperCase() + result.slice(1);
    return headerLabel
  }
  
  return (
    <Table stickyHeader aria-label='sticky table' size='small'>
      <TableHead>
        <TableRow>
          { head.map( header => { 
            const key = `table-${name}-${header}`
            return <TableCell key={key}>{getHeaderLabel(header)}</TableCell>
          })}
        </TableRow>
      </TableHead>

      <TableBody>
      {data.map(asset =>
        <TableRow key={asset.id}>
          { head.map(header => {
            const key = `table-${name}-${header}-${asset.id}`
            return (
              <TableCell
                key={key}
                onClick={ () => clickCallBack(asset.id)}
              >
                {asset[header]}
              </TableCell>
            )
          })}
        </TableRow>
      )}
      </TableBody>
    </Table>
  )
}
