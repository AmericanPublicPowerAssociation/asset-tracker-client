import React from 'react'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {
  getRisks,
} from 'asset-report-risks'
import {
  OVERLAY_MODE_ASSETS,
  OVERLAY_MODE_RISKS,
  OVERLAY_MODE_TASKS,
  SKETCH_MODE_VIEW,
} from '../constants'
import {
  getColors,
  getAssetByIdLength,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(6),
    // left: theme.spacing(1),
  },
}))

export default function OverlaysWindow(props) {
  const classes = useStyles()
  const {
    overlayMode,
    sketchMode,
    setOverlayMode,
  } = props

  const colors = useSelector(getColors)
	const visibleRisks = useSelector(getRisks)

  const isViewing = sketchMode === SKETCH_MODE_VIEW

  const radioColor = colors.active

  const visibleAssetCount = useSelector(getAssetByIdLength)
  const visibleTaskCount = 5
  const visibleRiskCount = visibleRisks.length

  const assetsOverlayLabel = `Assets (${visibleAssetCount})`
  const tasksOverlayLabel = `Tasks (${visibleTaskCount})`
  const risksOverlayLabel = `Risks (${visibleRiskCount})`

  const RadioControl = (
    <Radio
      color='secondary'
      classes={{colorSecondary: radioColor}}
    />
  )

  function handleChange(e) {
    setOverlayMode(e.target.value)
  }

  return (
    <div className={clsx(classes.root, {
      poof: !isViewing,
    }, radioColor)}>

    {/* TODO: Show counts for what is visible in map after applying filters */}
      <RadioGroup
        value={overlayMode}
        onChange={handleChange}
      >
        <FormControlLabel
          value={OVERLAY_MODE_ASSETS}
          label={assetsOverlayLabel}
          control={RadioControl}
        />
        <FormControlLabel
          value={OVERLAY_MODE_TASKS}
          label={tasksOverlayLabel}
          control={RadioControl}
        />
        <FormControlLabel
          value={OVERLAY_MODE_RISKS}
          label={risksOverlayLabel}
          control={RadioControl}
        />
      </RadioGroup>
    </div>
  )
}
