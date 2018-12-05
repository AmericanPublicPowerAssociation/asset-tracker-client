import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Grid, Panel, Row, Col} from 'react-bootstrap';

import SearchQueryContainer from '../containers/SearchQueryContainer';
import NavigationContainer from '../containers/NavigationContainer';
import AssetsTableContainer from '../containers/AssetsTableContainer';
import AssetsGridContainer from '../containers/AssetsGridContainer';
import MapContainer from '../containers/MapContainer';
import AssetDetailsContainer from '../containers/AssetDetailsContainer';

import '../css/App.css';


class App extends Component {
  render() {
    return (
      <div>
        <NavigationContainer />
        <Grid fluid={true}>
          <Route exact path="/assets" render={ () => (
            <AssetsTableContainer />
          )} />
          <Route exact path="/" render={ () => (
            <Row>
              <Col xs={18} md={12} lg={8}>
                <Row>
                  <Col lg={12}>
                    <Panel>
                      <Panel.Body>
                        <Row>
                          <Col lg={8}>
                            <SearchQueryContainer />
                            <MapContainer />
                          </Col>
                          <Col lg={4}>
                            <AssetsGridContainer />
                          </Col>
                        </Row>
                      </Panel.Body>
                    </Panel>
                  </Col>
                </Row>
              </Col>
              <Col xs={18} md={12} lg={4}>
                <AssetDetailsContainer />
              </Col>
            </Row>
          )} />
        </Grid>
      </div>
    );
  }
}


export default App;
