import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Grid, Row, Col} from 'react-bootstrap';

import AssetDetails from './AssetDetails';
import AssetsTable from './AssetsTable';
import FilterComponents from './FilterComponents';
import Navigation from './Navigation';

import './App.css';


class App extends Component {
  /*
   * selectedAsset:    Object  => currently selected asset
   *
   * savedAssetToggle: Boolean => If the "save asset" button was pressed
   *    the asset to save would be the currently selected asset
   *
   * deleteAssetId:    Integer => the ID of the asset to delete,
   *    changed when the "delete asset" button is pressed
   *
   * editMode:         Boolean => If the edit/add asset form should be
   *    displayed changed when the edit/save/delete/cancel
   *    button is pressed.
   */
  state = {
    selectedAsset: {},
    savedAssetToggle: false,
    deleteAssetId: -1,
    editMode: false,
  };

  deleteAsset(assetId) {
    this.setState({
      deleteAssetId: assetId,
      editMode: false,
      selectedAsset: {},
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const {deleteAssetId, savedAssetToggle, selectedAsset} = this.state;
    const newAssetDeleted = deleteAssetId === -1;

    if (savedAssetToggle !== prevProps.savedAssetToggle) {
      //send post request
      fetch(`http://18.212.1.167:5000/save-asset`, {
        method: 'POST',
        body: JSON.stringify({asset: selectedAsset})
      })
      .then((res) => res.json())
      .then((data) => {
        // TODO: handle case for failure
      })
    } else if (!newAssetDeleted && deleteAssetId !== prevProps.deleteAssetId) {
        fetch(`http://18.212.1.167:5000/delete-asset`, {
          method: 'DELETE',
          body: JSON.stringify({id: deleteAssetId})
        })
          .then((res) => res.json())
          .then((data) => {
            // TODO: handle case for failure
          })
    }
  }

  updateSelected = (selectedAsset) => {
    this.setState({
      selectedAsset
    })
  }

  render() {
    const {selectedAsset, editMode} = this.state;
    return (
      <div>

      <Navigation editMode={editMode} />
      <Grid fluid={true}>

        <Route exact path="/assets" render={ () => (
          <AssetsTable />
        )} />
        <Route exact path="/" render={ () => (
            <Row>
              <Col xs={18} md={12} lg={8}>
                <FilterComponents addNewAsset={() => {
                  // create asset that has all the keys of a regular asset but with empty values
                  // toggle "editMode"
                  // talk to component that defines asset model, get that model
                  const assetObj = {
                      'id': -1,
                      'lat': '',
                      'lng': '',
                      'name': '',
                      'product': '',
                      'type_id': -1,
                      'vendor': '',
                      'version': '',
                  };

                  this.setState({
                    selectedAsset: assetObj,
                    editMode: true
                  });
                }} editMode={editMode} selectedAsset={selectedAsset} updateSelected={this.updateSelected} />
              </Col>
              <Col xs={18} md={12} lg={4}>
                <AssetDetails saveAsset={(savedAsset) => {
                  this.setState((state, props) => {
                    return {
                      savedAssetToggle: !state.savedAssetToggle,
                      selectedAsset: savedAsset,
                      editMode: false
                    }
                  });
                }} updateSelected={this.updateSelected} toggleEdit={(val) =>
                  this.setState({
                    editMode: val
                  })} editMode={editMode} deleteAsset={(assetId) =>
                    this.deleteAsset(assetId)
                  } asset={selectedAsset}/>
              </Col>
            </Row>
        )} />
          </Grid>
        </div>
    );
  }
}


export default App;
