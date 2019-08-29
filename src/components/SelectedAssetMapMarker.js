import React, { PureComponent } from 'react'
import { Marker } from 'react-map-gl'
import PlaceIcon from '@material-ui/icons/Place'
import Busbar from '../images/assets/busbar-16.svg'
import Control from '../images/assets/control-16.svg'
import Station from '../images/assets/generating-station-16.svg'
import GeneratorLight from '../images/assets/generator-light-16.svg'
import Line from '../images/assets/line-16.svg'
import MeterLight from '../images/assets/meter-dark-16.svg'
import Pole from '../images/assets/pole-16.svg'
import Power from '../images/assets/power-16.svg'
import StorageLight from '../images/assets/storage-light-16.svg'
import Substation from '../images/assets/substation-16.svg'
import Switch from '../images/assets/switch-16.svg'
import Transformer from '../images/assets/transformer-16.svg'
import {
  FOCUSING_COLOR,
} from '../constants'


const textStyle = {
  color: "black",
  backgroundColor: "white",
}


class SelectedAssetMapMarker extends PureComponent {

  getMarkerByType = (
    assetId,
    assetLocation,
    assetLongitude, 
    assetLatitude,
    assetType,
    name) => {
    let icon;
    const default_icon = <PlaceIcon 
      htmlColor={FOCUSING_COLOR} 
      fontSize='large' />
    let offsetLeft = -17
    let offsetTop = -32
    switch(assetType){
      case 'p':
        icon = Pole
        offsetLeft = -17
        offsetTop = -32
        break
      case 'l':
        icon = Line
        break
      case 'm':
        icon = MeterLight
        offsetLeft = -20
        break
      case 't':
        icon = Transformer
        break
      case 'x':
        icon = Switch
        offsetLeft = -25
        offsetTop = -28
        break
      case 'q':
        icon = Power
        break
      case 'c':
        icon = Control
        break
      case 'b':
        icon = Busbar
        break
      case 'o':
        icon = StorageLight
        offsetLeft = -25
        offsetTop = -32
        break
      case 'g':
        icon = GeneratorLight
        offsetLeft = -12
        offsetTop = -32
        break
      case 's':
        icon = Substation
        offsetLeft = -35
        offsetTop = -36
        break
      case 'S':
        icon = Station
        offsetLeft = -25
        break
      default:
        break
    }
    return (
      <Marker
        longitude={assetLongitude}
        latitude={assetLatitude}
        offsetLeft={offsetLeft}
        offsetTop={offsetTop} >
        { icon ? 
            <img src={icon} alt="selected-assets"/> :
            default_icon
        }
        { name && <div style={textStyle}>{name}</div>}
      </Marker>
    )
  }

  render() {
    const {
      assetId,
      assetLocation,
      defaultLongitude,
      defaultLatitude,
      assetType,
      name
    } = this.props
    if (!assetId) return null
    const assetLongitude = assetLocation.get(0, defaultLongitude)
    const assetLatitude = assetLocation.get(1, defaultLatitude)
    if (assetLongitude === undefined) return null
    return this.getMarkerByType(
      assetId, 
      assetLocation, 
      assetLongitude, 
      assetLatitude,
      assetType,
      name)
  }

}


export default SelectedAssetMapMarker
