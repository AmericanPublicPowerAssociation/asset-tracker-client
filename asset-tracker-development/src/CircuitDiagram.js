import React, {Component} from 'react';
import cytoscape from 'cytoscape';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons'


library.add(faLocationArrow)

class CircuitDiagram extends Component {
  componentDidMount() {
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      layout: {
        name: 'grid'
      },
      style: [{
        selector: 'node',
        style: {
          content: 'data(product)',
        }
      }]
    });
  }

  componentDidUpdate() {
    this.cy.remove('node');
    this.cy.removeListener('click', 'node');
    const {asset, updateSelected} = this.props;
    if (asset !== null) {
      const url = `http://localhost:5000/get-connections.json?node=${asset.id}`;
      fetch(url)
        .then(res => {
          return res.json();
        }).then(data => {
          const {assets, connections} = JSON.parse(data);
          const {nodes, edges} = this.getElements(assets, connections);
          this.cy.add({
            nodes,
            edges
          });
          this.cy.fit();
          this.cy.on('click', 'node', function(e) {
            const currId = parseInt(e.target.id());
            console.log(currId)
            console.log(assets)
            const asset = assets.filter((a) => a.id === currId)[0]
            updateSelected(asset)
          });
          const el = this.cy.getElementById(asset.id)
          el.select();
        });
    }
  }

  getElements(assets, connections) {
    const nodes = assets.map((a, i) => {
      return {
          group: 'nodes',
          data: {
            id: a.id,
            vendor: a.vendor,
            product: a.product
          },
          position: {
            x: (Number(a.lng)) * 10000,
            y: -(Number(a.lat)) * 10000
          },
          selected: false,
          selectable: true
      }
    });

    const edges = (nodes.length > 0) ? connections.map((e) => {
          const [from, to] = e;
          return {
              group: 'edges',
              data: {
                id: `${from},${to}`,
                source: from,
                target: to
              },
              style: {
                width: 5
              }
            }
        }) : [];

    return {nodes, edges};
  }

  render() {
    const style = {height: '400px', width: '100%'}
	  return (
      <div className='row'>
        <div className='col-md-12'>
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Circuit
                <button style={{'float': 'right'}} className='center-circuit btn btn-primary' onClick={(e) => this.cy.fit()}><FontAwesomeIcon icon='location-arrow' /></button>
              </h1>
              <div id='cy' className='border rounded' style={style} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CircuitDiagram;
