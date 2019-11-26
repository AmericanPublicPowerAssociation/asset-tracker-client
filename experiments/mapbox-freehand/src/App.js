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
  width: '100%',
  height: '100vh',
  longitude: -91.874,
  latitude: 42.76,
  zoom: 12
}

class MyMapController extends MapController {
  constructor() {
    super()
    this.events = ['keydown', 'keyup', ]
  }

  handleEvent(event) {
    if (event.type == 'keydown'){
    console.log(event)
    }
    return super.handleEvent(event)
  }
}


function App(props) {
  const editorRef = React.createRef()
  const [selectedMode, setSelectedMode] = useState(EditorModes.READ_ONLY)
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT)

	useLayoutEffect( () => {
		console.log(editorRef.current)	
	})

  const onViewportChange = (newViewport) => {
    const {width, height, zoom, longitude, latitude} = newViewport
    setViewport( (prevState) => {
      /*return {
        ...prevState,
        width,
        height,
        zoom,
        longitude,
        latitude
      }*/
      return newViewport
    })
  }

  const onEditorUpdate = (featureObj) => {	
    console.log(featureObj)
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
        style={{width:'100%', height: '100vh'}}
        clickRadius={12}
        mode={selectedMode}
        onSelect={ (e) => { console.log(e)}}
        onUpdate={ (e) => { console.log(e)}}
        featureStyle={getFeatureStyle}
				editHandleStyle={getEditHandleStyle}
        featureShape='rect'
        editHandleShape='circle'/>
      { renderToolbar() }
    </ReactMapGL>
  )
}

export default App
