import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  RisksCard,
} from 'asset-report-risks'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'


const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
  },
  title: {
    fontSize: 24,
  },
  section: {
    marginTop: theme.spacing(3),
  },
  card: {
    margin: theme.spacing(1),
  },
  cardActionArea: {
    padding: theme.spacing(3),
  },
}))


export default function DashboardsWindow(props) {
  const classes = useStyles()
  const { dashboards, refreshDashboards } = props

  const tasksSummary = dashboards.get('tasks')
  const assetsSummary = dashboards.get('assets')
  const risksSummary = dashboards.get('risks')
  const logsSummary = dashboards.get('logs')

  useEffect(() => {
    refreshDashboards()
  }, [refreshDashboards])

  return (
    <Grid container className={classes.container}>

      <Grid item xs={6}>

      {tasksSummary &&
        <Link underline='none' component={RouterLink} to='/tasks'>
          <Card className={classes.card}>
            <CardActionArea className={classes.cardActionArea}>
              <Typography className={classes.title} align='center'>
                Tasks
              </Typography>
            </CardActionArea>
          </Card>
        </Link>
      }

      {assetsSummary &&
        <Link underline='none' component={RouterLink} to='/assets'>
          <Card className={classes.card}>
            <CardActionArea className={classes.cardActionArea}>
              <Typography className={classes.title} align='center'>
                Assets
              </Typography>
              <Table className={classes.section}>
                <TableBody>
                  <TableRow>
                    <TableCell>Assets</TableCell>
                    <TableCell align='right'>
                      {assetsSummary.get('assetCount')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Meters</TableCell>
                    <TableCell align='right'>
                      {assetsSummary.get('meterCount')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Missing Location</TableCell>
                    <TableCell align='right'>
                      {assetsSummary.get('missingLocationCount')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Missing Connection</TableCell>
                    <TableCell align='right'>
                      {assetsSummary.get('missingConnectionCount')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Missing Vendor</TableCell>
                    <TableCell align='right'>
                      {assetsSummary.get('missingVendorNameCount')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Missing Product</TableCell>
                    <TableCell align='right'>
                      {assetsSummary.get('missingProductNameCount')}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Poles without Line</TableCell>
                    <TableCell align='right'>
                      {assetsSummary.get('missingLineCount')}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

            </CardActionArea>
          </Card>
        </Link>
      }

      </Grid>

      <Grid item xs={6}>

      {risksSummary &&
        <RisksCard to='/risks' values={risksSummary} />
      }

      {logsSummary &&
        <Link underline='none' component={RouterLink} to='/logs'>
          <Card className={classes.card}>
            <CardActionArea className={classes.cardActionArea}>
              <Typography className={classes.title} align='center'>
                Logs
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User ID</TableCell>
                    <TableCell>Event</TableCell>
                    <TableCell align='right'>Timestamp</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
              {logsSummary.get('recentLogs').map((log, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{log.get('userId', 'Ethan')}</TableCell>
                    <TableCell>{log.get('event')}</TableCell>
                    <TableCell align='right'>{log.get('timestamp')}</TableCell>
                  </TableRow>
                )
              })}
                </TableBody>
              </Table>
            </CardActionArea>
          </Card>
        </Link>
      }

      </Grid>

    </Grid>
  )
}
