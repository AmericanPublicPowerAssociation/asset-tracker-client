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
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
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


function Circuit(props) {
  const { nodes, edges} = props 
  
  const handleModelChange = (data) => {
    const insertedNodeKeys = data.insertedNodeKeys;
    const modifiedNodeData = data.modifiedNodeData;
    const removedNodeKeys = data.removedNodeKeys;
    const insertedLinkKeys = data.insertedLinkKeys;
    const modifiedLinkData = data.modifiedLinkData;
    const removedLinkKeys = data.removedLinkKeys;
    if (insertedNodeKeys) {
      const {createNewNodes} = props
      createNewNodes()
    }
    console.log(data)
  }

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
