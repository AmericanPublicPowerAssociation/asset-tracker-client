import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { CONTENT_PADDING } from '../constants'


const styles = theme => ({
  root: {
    padding: CONTENT_PADDING,
    height: '100%',
    overflow: 'auto',
  },
})


class SettingsWindow extends PureComponent {

  render() {
    const {
      classes,
      withMorningTheme,
      toggleTheme,
    } = this.props
    return (
      <div className={classes.root}>
        <Typography variant='h6' align='center' paragraph>
          Settings
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={withMorningTheme}
              onChange={toggleTheme}
            />
          }
          label='Use Morning Theme'
        />
      </div>
    )
  }

}


export default withStyles(styles)(SettingsWindow)
