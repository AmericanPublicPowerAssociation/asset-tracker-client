import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'


function AssetsTable(props) {
  const { assets } = props
  return (
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell>Asset</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Vendor</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Version</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {assets.map(asset =>
        <TableRow key={asset.id}>
          <TableCell>{asset.name}</TableCell>
          <TableCell>{asset.type}</TableCell>
          <TableCell>{asset.vendor}</TableCell>
          <TableCell>{asset.product}</TableCell>
          <TableCell>{asset.version}</TableCell>
        </TableRow>
      )}
      </TableBody>
    </Table>
  )
}

export default AssetsTable
