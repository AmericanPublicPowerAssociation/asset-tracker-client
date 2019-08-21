import React, { PureComponent } from 'react'
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
  },
  title: {
    fontSize: 24,
  },
  cardActionArea: {
    // width: theme.spacing(48),
    padding: theme.spacing(3),
  }
})


class LogsWindow extends PureComponent {

  render() {
    const { classes } = this.props

    return (

      <Grid container spacing={3}>
        <Grid item xs>
          <Link
            underline='none'
            component={RouterLink}
            to='/logs/assets'
          >
            <Card className={classes.card}>
              <CardActionArea className={classes.cardActionArea}>
                <Typography className={classes.title} align='center'>
                  Asset Maintenance Log
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
                  User Audit Trail
                </Typography>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>

    )
  }



}


export default withStyles(styles)(LogsWindow)
