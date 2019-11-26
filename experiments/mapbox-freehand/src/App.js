import React, { Component, useState, useEffect, useLayoutEffect } from "react";
import ReactMapGL, {MapController} from "react-map-gl";
import { Editor, EditorModes, RenderStates } from "react-map-gl-draw";


const MODES = [
  { id: EditorModes.EDITING, text: "Select and Edit Feature" },
  { id: EditorModes.DRAW_POINT, text: "Draw Point" },
  { id: EditorModes.DRAW_PATH, text: "Draw Polyline" },
  { id: EditorModes.DRAW_POLYGON, text: "Draw Polygon" },
  { id: EditorModes.DRAW_RECTANGLE, text: "Draw Rectangle" }
];

const DEFAULT_VIEWPORT = {
  width: '80%',
  height: '100vh',
  longitude: -91.874,
  latitude: 42.76,
  zoom: 12
}


function App(props) {
  const editorRef = React.createRef()
  const [selectedMode, setSelectedMode] = useState(EditorModes.READ_ONLY)
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT)

  class MyMapController extends MapController {
    constructor() {
      super()
      this.events = ['keydown', 'keyup', ]
      this.keyPressed = {}
    }

    _onKeyDown(event) {
      super._onKeyDown(event)
      if (this.keyPressed['Shift']) {
        if (event.key === 'X')
          setSelectedMode(EditorModes.READ_ONLY)
        else if (event.key === 'Q')
          setSelectedMode(EditorModes.EDITING)
        else if (event.key === 'A')
          setSelectedMode(EditorModes.DRAW_POINT)
        else if (event.key === 'W') 
          setSelectedMode(EditorModes.DRAW_PATH)
        else if (event.key === 'S')
          setSelectedMode(EditorModes.DRAW_POLYGON)
        else if (event.key === 'E')
          setSelectedMode(EditorModes.DRAW_RECTANGLE)
      }
      else {
        this.keyPressed[event.key] = true
      }
      event.preventDefault()
    }

    handleEvent(event) {
      console.log(event.key)
      if (event.type === 'keyup') {
        this.keyPressed[event.key] = false
      }
      return super.handleEvent(event)
    }
  }

	useLayoutEffect( () => {
    //console.log(editorRef.current)	
	})

  const onViewportChange = (newViewport) => {
    const {width, height, zoom, longitude, latitude} = newViewport
    setViewport( (prevState) => {
      return newViewport
    })
  }

  const onEditorUpdate = (featureObj) => {	
    //console.log(featureObj)
  }

  const renderToolbar = () => {
    return (
      <div style={{position: 'absolute', top:0, left:0, maxWidth: "300px"}}>
        { 
          MODES.map( (mode) => (
            <div key={mode.id}>
              <button
                onClick={ () => setSelectedMode(mode.id)}
                style={{width: '200px'}}>
                {mode.id}
              </button>
            </div>
          ))
        }
      </div>
    )
  }

  const getFeatureStyle = (featureObj) => {
    console.log(featureObj)
		switch (featureObj.state) {
			case RenderStates.SELECTED:
			case RenderStates.HOVERED:
			case RenderStates.UNCOMMITTED:
			case RenderStates.CLOSING:
				return {
					stroke: 'rgb(251, 176, 59)',
					strokeWidth: 2,
					fill: 'rgb(251, 176, 59)',
					fillOpacity: 0.3,
					strokeDasharray: '4,2'
				}
      
      case RenderStates.INACTIVE: {
        if (featureObj.feature.geometry.type === 'LineString'){
          return {
            stroke: 'rgb(60, 178, 208)',
            strokeWidth: 2,
            fill: 'rgb(60, 178, 208)',
            fillOpacity: 0
          }
        }
        else {
          return {
					stroke: 'rgb(60, 178, 208)',
					strokeWidth: 2,
					fill: 'rgb(60, 178, 208)',
					fillOpacity: 0.1
				  }
        }
      }
			default:
				return {
					stroke: 'rgb(60, 178, 208)',
					strokeWidth: 2,
					fill: 'rgb(60, 178, 208)',
					fillOpacity: 0.1
				}
  	}
  }

	const getEditHandleStyle = () => {
		
	}

  return (
    <div>
      <h1>Current Draw Mode: {selectedMode}</h1>
    <ReactMapGL
      longitude={viewport['longitude']}
      latitude={viewport['latitude']}
      zoom={viewport['zoom']}
      width={viewport['width']}
      height={viewport['height']}
      onViewportChange={onViewportChange}
      mapboxApiAccessToken="pk.eyJ1Ijoicm1ndWFyYWNoaSIsImEiOiJjazJ2NGxzbWQwMWJvM2JvMWZlcG9tcmkyIn0.1SvLM98IeEoOSR4qTopvtA"
      controller={new MyMapController()}>
      <Editor
        ref={editorRef}
        clickRadius={12}
        mode={selectedMode}
        onSelect={ (e) => { console.log(e)}}
        onUpdate={ (e) => { console.log(e)}}
        featureStyle={getFeatureStyle}
        featureShape='rect'
        editHandleShape='circle'/>
      { renderToolbar() }
    </ReactMapGL>
    </div>
  )
}

export default App
