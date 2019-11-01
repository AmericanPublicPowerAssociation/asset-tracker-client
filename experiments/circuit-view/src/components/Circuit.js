import React from 'react'
import * as go from 'gojs'
import { useSelector } from 'react-redux'
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
        routing: go.Link.AvoidsNodes,
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
  const nodes = useSelector(state => state.nodes)
  const edges = useSelector(state => state.edges)
  return (
    <ReactDiagram 
      initDiagram={initDiagram}
      divClassName="diagram-component"
      nodeDataArray={nodes}
      linkDataArray={edges}
			onModelChange={handleModelChange}/>
  )
}

export default Circuit
