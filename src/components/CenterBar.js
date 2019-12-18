import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SketchButton from './SketchButton'
import NavigationBar from './NavigationBar'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    left: '50%',
    top: theme.spacing(1),
    transform: 'translateX(-50%)',
  },
}))


export default function CenterBar(props) {

  const {
    isSketching,
    setIsSketching,
    setViewport,
    setMapstyle,
    nextMapstyle,
    mapstyle,
  } = props
  const classes = useStyles()
  return (
    <div>
      <SketchButton
        isSketching={isSketching}
        setIsSketching={setIsSketching}
      />
      <NavigationBar
        setViewport={setViewport}
        setMapstyle={setMapstyle}
        mapstyle={mapstyle}
        nextMapstyle={nextMapstyle}/>
    </div>
  )
}
