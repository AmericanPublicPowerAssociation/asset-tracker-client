import React, { Component } from 'react';
import cytoscape from 'cytoscape';

class CircuitDiagram extends Component {

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
      };
    });
    const edges = assets.map((v, i) => {
      return {
        group: 'edges',
        data: {
          id: 'e' + v.id,
          source: 'n' + v.id,
          target: 'n' + (Number(v.id) + 1).toString()
        },
        style: {
          width: 5
        }
      }
    });
    window.cy = cytoscape({
      container: document.getElementById('cy'),
      elements: elements.concat(edges),
      layout: { 
      name: 'preset'
      },
      style: [{ 
        selector: 'node', 
        style: { 
          'content': 'data(name)' 
       }
      }]
    }); 
  }

  render() {
    const cyStyle = { 'height': '400px', 'width': '400px'}
	  return (
      <div id='cy' style={cyStyle} />
    )
  }
}


export default CircuitDiagram;
