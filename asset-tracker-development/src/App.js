import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Button, Grid, Row, Col, Nav, Navbar, NavItem} from 'react-bootstrap';

import AssetDetails from './AssetDetails';
import AssetsTable from './AssetsTable';
import CircuitDiagram from './CircuitDiagram';
import FilterComponents from './FilterComponents';
import Navigation from './Navigation';

import './App.css';


class App extends Component {
  /*
   * selectedAsset: Object  => currently selected asset
   * savedAsset:    Boolean => If the "save asset" button was pressed
   *    the asset to save would be the currently selected asset
   * deleteAssetId: Integer => the ID of the asset to delete,
   *    changed when the "delete asset" button is pressed
   * editMode:      Boolean => If the edit/add asset form should be
   *    displayed changed when the edit/save/delete/cancel
   *    button is pressed.
   */
  state = {
    selectedAsset: null,
    savedAsset: false,
    deleteAssetId: '',
    editMode: false,
  };

  deleteAsset(assetId) {
    const deleteID = parseInt(assetId) >= 0  ? assetId : ''
    this.setState({
      deleteAssetId: deleteID,
      editMode: false,
      selectedAsset: null,
    })
  }

  shouldComponentUpdate(prevProps, prevState) {
    return (!(
      prevState.savedAsset && !this.state.savedAssets) || !(
      prevState.deletedAsset !== '' && this.state.deletedAsset === ''
    ))
  }
  componentDidUpdate() {
    const {deleteAssetId, savedAsset, selectedAsset} = this.state;
    if (savedAsset) {
      //send post request
      fetch(`http://18.212.1.167:5000/save-asset`, {
        method: 'POST',
        body: JSON.stringify({asset: selectedAsset})
      })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          savedAsset: false
        })
      })
    }
    if (deleteAssetId !== '') {
      //TODO send delete request
      const id = parseInt(deleteAssetId)
      if (id >= 0) {
        fetch(`http://18.212.1.167:5000/delete-asset`, {
          method: 'DELETE',
          body: JSON.stringify({id: id})
        })
          .then((res) => res.json())
          .then((data) => {
            this.setState({
              deleteAssetId: '',
            })
          })

      } else {
        this.setState({
          deleteAssetId: '',
        })
      }
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
                  let assetObj = {
                      'id': -1,
                      'vendor': "",
                      'version': "",
                      'product': "",
                      'lat': '',
                      'lng': '',
                      'circuit': ''
                  };
                  this.setState({
                    selectedAsset: assetObj,
                    editMode: true
                  });
                }} editMode={editMode} selectedAsset={selectedAsset} updateSelected={this.updateSelected} />
              </Col>
              <Col xs={18} md={12} lg={4}>
                <AssetDetails saveAsset={(savedAsset) => {
                  this.setState({
                    savedAsset: true,
                    selectedAsset: savedAsset,
                    editMode: false
                  });
                }} updateSelected={this.updateSelected} toggleEdit={(val) => this.setState({
                  editMode: val
                })} editMode={editMode} deleteAsset={(assetId) => this.deleteAsset(assetId)} asset={selectedAsset}/>
                <CircuitDiagram updateSelected={this.updateSelected} asset={selectedAsset}/>
              </Col>
            </Row>
        )} />
          </Grid>
        </div>
    );
  }
}

export default App;
