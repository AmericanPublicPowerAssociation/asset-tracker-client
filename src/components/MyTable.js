import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

export default function MyTable(props) {
  const { data, head, name } = props
  return (
    <Table stickyHeader aria-label='sticky table' size='small'>
      <TableHead>
        <TableRow>
          { head.map( header => { 
            const key = `table-${name}-${header}`
            return <TableCell key={key}>{header.toUpperCase()}</TableCell>
          })}
        </TableRow>
      </TableHead>

      <TableBody>
      {data.map(asset =>
        <TableRow key={asset.id}>
          { head.map(header => {
            const key = `table-${name}-${header}-${asset.id}`
            return <TableCell key={key}>{asset[header]}</TableCell>
          })}
        </TableRow>
      )}
      </TableBody>
    </Table>
  )
}
