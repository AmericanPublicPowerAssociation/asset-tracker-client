import React, { PureComponent } from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import {
  DARK_MAP_STYLE,
  SATELLITE_STREETS_MAP_STYLE,
} from '../constants'

const StreetViewIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path fill="none" d="M0 0h24v24H0z"/>
    <path d="M12.56 14.33c-.34.27-.56.7-.56 1.17V21h7c1.1 0 2-.9 2-2v-5.98c-.94-.33-1.95-.52-3-.52-2.03 0-3.93.7-5.44 1.83z"/>
    <circle cx="18" cy="6" r="5"/>
    <path d="M11.5 6c0-1.08.27-2.1.74-3H5c-1.1 0-2 .9-2 2v14c0 .55.23 1.05.59 1.41l9.82-9.82C12.23 9.42 11.5 7.8 11.5 6z"/>
  </svg>
)

const SatelliteIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.99h3C8 6.65 6.66 8 5 8V4.99zM5 12v-2c2.76 0 5-2.25 5-5.01h2C12 8.86 8.87 12 5 12zm0 6l3.5-4.5 2.5 3.01L14.5 12l4.5 6H5z"/>
  </svg>
)

const MapIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
  </svg>
)

const mapStyles = {
  dark: MapIcon,
  streets: StreetViewIcon,
  satelliteStreets: SatelliteIcon,
}

class MapStyleSwitch extends PureComponent {
  
  onClick = (styleName) => {
    const { setBaseMapStyleName } = this.props
    setBaseMapStyleName(styleName)
  }

  nextMapStyle = () => {
    const { curBaseMapStyleName } = this.props
    return mapStyles[curBaseMapStyleName]
  }

  render() {
    const { nextBaseMapStyleName } = this.props
    return ( 
      <Tooltip title="Change Map Style" placement="bottom-start">
        <div>
        <button
          onClick={() => {this.onClick(nextBaseMapStyleName)}}
          style = {{
            'width': '30px',
            'borderRadius': '5px',
            'marginTop': '5px',
            'background': 'white'
          }}
        >
          <div style={{
            'display': 'flex',
            'justifyContent': 'center'
          }}>
            { mapStyles[nextBaseMapStyleName] }
          </div>
        </button>
        </div>
      </Tooltip>
    )
  }
}

export default MapStyleSwitch
