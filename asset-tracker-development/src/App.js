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
    this.setState({
      deleteAssetId: assetId
    })
  }

  componentDidUpdate() {
    const {deleteAssetId, savedAsset} = this.state;
    if (savedAsset) {
      //send post request
      /*
      fetch(`http://18.212.1.167:5000/save-asset?assetID=${deleteAssetId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          this.setState({
            deleteAssetId: '',
            selectedAsset: null
          })
        })
        */
          this.setState({
            savedAsset: false,
          })
    }
    if (deleteAssetId !== '') {
      //TODO send delete request
      /*
      fetch(`http://18.212.1.167:5000/delete-asset?assetID=${deleteAssetId}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          this.setState({
            deleteAssetId: '',
            selectedAsset: null
          })
        })
      */
          this.setState({
            deleteAssetId: '',
            selectedAsset: null
          })
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
                <FilterComponents editMode={editMode} selectedAsset={selectedAsset} updateSelected={(selectedAsset) => this.setState({selectedAsset})} />
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
