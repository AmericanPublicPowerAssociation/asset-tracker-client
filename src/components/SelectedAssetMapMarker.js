import React, { PureComponent } from 'react'
import { Marker } from 'react-map-gl'
import PlaceIcon from '@material-ui/icons/Place'
import { ReactComponent as Busbar } from '../images/assets/busbar-16.svg'
import { ReactComponent as Control } from '../images/assets/control-16.svg'
import { ReactComponent as Station } from '../images/assets/generating-station-16.svg'
import { ReactComponent as GeneratorLight } from '../images/assets/generator-light-16.svg'
import { ReactComponent as Line } from '../images/assets/line-16.svg'
import { ReactComponent as MeterLight } from '../images/assets/meter-dark-16.svg'
import { ReactComponent as Pole } from '../images/assets/pole-16.svg'
import { ReactComponent as Power } from '../images/assets/power-16.svg'
import { ReactComponent as StorageLight } from '../images/assets/storage-light-16.svg'
import { ReactComponent as Substation } from '../images/assets/substation-16.svg'
import { ReaectComponent as Switch } from '../images/assets/switch-16.svg'
import { ReactComponent as Transformer } from '../images/assets/transformer-16.svg'
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
    const defaultFill = 'red'
    let Icon;
    const defaultIcon = <PlaceIcon 
      htmlColor={FOCUSING_COLOR} 
      fontSize='large' />
    let offsetLeft = -17
    let offsetTop = -32
    switch(assetType){
      case 'p':
        Icon = Pole
        offsetLeft = -17
        offsetTop = -32
        break
      case 'l':
        Icon = Line
        break
      case 'm':
        Icon = MeterLight
        offsetLeft = -20
        break
      case 't':
        Icon = Transformer
        break
      case 'x':
        Icon = Switch
        offsetLeft = -25
        offsetTop = -28
        break
      case 'q':
        Icon = Power
        break
      case 'c':
        Icon = Control
        break
      case 'b':
        Icon = Busbar
        break
      case 'o':
        Icon = StorageLight
        offsetLeft = -25
        offsetTop = -32
        break
      case 'g':
        Icon = GeneratorLight
        offsetLeft = -12
        offsetTop = -32
        break
      case 's':
        Icon = Substation
        offsetLeft = -35
        offsetTop = -36
        break
      case 'S':
        Icon = Station
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
        { Icon ? 
            <Icon fill={defaultFill} /> :
            defaultIcon
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
