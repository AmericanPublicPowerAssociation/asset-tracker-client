import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    height: '100%',
    overflow: 'auto',
  },
}))


export default function SettingsWindow(props) {
  const classes = useStyles()
  const {
    withMorningTheme,
    toggleTheme,
  } = this.props

  return (
    <Paper className={classes.root}>
      <Typography variant='h6' align='center' paragraph>
        Settings
      </Typography>
      <FormControlLabel
        control={<Switch checked={withMorningTheme} onChange={toggleTheme} />}
        label='Use Morning Theme'
      />
    </Paper>
  )
}
