import React, {Component} from 'react';

import AssetsGrid from './AssetsGrid';
import Map from './Map';
import SearchQuery from './SearchQuery';

import {Row, Col, Panel} from 'react-bootstrap';



class FilterComponents extends Component {
  state = {
    filteredAssets: []
  }

  componentDidUpdate() {
    const {selectedAsset} = this.props;
    if (selectedAsset) {
      const {filteredAssets} = this.state;
      const isNotInFilter = filteredAssets.every(
        (a) => a.id !== selectedAsset.id);
      if (isNotInFilter) {
        this.setState({
          filteredAssets: filteredAssets.concat([selectedAsset])
        })
      }
    }
  }

  updateFilteredAssets(filteredAssets) {
    // search for assets
    const {updateSelected} = this.props;
    updateSelected(null)
    this.setState({
      filteredAssets
    })
  }

  render() {
    const {selectedAsset, updateSelected} = this.props;
    const {filteredAssets} = this.state;
    return (
      <Row>
        <Col lg={12}>

          <Panel>
            <Panel.Heading><h1>Map</h1></Panel.Heading>
            <Panel.Body>
              <Row>
                <Col lg={8}>
                  <Map selectedAsset={selectedAsset} updateSelected={(asset) => updateSelected(asset)} markers={filteredAssets} />
                </Col>
                <Col lg={4}>
                  <SearchQuery updateFilteredAssets={(filteredAssets) => this.updateFilteredAssets(filteredAssets)}/>
                  <AssetsGrid selectedAsset={selectedAsset} updateSelected={(asset) => updateSelected(asset)} assets={filteredAssets}/>
                </Col>
              </Row>
            </Panel.Body>
          </Panel>

        </Col>
      </Row>
    );
  }
}

export default FilterComponents;
