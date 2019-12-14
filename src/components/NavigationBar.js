import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  GeolocateControl,
  NavigationControl,
} from 'react-map-gl'
import MapstyleToggle from './MapstyleToggle'


const useStyles = makeStyles( theme => ({
  bar: {
    position: 'absolute',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 3,
    alignItems: 'center'
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row',
  },
  buttonStyle: {
    marginLeft: '5px',
  }
}))
export default function NavigationBar(props) {
  const classes = useStyles()
  const {
    setViewport,
    mapstyle,
    setMapstyle,
    nextMapstyle,
  } = props
  
  const onViewportChange = (viewport) => {
    const {
      latitude,
      longitude,
      zoom,
      pitch,
      bearing } = viewport
    setViewport({latitude, longitude, zoom, pitch, bearing})
  }

  return (
    <div className={classes.bar}>
      <NavigationControl className={classes.navigation} onViewportChange={onViewportChange} />
      <GeolocateControl
        className={classes.buttonStyle}
        positionOptions={{enableHighAccuracy: true}}
        trackUserLocation={true} />
        <MapstyleToggle
          setMapstyle={setMapstyle}
          mapstyle={mapstyle}
          setViewport={setViewport}
          nextMapstyle={nextMapstyle}/>
    </div>
  )
}
