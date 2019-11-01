import React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'


function initDiagram() {
  const $ = go.GraphObject.make
  const diagram = 
    $(go.Diagram,
      {
        'undoManager.isEnabled': true,
        model: $(go.GraphLinksModel,
          {
            linkKeyProperty: 'key',
            linkFromPortIdProperty: 'fromPort',
            linkToPortIdProperty: 'toPort',
          }),
      })

  diagram.grid.visible = true

  diagram.nodeTemplate = 
    $(go.Node, 'Spot',
      $(go.Shape, 'RoundedRectangle',
        new go.Binding('fill', 'color')),
      $(go.Shape, "Rectangle",
        {desiredSize: new go.Size(6,6)},
        {portId: 'in', alignment: go.Spot.Left, toLinkable:true}),
      $(go.Shape, "Rectangle",
        {desiredSize: new go.Size(6,6)},
        {portId: 'out', alignment: go.Spot.Right, fromLinkable:true}),
      $(go.TextBlock,
        {alignment: new go.Spot(0.5,.5)},
      	new go.Binding('text', 'text').makeTwoWay()),
    )

  diagram.linkTemplate = 
    $(go.Link,{
        routing: go.Link.Orthogonal,
        curve: go.Link.JumpOver,
      },
      $(go.Shape, {
        isPanelMain: true,
        stroke: "transparent",
        strokeWidth: 8 }),
      $(go.Shape, {
        isPanelMain: true
      })
    )

  return diagram
}


function handleModelChange(data) {
  console.log(data)
  return
}

function Circuit() {
  return (
    <ReactDiagram 
      initDiagram={initDiagram}
      divClassName="diagram-component"
      nodeDataArray={[
				{ key: 0, text: 'Alpha', color: 'lightblue', loc: '0 0' },
				{ key: 1, text: 'Beta', color: 'orange', loc: '150 0' },
				{ key: 2, text: 'Gamma', color: 'lightgreen', loc: '0 150' },
				{ key: 3, text: 'Delta', color: 'pink', loc: '150 150' }
			]}
      linkDataArray={[
        {from: 0, fromPort:"out", to: 1, toPort:"in"},
        {from: 0, fromPort:"out", to: 2, toPort:"in"},
      ]}
			onModelChange={handleModelChange}/>
  )
}

export default Circuit
