import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'


const styles = {
  fullHeight: {
    height: '100%',
  },
}


class LogsWindow extends PureComponent {
  
  componentDidMount(){
    const {
      refreshLogs,
    } = this.props
    refreshLogs()
  }

  render() {
    const { classes, logs } = this.props
    return (
      <Paper className={classes.fullHeight}>
        <Typography variant='h6' align='center'>
          Logs
        </Typography>
        {logs}
      </Paper>
    )
  }
}


export default withStyles(styles)(LogsWindow)
