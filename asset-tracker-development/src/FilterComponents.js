import React, {Component} from 'react';

import AssetsGrid from './AssetsGrid';
import Map from './Map';
import SearchQuery from './SearchQuery';

import {Row, Col, Panel} from 'react-bootstrap';


class FilterComponents extends Component {
  state = {
    filteredAssets: []
  }

  componentDidUpdate(prevProps, prevState) {
    const {selectedAsset, editMode} = this.props;
    const {filteredAssets} = this.state
    if (selectedAsset == null && prevProps.selectedAsset != null) {
      this.setState({
        filteredAssets: filteredAssets.filter(
          (a) => a.id !== prevProps.selectedAsset.id)
      })
    } else if (selectedAsset) {
      const i = filteredAssets.findIndex((a) => a.id === selectedAsset.id);
      if (prevProps.editMode && !editMode && i >= 0) {
        const newFilteredAssets = filteredAssets.slice(0, i).concat([selectedAsset], filteredAssets.slice(i + 1, filteredAssets.length))
        this.setState({
          filteredAssets: newFilteredAssets
        })
      }
      if (i === -1) {
        this.setState({
          filteredAssets: filteredAssets.concat([selectedAsset])
        })
      }
    }
  }

  updateFilteredAssets(filteredAssets) {
    // search for assets
    const {updateSelected} = this.props;
    const asset = filteredAssets.length ? filteredAssets[0] : null
    updateSelected(asset)
    this.setState({
      filteredAssets
    })
  }

  render() {
    const {addNewAsset, selectedAsset, updateSelected, editMode} = this.props;
    const {filteredAssets} = this.state;
    return (
      <Row>
        <Col lg={12}>

          <Panel>
            <Panel.Heading><h1>Map</h1></Panel.Heading>
            <Panel.Body>
              <Row>
                <Col lg={8}>
                  <SearchQuery editMode={editMode} updateFilteredAssets={(filteredAssets) => this.updateFilteredAssets(filteredAssets)}/>
                  <Map editMode={editMode} selectedAsset={selectedAsset} updateSelected={(asset) => updateSelected(asset)} markers={filteredAssets} />
                </Col>
                <Col lg={4}>
                  <AssetsGrid addNewAsset={() => addNewAsset()} editMode={editMode} selectedAsset={selectedAsset} updateSelected={(asset) => updateSelected(asset)} assets={filteredAssets}/>
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
