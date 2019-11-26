import React from 'react'
import ReactDOM from 'react-dom'
import DeckGL from 'deck.gl'
import { 
	EditableGeoJsonLayer,
  CompositeMode,
  ModifyMode,
  TranslateMode,
  DrawPointMode,
	DrawLineStringMode,
  ViewMode,
  SelectionLayer,
  SELECTION_TYPE
} from 'nebula.gl'
import { StaticMap } from 'react-map-gl'
import DrawModeList from './DrawModeList'
import DrawAssetList from './DrawAssetList'
import MapTour from './MapTour'

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoicm1ndWFyYWNoaSIsImEiOiJjazJ2NGxzbWQwMWJvM2JvMWZlcG9tcmkyIn0.1SvLM98IeEoOSR4qTopvtA'

const initialViewState = {
  longitude: -73.897052,
  latitude: 40.780474,
  zoom: 15
}

const myFeatureCollection = {
  type: "FeatureCollection",
  features: [
    /* insert features here */
  ]
}


class Mapsketch extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			data: myFeatureCollection,
			editHandleType: 'point',
			drawMode: new CompositeMode([new DrawLineStringMode(), new ModifyMode()]),
      currentAssetType: null,
      selectedFeatureIndexes: [],
      selectionTool: SELECTION_TYPE.NONE,
      openDemo: true,
		}
		this._onEdit = this._onEdit.bind(this)
		this._changeDrawMode = this._changeDrawMode.bind(this)
		this._onLayerClick = this._onLayerClick.bind(this)
    this._changeAssetType = this._changeAssetType.bind(this)
    this._toggleDemo = this._toggleDemo.bind(this)
	}

  _toggleDemo(){
    this.setState( prevState => ({openDemo: !prevState.openDemo}))
  }

	_onEdit({ updatedData, editType, editContext }) {
		let newIndexes
		const { featureIndexes, positionIndexes, position } = editContext
    const { features } = updatedData
    if (this.state.drawMode === TranslateMode) {
      if (editType === 'translated'){
        const point = updatedData.features[featureIndexes[0]]
        if (point.link){
          const newCoord = point.geometry.coordinates
          point.link[0] = newCoord[0]
          point.link[1] = newCoord[1]
        }
      }
    }
    if (this.state.drawMode === ModifyMode) {
      if (editType === 'finishMovePosition'){
        const geoPoint = [position].map( (coord) => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coord
            },
            properties: {},
            link: updatedData.features[featureIndexes].geometry.coordinates[positionIndexes]
          }
        })
        updatedData.features = updatedData.features.concat(geoPoint)
      }
    }
    if (this.state.drawMode === DrawLineStringMode) {
      if (editType === 'addFeature'){
        const newLines = featureIndexes.map( (index) => {
          const feature = updatedData.features[index]
          const coords = feature.geometry.coordinates
          const geoPoints = coords.map( (coord, coordIndex) => {
            return {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: coord
              },
              properties: {},
              link: updatedData.features[index].geometry.coordinates[coordIndex],
            }
          })
          updatedData.features = updatedData.features.concat(geoPoints)
        })
      }
      else if (editType === 'addPosition'){
        const geoPoint = [position].map( (coord) => {
          return {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: coord
            },
            properties: {},
            link: updatedData.features[featureIndexes].geometry.coordinates[positionIndexes]
          }
        })
        updatedData.features = updatedData.features.concat(geoPoint)
      }
    }

		if (editType === 'addFeature'){
			newIndexes = featureIndexes
		}
		this.setState( (prevState) => {
			const updatedIndexes = newIndexes ? 
				[...prevState.selectedFeatureIndexes, ...newIndexes] :
				[...prevState.selectedFeatureIndexes]
			return {
				data: updatedData,
				selectedFeatureIndexes: updatedIndexes
			}
		})
	}

  _changeAssetType(type) {
    this.setState( (prevState) => ({
        currentAssetType: type
    }))
  }

	_changeDrawMode(mode) {
		this.setState( (prevState) => {
      if (mode === 'selection'){
        return {
          drawMode: ViewMode,
          selectionTool: SELECTION_TYPE.RECTANGLE,
          selectedFeatureIndexes: []
        }
      }
      else if (mode === DrawLineStringMode)
				return {

			    drawMode: mode,
          selectedFeatureIndexes: [],
          selectionTool: SELECTION_TYPE.None
				}
			return {
        drawMode: mode,
        selectionTool: SELECTION_TYPE.None
			}
		})
	}
	
	_onLayerClick(event) {
    if (this.state.drawMode !== ViewMode || this.state.selectionTool !== SELECTION_TYPE.None)
      return
    else if (event) {
			this.setState({selectedFeatureIndexes: [event.index]})	
    }
    else {
      this.setState({selectedFeatureIndexes: []})
    }
	}

  render() {
    const {
      currentAssetType,
      selectionTool
    } = this.state
    const editableLayer = new EditableGeoJsonLayer({
      id: "geojson-layer",
      data: this.state.data,
      mode: this.state.drawMode,
      selectedFeatureIndexes: this.state.selectedFeatureIndexes,
			editHandlePointRadiusScale: 2,
      onEdit: this._onEdit
    })

    const layers = [editableLayer]

    if (selectionTool) {
      layers.push( new SelectionLayer({
        id: 'selection',
        selectionType: selectionTool,
        onSelect: ({pickingInfos}) => {
          const indexes = pickingInfos.map(pi => pi.index)
          this.setState( prevState => ({
            selectedFeatureIndexes: indexes
          }))
        },
        getTentativeFillColor: () => [190, 190, 190, 100],
        getTentativeLineColor: () => [0, 0, 255, 255],
        getTentativeLineDashArray: () => [0,0],
        layerIds: ['geojson-layer'], 
        lineWidthMinPixels: 3
      }))
    }

    return (
      <div style={{position:'relative'}}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          {false &&<DrawAssetList assetType={currentAssetType} changeAssetType={this._changeAssetType} />}
          <div id='mapSketch' style={{position: 'relative', flexGrow: 3, height: '100vh'}}>
            <DeckGL
              initialViewState={initialViewState}
              controller={{
                doubleClickZoom: false
              }}
              layers={layers}
              onClick={this._onLayerClick} >
              <StaticMap  mapStyle={'mapbox://styles/rmguarachi/cjlb7kbx22pps2rp13pnf9yz5'} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
            </DeckGL>
            <DrawModeList
              currentMode={this.state.drawMode}
              changeDrawMode={this._changeDrawMode}
              style={{position:'absolute', top: '0', left: '0', zIndex: 1}}/>
          </div>
        </div>
        <MapTour toggleDemo={this._toggleDemo} openDemo={this.state.openDemo}/>
      </div>
    )
  }
}

export default Mapsketch
