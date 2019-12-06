import React from 'react'
import clsx from 'clsx'
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
}))

function OverlaysWindow(props) {
  const classes = useStyles()
  const { isSketching, overlay, setOverlay } = props

  const visibleAssetCount = ASSETS.length
  const visibleTaskCount = TASKS.length
  const visibleRiskCount = RISKS.length

  const assetsOverlayLabel = `Assets (${visibleAssetCount})`
  const tasksOverlayLabel = `Tasks (${visibleTaskCount})`
  const risksOverlayLabel = `Risks (${visibleRiskCount})`

  return (
    <div className={clsx(classes.root, {poof: isSketching})}>
      {/* TODO: Show counts for what is visible in map after applying filters */}

      <RadioGroup value={overlay} onChange={e => setOverlay(e.target.value)}>
        <FormControlLabel control={<Radio />}
          value='assets' label={assetsOverlayLabel} />
        <FormControlLabel control={<Radio />}
          value='tasks' label={tasksOverlayLabel} />
        <FormControlLabel control={<Radio />}
          value='risks' label={risksOverlayLabel} />
      </RadioGroup>

    </div>
  )
}

export default OverlaysWindow
