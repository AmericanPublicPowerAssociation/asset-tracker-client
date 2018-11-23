import React, {Component} from 'react';
import cytoscape from 'cytoscape';
import {Row, Col, Button, Panel} from 'react-bootstrap';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCompass} from '@fortawesome/free-solid-svg-icons'

import './CircuitDiagram.css';


library.add(faCompass)


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

  shouldComponentUpdate(prevProps, prevState) {
    const {asset} = this.props;
    const prevAsset = prevProps.asset;
    return !(asset && prevProps.asset && asset.circuit === prevAsset.circuit)
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

    const edges = nodes.length ? connections.map((e) => {
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

  componentDidUpdate() {
    this.cy.remove('node');
    this.cy.removeListener('click', 'node');
    const {asset, updateSelected} = this.props;
    if (asset) {
      const url = `http://18.212.1.167:5000/get-circuit.json?circuit_id=${asset.circuit}`;
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
          this.cy.on('tap', 'node', (e) => {
            const currId = parseInt(e.target.id());
            const asset = assets.filter((a) => a.id === currId)[0]
            updateSelected(asset)
          });
          const el = this.cy.getElementById(asset.id)
          el.select();
          this.setState({
            assets,
            connections
          });
        });
    }
  }

  render() {
	  return (
      <Row>
        <Col lg={12}>
          <Panel>
            <Panel.Heading><h1>Circuit</h1></Panel.Heading>
            <Panel.Body>
              <div id='cy' />
              <Button style={{'float': 'right'}}
                      className='center-circuit'
                      onClick={(e) => this.cy.fit()} >
                <FontAwesomeIcon icon='compass' />
              </Button>
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    )
  }
}


export default CircuitDiagram;
