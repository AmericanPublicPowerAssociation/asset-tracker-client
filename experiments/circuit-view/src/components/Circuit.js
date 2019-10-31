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
          }) 
      })

  diagram.nodeTemplate = 
    $(go.Node, 'Auto',
      $(go.Shape, 'RoundedRectangle',
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        {margin:20},
      	new go.Binding('text', 'text').makeTwoWay()),
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
        {from:0, to:1},
      ]}
			onModelChange={handleModelChange}/>
  )
}

export default Circuit
