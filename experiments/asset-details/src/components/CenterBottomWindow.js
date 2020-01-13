import React from 'react'
import clsx from 'clsx'
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import HistoryIcon from '@material-ui/icons/History'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles( theme => ({
  buttons: {
    position: 'fixed',
    left: '50%',
    bottom: theme.spacing(4),
    transform: 'translateX(-50%)',
    zIndex: 1,
    display: 'flex'
  },
  button: {
    margin: theme.spacing(1),
    color: 'black',
    background: 'rgba(255, 255, 255, .5)',
  },
}))

export default function CenterBottomWindow(props){
  const {
    sketchingAssetType,
    selectedFeatureIndexes,
    setSelectedFeatureIndexes,
    features,
    historyIndex,
    isSketching,
    undo,
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
  }

  return (
    <div className={clsx(classes.buttons, {poof: true})}>
      <div className={clsx({poof})}>
        <Fab className={classes.button} onClick={_onClick}>
          <DoneIcon color='inherit' />
        </Fab>
        { false && <Fab className={classes.button}>
          <ClearIcon />
          </Fab>
        }
      </div>
        <div className={clsx({poof: !isSketching || historyIndex < 0})}>
        <Fab
          className={classes.button}
          onClick={ () => undo() }>
          <HistoryIcon />
        </Fab>
      </div>
    </div>
  )
}
