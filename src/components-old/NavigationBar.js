import {
  GeolocateControl,
} from 'react-map-gl'

<GeolocateControl
  className={classes.buttonStyle}
  positionOptions={{enableHighAccuracy: true}}
  trackUserLocation={true} />
