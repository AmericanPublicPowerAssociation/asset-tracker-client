import React from 'react'
import clsx from 'clsx'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { ASSETS, TASKS, RISKS } from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(8),
    left: theme.spacing(1),
    padding: theme.spacing(1),
  },
  dark: {
    color: 'white',
  },
  light: {
    color: 'black',
  }
}))


function OverlaysWindow(props) {
  const classes = useStyles()
  const {
    isSketching,
    overlay,
    setOverlay,
    mapStyle,
  } = props

  const visibleAssetCount = ASSETS.length
  const visibleTaskCount = TASKS.length
  const visibleRiskCount = RISKS.length

  const assetsOverlayLabel = `Assets (${visibleAssetCount})`
  const tasksOverlayLabel = `Tasks (${visibleTaskCount})`
  const risksOverlayLabel = `Risks (${visibleRiskCount})`
  
  const color = (
    mapStyle === 'streets' ?
    classes.light :
    classes.dark
  )

  const R = (
    <Radio
      color='secondary'
      classes={{colorSecondary: color}}
    />
  )

  return (
    <div className={clsx(classes.root, {poof: isSketching}, color)}>
      {/* TODO: Show counts for what is visible in map after applying filters */}

      <RadioGroup value={overlay} onChange={e => setOverlay(e.target.value)}>
        <FormControlLabel control={R}
          value='assets' label={assetsOverlayLabel} />
        <FormControlLabel control={R}
          value='tasks' label={tasksOverlayLabel} />
        <FormControlLabel control={R}
          value='risks' label={risksOverlayLabel} />
      </RadioGroup>

    </div>
  )
}

export default OverlaysWindow
