import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AdapterLink from './AdapterLink'
import { CONTENT_PADDING } from '../constants'


const styles = theme => ({
  root: {
    padding: CONTENT_PADDING,
    height: '100%',
    overflow: 'auto',
  },
  card: {
    width: theme.spacing.unit * 32,
  },
  title: {
    fontSize: 24,
  },
})


class ReportsWindow extends PureComponent {

  render() {
    const {
      classes,
    } = this.props
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title}>
              Vulnerabilities
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              component={AdapterLink}
              to='/reports/vulnerabilities'
            >View</Button>
          </CardActions>
        </Card>
      </div>
    )
  }

}


export default withStyles(styles)(ReportsWindow)
