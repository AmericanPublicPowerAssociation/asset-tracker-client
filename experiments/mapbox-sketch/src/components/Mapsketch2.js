import React from 'react'
import DeckGL from '@deck.gl/react'
import { 
	EditableGeoJsonLayer,
	ViewMode,
} from 'nebula.gl'
import {StaticMap} from 'react-map-gl'
import DrawModeList from './DrawModeList'

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoicm1ndWFyYWNoaSIsImEiOiJjazJ2NGxzbWQwMWJvM2JvMWZlcG9tcmkyIn0.1SvLM98IeEoOSR4qTopvtA'

// Initial viewport settings
const initialViewState = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
}


const myFeatureCollection = {
  type: 'FeatureCollection',
  features: []
}

const selectedFeatureIndexes = [];

export default class Mapsketch extends React.Component {
	constructor(props) {
		super(props)
    this.deckGL = React.createRef()
		this.state = {
			data: myFeatureCollection,
			drawMode: ViewMode,
		}
    this._onClick = this._onClick.bind(this)
    this._changeDrawMode = this._changeDrawMode.bind(this)
	}

  componentDidMount() {
  }

  _changeDrawMode(mode) {
    this.setState((prevState) => ({drawMode: mode}))
  }

	_onClick(event){
	}

  render() {
		const drawLayer = new EditableGeoJsonLayer({
      id: 'draw-mode',
      data: this.state.data,
      mode: this.state.drawMode,
      selectedFeatureIndexes,
      onEdit: ({ updatedData }) => {
        this.setState( {data: updatedData})
      }
    })

    return (
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <DrawModeList changeDrawMode={this._changeDrawMode}/>
        <div style={{position: 'relative', width: '90%', height: '100vh'}}>
          <DeckGL
            ref={this.deckGL}
            initialViewState={initialViewState}
            layers={[drawLayer]}
          >
            <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
          </DeckGL>
        </div>
      </div>
    )
 } 
}
