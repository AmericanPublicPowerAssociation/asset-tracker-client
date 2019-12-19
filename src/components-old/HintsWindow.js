import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import {
  SKETCHING_MODE_ADD,
  SKETCHING_MODE_CONNECT,
} from '../constants'

const useStyles = makeStyles( theme => ({
  root: {
    textAlign: 'center',
  },
	snackbar: {
    background: 'purple',
		color: 'white',
	},
  topCenter: {
    left: '50%',
    top: theme.spacing(10),
    transform: 'translateX(-50%)',
  }
}))

export default function HintsWindow(props){
  const {
    isSketching,
    sketchingMode,
    sketchingAssetType,
    selectedFeatureIndexes,
  } = props
  const selectedFeatureCount = selectedFeatureIndexes.length
  const classes = useStyles()

  let open = false
  let message
  if (
    sketchingMode === SKETCHING_MODE_ADD &&
    sketchingAssetType === 'l' &&
    selectedFeatureCount > 0
  ) {
    //open = true
    message = 'Double-click to finish the line'
  } else if (
    sketchingMode === SKETCHING_MODE_CONNECT
  ) {
    if (selectedFeatureCount === 0) {
      message = 'Select an electrical asset to connect'
    } else {
      message = 'Select a bus to finish the connection'
    }
    open = true
  } else if (sketchingMode === SKETCHING_MODE_ADD &&
             sketchingAssetType === 's') {
    open = true
    message = 'Close the polygon to finish drawing'
  }

  open = open && isSketching

  return (
    <div>
			<Snackbar 
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        classes={{anchorOriginTopCenter: classes.topCenter, root: classes.root}}
        ContentProps={{classes: {root: classes.snackbar}}}
				open={open}
				message={message} />
    </div>
  )
} 
