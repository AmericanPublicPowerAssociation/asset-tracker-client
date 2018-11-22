import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';

import AssetDetails from './AssetDetails';
import AssetsTable from './AssetsTable';
import CircuitDiagram from './CircuitDiagram';
import FilterComponents from './FilterComponents';


import {Button, Grid, Row, Col, Nav, Navbar, NavItem} from 'react-bootstrap';
import './App.css';


class App extends Component {
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

  render() {
    const {selectedAsset, editMode} = this.state;
    return (
      <div>

      <Navbar className={editMode ? 'editing': '' } fixedTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Asset Tracker</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer onClick={(e) => {
              if (editMode) {
               e.preventDefault()
              }}} to="/assets">
              <NavItem eventKey={1}>
                Assets
              </NavItem>
            </LinkContainer>
            <LinkContainer onClick={(e) => {
              if (editMode) {
               e.preventDefault()
              }}} to="#">
              <NavItem eventKey={2}>
                Reports
              </NavItem>
            </LinkContainer>
            <LinkContainer onClick={(e) => {
              if (editMode) {
               e.preventDefault()
              }}} to="#">
              <NavItem eventKey={3}>
                Alerts
              </NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer onClick={(e) => {
              if (editMode) {
               e.preventDefault()
              }}} to="#">
              <NavItem eventKey={4}>
                Alex
              </NavItem>
            </LinkContainer>
            <LinkContainer onClick={(e) => {
              if (editMode) {
               e.preventDefault()
              }}} to="#">
              <NavItem eventKey={5}>
                <Button bsStyle="primary">Sign Out</Button>
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
                }} editMode={editMode} selectedAsset={selectedAsset} updateSelected={(selectedAsset)  => {
                 this.setState({selectedAsset})
                }} />
              </Col>
              <Col xs={18} md={12} lg={4}>
                <AssetDetails saveAsset={(savedAsset) => {
                  this.setState({
                    savedAsset: true,
                    selectedAsset: savedAsset,
                    editMode: false
                  });
                }} toggleEdit={(val) => this.setState({
                  editMode: val
                })} editMode={editMode} deleteAsset={(assetId) => this.deleteAsset(assetId)} asset={selectedAsset}/>
                <CircuitDiagram updateSelected={(selectedAsset) => this.setState({selectedAsset})} asset={selectedAsset}/>
              </Col>
            </Row>
        )} />
          </Grid>
        </div>
    );
  }
}

export default App;
