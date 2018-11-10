import React, {Component} from 'react';
import cytoscape from 'cytoscape';


class CircuitDiagram extends Component {
  componentDidUpdate() {
    const {assets, connections} = this.props;
    const nodes = assets.map((n, i) => {return {
          group: 'nodes',
          data: {
            id: `${n.id}`,
            vendor: n.vendor,
            product: n.product
          },
          position: {
            x: (Number(n.lng)) * 10000,
            y: -(Number(n.lat)) * 10000
          },
          selected: false,
          selectable: true
      }}
    );
    const edges = connections.map((e) => {
      const [from, to] = e;
      return {
          group: 'edges',
          data: {
            id: `${from},${to}`,
            source: `${from}`,
            target: `${to}`
          },
          style: {
            width: 5
          }
        }
    });

    const cy = window.cy = cytoscape({
      container: document.getElementById('cy'),
      elements: {
        nodes: nodes,
        edges: edges,
      },
      layout: {
        name: 'preset'
      },
      style: [{
        selector: 'node',
        style: {
          'content': 'data(product)'
        }
      }]
    });
  }

  render() {
    const style = {height: '400px', width: '400px'}
	  return (
      <div id='cy' style={style} />
    )
  }
}

export default CircuitDiagram;
