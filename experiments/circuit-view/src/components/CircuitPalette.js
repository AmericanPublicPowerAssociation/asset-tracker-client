import React from 'react'
import * as go from 'gojs'
import { ReactPalette } from 'gojs-react'


function initPalette() {
  const $ = go.GraphObject.make
  const palette = $(go.Palette)
  palette.nodeTemplate = 
    $(go.Node, 'Auto',
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.TextBlock,
        {margin:8, editable:true, stroke: 'black', background: 'yellow'},
        new go.Binding('text').makeTwoWay())
    )

  return palette
}


function CircuitPalette() {
  return (
    <ReactPalette 
      initPalette={initPalette}
      divClassName="palette-component"
      nodeDataArray={[
				{ key: 0, text: 'Meter', type: 'meter' },
        { key: 1, text: 'Control', type: 'control'},
        { key: 2, text: 'Generator', type: 'generator'},
        { key: 3, text: 'Busbar', type: 'busbar'},
        { key: 4, text: 'Station', type: 'station'},
        { key: 5, text: 'Storage', type: 'storage'},
        { key: 6, text: 'Substation', type: 'substation'},
        { key: 7, text: 'Switch', type: 'switch'},
        { key: 8, text: 'Transformer', type: 'transformer'},
      ]}/>
  )
}

export default CircuitPalette
