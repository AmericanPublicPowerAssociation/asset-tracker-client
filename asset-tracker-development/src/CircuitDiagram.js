import React, { Component } from 'react';
import cytoscape from 'cytoscape';

class CircuitDiagram extends Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    const {assets} = this.props;
    const elements = assets.map((v, i) => {
	return {
	      group: 'nodes',
	      data: {
		id: 'n' + v.id,
		vender: v.vendor,
		product: v.product
	      },
	      position: {
		x: (Number(v.lng)) * 10000,
		y: -(Number(v.lat)) * 10000
	      },
	      selected: false,
	      selectable: true
	}
    })
    window.cy = cytoscape({
     container: document.getElementById('cy'),
     elements: elements,
     layout: { 
       name: 'preset'
     },
     style: [{ 
       selector: 'node', 
       style: { 
         'content': 'data(name)' 
       }
     }]}) 
  }

  render() {
    const cyStyle = { 'height': '400px', 'width': '400px'}
	  return (
      <div id='cy' style={cyStyle} />
    )
  }
}


export default CircuitDiagram;
