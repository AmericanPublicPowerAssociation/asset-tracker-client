import React from 'react'
import {
  ASSET_POLE,
  ASSET_LINE,
  ASSET_METER,
  ASSET_TRANSFORMER,
  ASSET_SWITCH,
  ASSET_CONTROL,
  ASSET_SUBSTATION,
  ASSET_OTHER
} from '../constants'

const assets_type = [
  {label: 'pole', type: ASSET_POLE},
  {label: 'line', type: ASSET_LINE},
  {label: 'meter', type: ASSET_METER},
  {label: 'transformer', type: ASSET_TRANSFORMER},
  {label: 'switch', type: ASSET_SWITCH},
  {label: 'control', type: ASSET_CONTROL},
  {label: 'substation', type: ASSET_SUBSTATION},
  {label: 'other', type: ASSET_OTHER},
]

function DrawModeList(props){
  const _handleClick = (e, type) => {
    e.preventDefault()
    props.changeAssetType(type)
  }

  return (
    <div id="assetTypes">
      <p style={{textAlign: 'center', fontSize: '1.4em'}}>Asset Type</p>
      {
        assets_type.map( (asset) => {
          const type = asset['type']
          const label = asset['label']
          return (
            <div
              key={type}
              style={{padding: '20px', border: '1px solid white', background: 'black', color: 'white'}}
              onClick={ (e) => _handleClick(e, type)}
            >
              {label.toUpperCase()} {props.assetType === asset['type'] ? '*' : '' }
            </div>
          )
        })
      } 
    </div>
  )
}

export default DrawModeList
