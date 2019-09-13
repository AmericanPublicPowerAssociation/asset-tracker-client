import React from 'react'
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


const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
  },
  item: {
    padding: theme.spacing(1),
  },
  title: {
    fontSize: 24,
  },
  cardActionArea: {
    padding: theme.spacing(1),
  },
}))


export default function DashboardsWindow(props) {
  const classes = useStyles()

  return (
    <Grid container className={classes.container}>

      <Grid item xs className={classes.item}>
        <Link
          underline='none'
          component={RouterLink}
          to='/tasks'
        >
          <Card>
            <CardActionArea className={classes.cardActionArea}>
              <Typography className={classes.title} align='center'>
                Tasks
              </Typography>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>

      <Grid item xs={6} className={classes.item}>
        <RisksCard to='/risks' />
      </Grid>

      <Grid item xs className={classes.item}>
        <Link
          underline='none'
          component={RouterLink}
          to='/logs'
        >
          <Card className={classes.card}>
            <CardActionArea className={classes.cardActionArea}>
              <Typography className={classes.title} align='center'>
                Logs
              </Typography>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>

    </Grid>
  )
}
