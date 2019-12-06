import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
// import { makeStyles } from '@material-ui/core/styles'
import {
  SKETCHING_MODE_ADD,
  SKETCHING_MODE_CONNECT,
} from '../constants'

/*
const useStyles = makeStyles( theme => ({
	snackbar: {
    background: 'rgba(255, 255, 255, .9)',
		color: 'black',
	},
}))
*/

export default function HintsWindow(props){
  const {
    sketchingMode,
    sketchingAssetType,
    selectedFeatureIndexes,
  } = props
  const selectedFeatureCount = selectedFeatureIndexes.length

  let open = false
  let message
  if (
    sketchingMode === SKETCHING_MODE_ADD &&
    sketchingAssetType === 'l' &&
    selectedFeatureCount > 0
  ) {
    open = true
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
  }

  return (
    <div>
			<Snackbar 
        // ContentProps={{classes: {root: classes.snackbar}}}
				open={open}
				message={message} />
    </div>
  )
} 
