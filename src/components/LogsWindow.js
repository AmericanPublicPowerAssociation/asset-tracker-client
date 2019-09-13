import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'


const useStyles = makeStyles(theme => ({
  table: {
  },
}))


export default function LogsWindow(props) {
  const classes = useStyles()
  const { logs, refreshLogs } = props

  useEffect(() => {
    refreshLogs()
  }, [refreshLogs])

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>User ID</TableCell>
          <TableCell>Event</TableCell>
          <TableCell>Attributes</TableCell>
          <TableCell align='right'>Timestamp</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
    {logs.map((log, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{log.get('userId')}</TableCell>
          <TableCell>{log.get('event')}</TableCell>
          <TableCell>{log.get('attributes').entrySeq().map(([k, v]) => k + ' = ' + v).join(', ')}</TableCell>
          <TableCell align='right'>{log.get('timestamp')}</TableCell>
        </TableRow>
      )
    })}
      </TableBody>
    </Table>
  )
}
