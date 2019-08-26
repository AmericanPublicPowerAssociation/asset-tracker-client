import React, { PureComponent } from 'react'
import { Grid, Card, CardContent, Button, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"
import {
  VulnerabilitiesCard,
} from 'asset-vulnerability-report'

import { Link as RouterLink } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import CardActionArea from '@material-ui/core/CardActionArea'

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
            <VulnerabilitiesCard />
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
                  High prority Requests
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
                  High Security risks Assets
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
                  Important notification
                  </Typography>
                </CardActionArea>
              </Card>
            </Link>
          </Grid>

        </Grid>
    
        <Grid container spacing={16}>
          <Grid item  xs={6} md={2} xl={2}>
            <VulnerabilitiesCard />
          </Grid>
          <Grid item  xs={6} md={2} xl={2}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h6">
                  Summary
                  </Typography>
                <Button
                  component={Link}
                  to="/summary">View</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </>
    )
  }
}


export default withStyles(styles)(DashboardsWindow)
