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
  fullHeight: {
    height: '100%',
  },
  card: {
    width: theme.spacing(32)
  },
  title: {
    fontSize: 24,
  },
  cardActionArea: {
    // width: theme.spacing(48),
    padding: theme.spacing(3),
  }
})


class DashboardsWindow extends PureComponent {
  render() {
    const { classes } = this.props

    return (
      <>
      
        <Grid container spacing={3}>

          <Grid item xs>
            <Link
              underline='none'
              component={RouterLink}
              to=''
            >
              <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea}>
                  <Typography className={classes.title} align='center'>
                    Tasks
                  </Typography>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>

          <Grid item xs>
            <Link
              underline='none'
              component={RouterLink}
              to='/reports/benchmarks'
            >
              <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea}>
                  <Typography className={classes.title} align='center'>
                    Benchmarks
                  </Typography>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>

          <Grid item xs>
            <Link
              underline='none'
              component={RouterLink}
              to='/logs/assets'
            >
              <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea}>
                  <Typography className={classes.title} align='center'>
                    Maintenance Logs
                  </Typography>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>

          <Grid item xs>
            <Link
              underline='none'
              component={RouterLink}
              to='/logs/users'
            >
              <Card className={classes.card}>
                <CardActionArea className={classes.cardActionArea}>
                  <Typography className={classes.title} align='center'>
                    Audit Trails
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
