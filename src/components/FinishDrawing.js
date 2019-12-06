import React from 'react'
import clsx from 'clsx'
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  buttons: {
    position: 'fixed',
    left: '50%',
    bottom: theme.spacing(4),
    transform: 'translateX(-50%)',
    zIndex: 1,
  },
  button: {
    margin: theme.spacing(1),
    color: 'black',
    background: 'rgba(255, 255, 255, .5)',
  },
}))

export default function FinishDrawing(props){
  const {
    deckHandleEvent,
    sketchingAssetType,
    selectedFeatureIndexes,
    setSelectedFeatureIndexes,
    features
  } = props
  const classes = useStyles()
  let poof = true
  if (sketchingAssetType === 'l' && selectedFeatureIndexes.length > 0) {
    const feature = features[selectedFeatureIndexes[0]]
    if (feature){
      const geometry = feature.geometry.coordinates
      poof = false
    }
  }

  const _onClick = (e) => {
    e.preventDefault()
    setSelectedFeatureIndexes([])
    //console.log(deckHandleEvent)
    //deckHandleEvent({
    //  type: 'keydown',
    //  srcEvent: {keyCode: 37}
    //})
  }
  
  return (
    <div className={clsx(classes.buttons, {poof})}>
      <Fab className={classes.button} onClick={_onClick}>
        <DoneIcon color='inherit' />
      </Fab>
      { false && <Fab className={classes.button}>
        <ClearIcon />
        </Fab>
      }
    </div>
  )
} 
