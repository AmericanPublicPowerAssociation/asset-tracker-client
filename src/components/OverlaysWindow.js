import React from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {
  getVisibleRiskCount,
} from 'asset-report-risks'
import {
  setOverlayMode,
} from '../actions'
import {
  OVERLAY_MODE_ASSETS,
  OVERLAY_MODE_RISKS,
  OVERLAY_MODE_TASKS,
} from '../constants'
import {
  getAssetCount,
  getColors,
  getIsViewing,
  getOpenTaskCount,
  getOverlayMode,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(6),
  },
}))

export default function OverlaysWindow() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isViewing = useSelector(getIsViewing)
  const overlayMode = useSelector(getOverlayMode)
  const colors = useSelector(getColors)
  // TODO: Update selectors to show counts for what is currently visible in map
  // TODO: Implement getVisibleAssetCount
  // TODO: Implement getVisibleTaskCount
  // TODO: Implement getVisibleRiskCount
  const visibleAssetCount = useSelector(getAssetCount)
  const visibleTaskCount = useSelector(getOpenTaskCount)
  const visibleRiskCount = useSelector(getVisibleRiskCount)

  const color = colors.active

  const assetsOverlayLabel = `Assets (${visibleAssetCount})`
  const tasksOverlayLabel = `Tasks (${visibleTaskCount})`
  const risksOverlayLabel = `Risks (${visibleRiskCount})`

  const RadioControl = (
    <Radio color='secondary' classes={{ colorSecondary: color }} />
  )

  return isViewing && (
    <div className={clsx(classes.root, color)}>
      <RadioGroup
        value={overlayMode}
        onChange={e => dispatch(setOverlayMode(e.target.value))}
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
