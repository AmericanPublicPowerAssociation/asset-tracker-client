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
    //width: theme.spacing(32),
  },
  title: {
    fontSize: 24,
  },
  cardActionArea: {
    // width: theme.spacing(48),
    padding: theme.spacing(3),
  }
})


class TasksWindow extends PureComponent {

  render() {
    const { classes } = this.props

    return (

      <Grid container spacing={3}>
        <Grid item xs>
          <Link
            underline='none'
            component={RouterLink}
            to='/tasks/assets'
          >
            <Card className={classes.card}>
              <CardActionArea className={classes.cardActionArea}>
                <Typography className={classes.title} align='center'>
                  Asset Tasks
                </Typography>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>

        <Grid item xs>
          <Link
            underline='none'
            component={RouterLink}
            to='/tasks/users'
          >
            <Card className={classes.card}>
              <CardActionArea className={classes.cardActionArea}>
                <Typography className={classes.title} align='center'>
                  OtherTasks
                </Typography>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>

    )
  }



}


export default withStyles(styles)(TasksWindow)
