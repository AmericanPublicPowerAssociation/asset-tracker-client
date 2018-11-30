import React, {Component} from 'react';
import {Row, Col, Panel} from 'react-bootstrap';

import AssetsGrid from './AssetsGrid';
import Map from './Map';
import SearchQuery from './SearchQuery';


class FilterComponents extends Component {
  /*
   * filteredAssets: List => current assets displayed
   *    in asset overview and map
   */
  state = {
    filteredAssets: []
  }

  componentDidUpdate(prevProps, prevState) {
    const {selectedAsset, editMode} = this.props;
    const {filteredAssets} = this.state
    const testValid = (obj) => Object.keys(obj).length > 0;
    const isValid = testValid(selectedAsset)
    const wasValid = testValid(prevProps.selectedAsset)
    const wasDeleted = !isValid && wasValid
    const finishedEditing = isValid && prevProps.editMode && !editMode;
    const oldId = wasValid ? prevProps.selectedAsset.id : '';

    if (wasDeleted) {
      // asset was deleted
      // this is assuming the only way to go from selected to not selected is by deleting
      this.setState((state, props) => {
        return {
          filteredAssets: state.filteredAssets.filter(
            (a) => a.id !== oldId)
        }
      })
    } else if (finishedEditing) {
      const i = filteredAssets.findIndex((a) =>
        a.id === selectedAsset.id);
      if (i !== -1) {
        // finished editing a current asset
        this.setState((state, props) => {
          const fa = state.filteredAssets;
          const filteredAssets = fa.slice(
            0, i).concat(
              [props.selectedAsset],
              fa.slice(i + 1, fa.length)
            )
          return {
            filteredAssets
          }
        })
      } else {
        // finished creating a new asset
        this.setState((state, props) => {
          return {
            filteredAssets: state.filteredAssets.concat(
              [props.selectedAsset])
          }
        })
      }
    }
  }

  updateFilteredAssets = (filteredAssets) => {
    // search for assets
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
                  <SearchQuery editMode={editMode}
                    updateFilteredAssets={(filteredAssets) =>
                      this.setState({
                        filteredAssets
                      })
                    } />
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
