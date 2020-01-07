import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

function RisksTable(props) {
  const { risks } = props
  return (
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell>Risk</TableCell>
          <TableCell>Asset</TableCell>
          <TableCell>Customers</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
      {risks.map(risk =>
        <TableRow key={risk.id}>
          <TableCell>{risk.name}</TableCell>
          <TableCell>{risk.assetId}</TableCell>
          <TableCell>{risk.meterCount}</TableCell>
        </TableRow>
      )}
      </TableBody>
    </Table>
  )
}

export default RisksTable
