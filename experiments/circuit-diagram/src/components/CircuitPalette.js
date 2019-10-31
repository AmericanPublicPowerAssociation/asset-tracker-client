import React from 'react'
import * as go from 'gojs'
import { ReactPalette } from 'gojs-react'


function initPalette() {
  const $ = go.GraphObject.make
  const palette = $(go.Palette)
  palette.nodeTemplate = 
    $(go.Node, 'Auto',
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'RoundedRectangle',
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        {margin:8, editable:true},
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
				{ key: 0, text: 'Alpha', color:'yellow' }
      ]}/>
  )
}

export default CircuitPalette
