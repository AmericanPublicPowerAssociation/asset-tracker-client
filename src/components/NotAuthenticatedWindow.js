import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CONTENT_PADDING } from '../constants'


const styles = theme => ({
  root: {
    padding: CONTENT_PADDING,
    height: '100%',
    overflow: 'auto',
  },
  hideIfSmall: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  button: {
    width: '200px',
    marginTop: '10%',
    fontSize: '30px',
    padding: '10px 0px',
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

        <Typography variant='h6' align='center' paragraph>
          Sign In Required
        </Typography>
        <Grid container direction='column'
          alignContent='center'
          alignItems='center'
          justify='center'
        >
          <Grid item md={6} xs={9}>
            <Typography align='justify' paragraph>
              Asset Tracker is a service provided by the <a href='https://www.publicpower.org' target='_blank' rel='noopener noreferrer'>American Public Power Association</a> to help utilities extend the lifetime of their assets and provide reliable power to their customers.
            </Typography>
            <Typography align='justify' paragraph>
              Please sign in using the navigation bar at the left.
            </Typography>
          </Grid>
          <Grid item className={classes.hideIfSmall}>
            <iframe title='Asset Tracker Video Preview' width='560' height='315' frameBorder='0' src='https://www.youtube-nocookie.com/embed/45dLM3gWJ3U?rel=0'></iframe>
          </Grid>
          <Grid item md={6} xs={9}>
            <Button component='a' variant='contained' href={authUrl} color='primary' className={classes.button}>
              Sign in
            </Button>
          </Grid>
        </Grid>


      </Paper >
    )
  }

}


export default withStyles(styles)(NotAuthenticatedWindow)
