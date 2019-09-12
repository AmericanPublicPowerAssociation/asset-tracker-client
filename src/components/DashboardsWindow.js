import React, { PureComponent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  RisksCard,
} from 'asset-report-risks'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
  container: {
    padding: theme.spacing(3),
  },
  item: {
    padding: theme.spacing(3),
  },
  title: {
    fontSize: 24,
  },
  cardActionArea: {
    padding: theme.spacing(3),
  },
})


class DashboardsWindow extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <>
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

          <Grid item xs className={classes.item}>
            <RisksCard />
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
      </>
    )
  }
}


export default withStyles(styles)(DashboardsWindow)
