import React from 'react'
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react'


function initDiagram() {
  const $ = go.GraphObject.make
  const diagram = 
    $(go.Diagram,
      {
        'undoManager.isEnabled': true,
        "draggingTool.isGridSnapEnabled": true,
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
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'RoundedRectangle',
        new go.Binding('fill', 'color')),
      $(go.Shape, "Rectangle",
        {desiredSize:new go.Size(6,6), fromSpot: go.Spot.Right, toSpot: go.Spot.Left, toLinkable: true, cursor: "pointer"},
        {portId: 'in', alignment: go.Spot.Left}),
      $(go.Shape, "Rectangle",
        {desiredSize:new go.Size(6,6), fromSpot: go.Spot.Right, toSpot: go.Spot.Left, fromLinkable: true, cursor: "pointer"},
        {portId: 'out', alignment: go.Spot.Right}),
      $(go.TextBlock,
        {alignment: new go.Spot(0.5,.5), editable: true, margin: 10},
      	new go.Binding('text', 'text').makeTwoWay()),
      { click: function(e, obj) { 
        console.log("Clicked on " + obj.part.data.key) 
        } 
      }
    )

  diagram.linkTemplate = 
    $(go.Link,{
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 3,
        relinkableFrom: true, relinkableTo: true,
      },
      $(go.Shape, {
        isPanelMain: true,
        stroke: "transparent",
        strokeWidth: 8 }),
      $(go.Shape, {
        isPanelMain: true,
				strokeWidth: 4,
      }),
      { click: function(e, obj) { console.log("Clicked on " + obj.part.data.key) } }
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
      createNewNodes({modifiedNodeData, insertedNodeKeys})
      return
    }
    if (removedNodeKeys) {
      const {deleteNodes} = props
      deleteNodes({removedNodeKeys})
      return
    }
    if (insertedLinkKeys) {
      const {createNewEdges} = props
      createNewEdges({modifiedLinkData, insertedLinkKeys})
      return
    }
    if (removedLinkKeys) {
      const {deleteEdges} = props
      deleteEdges({removedLinkKeys})
      return
    }
    if (modifiedNodeData) {
      const {updateNodes} = props
      updateNodes({modifiedNodeData})
      return
    }
    if (modifiedLinkData) {
      const {updateEdges} = props
      updateEdges({modifiedLinkData})
      return
    }
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
