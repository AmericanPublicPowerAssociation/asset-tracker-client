import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
  root: {
    padding: theme.spacing(3),
    height: '100%',
    overflow: 'auto',
  },
  hideIfSmall: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  button: {
    fontSize: '30px',
    width: '200px',
    margin: '10px 0',
    padding: '10px 0',
    [theme.breakpoints.down('xs')]: {
      fontSize: '24px',
      width: '150px',
    },
  },
})

class NotAuthenticatedWindow extends PureComponent {

  render() {
    const {
      classes,
      authUrl,
    } = this.props

    return (
      <Paper className={classes.root}>

        <Grid
          container
          direction='column'
          alignItems='center'
          spacing={3}
        >
          <Grid item md={6} xs={9}>
            <Typography align='justify'>
              Asset Tracker is a service provided by the <a href='//www.publicpower.org' target='_blank' rel='noopener noreferrer'>American Public Power Association</a> to help utilities extend the lifetime of their assets and provide reliable power to their customers.
            </Typography>
          </Grid>

          <Grid item md={6} xs={9}>
            <Button component='a' variant='contained' href={authUrl} color='primary' className={classes.button}>
              Sign In
            </Button>
          </Grid>

          <Grid item className={classes.hideIfSmall}>
            <iframe title='Asset Tracker Preview' width='560' height='315' frameBorder='0' src='//www.youtube-nocookie.com/embed/8VtQicHeZEE?rel=0' />
          </Grid>

        </Grid>

      </Paper>
    )
  }

}


export default withStyles(styles)(NotAuthenticatedWindow)
