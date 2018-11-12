import React, {Component} from 'react';
import cytoscape from 'cytoscape';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLocationArrow} from '@fortawesome/free-solid-svg-icons'


library.add(faLocationArrow)

class CircuitDiagram extends Component {
  state = {
    connections: []
  }

  componentDidMount() {
    const {updateSelected} = this.props;
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
    //this.cy.maxZoom(1);
    //this.cy.minZoom(.2);
    this.cy.on('click', 'node', function(e) {
      updateSelected(parseInt(e.target.id()))
    });
    const url = 'http://localhost:5000/get-connections.json';
    fetch(url)
      .then(res => {
        return res.json();
      }).then(data => {
        const {connections} = JSON.parse(data);
        this.setState({
          connections,
        });
      });
  }

  componentDidUpdate() {
    this.cy.remove('node');
    const {assets, selected_asset_id} = this.props;
    const {connections} = this.state;
    const {nodes, edges} = this.getElements(assets, connections);
    this.cy.add({
      nodes,
      edges
    });
    this.cy.fit();
    const el = this.cy.getElementById(selected_asset_id)
    el.select();
  }

  getElements(assets, connections) {
    const nodes = assets.map((n, i) => {
      return {
          group: 'nodes',
          data: {
            id: n.id,
            vendor: n.vendor,
            product: n.product
          },
          position: {
            x: (Number(n.lng)) * 10000,
            y: -(Number(n.lat)) * 10000
          },
          style: {
            padding: "50px"
          },
          selected: false,
          selectable: true
      }}
    );

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
