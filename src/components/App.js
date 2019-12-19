import React, { useState } from 'react'
import AssetsMap from './AssetsMap'
import OptionsWindow from './OptionsWindow'
import {
  MAP_STYLE_NAME,
} from '../constants'
import './App.css'

export default function App() {
  const [mapStyleName, setMapStyleName] = useState(MAP_STYLE_NAME)
  return (
    <div>
      <AssetsMap
        mapStyleName={mapStyleName}
      />
      <OptionsWindow
        mapStyleName={mapStyleName}
        setMapStyleName={setMapStyleName}
      />
    </div>
  )
}
