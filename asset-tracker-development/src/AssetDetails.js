import React, {Component} from 'react';
import {Row, Button, FormControl, Col, Panel} from 'react-bootstrap';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faBan, faEdit, faSave} from '@fortawesome/free-solid-svg-icons'


library.add(faTrash)
library.add(faEdit)
library.add(faSave)
library.add(faBan)

class AssetDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editedAsset: null,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.asset === null && this.state.editedAsset !== null) {
      this.setState({
        editedAsset: null,
      })
    } else if (this.props.asset && (!prevProps.asset || prevProps.asset.id !== this.props.asset.id)) {
      const {id, lat, lng, ...editedAsset} = this.props.asset
      this.originalLngLat = [lng, lat]
      this.setState({
        editedAsset
      })
    }
  }

  render() {
    const {asset, updateSelected, deleteAsset, editMode, saveAsset, toggleEdit} = this.props;
    const {editedAsset} = this.state;
    let details = '';
    if (editedAsset && asset) {
      const editBtn = editMode ? (
        <Button style={{'float': 'right'}} bsStyle='success' onClick={(e) => {
              debugger;
              const updatedAsset = Object.assign({}, editedAsset, {id: asset.id, lng: asset.lng, lat: asset.lat});
              saveAsset(updatedAsset)
        }}>{'Save Asset '}<FontAwesomeIcon icon='save' /></Button>) : (
          <Button style={{'float': 'right'}} bsStyle='info' onClick={(e) => toggleEdit(true)}>{'Edit Asset '}<FontAwesomeIcon icon='edit' /></Button>
        );

      const deleteBtn = editMode ? (
        <Button style={{'float': 'right'}} bsStyle='danger' onClick={(e) => {
          toggleEdit(false)
          if (asset.id < 0) {
            updateSelected(null);
          }
          else {
            const n = Object.assign({}, asset, {lng: this.originalLngLat[0], lat: this.originalLngLat[1]})
            updateSelected(n)
          }
      }}>{'Cancel '}<FontAwesomeIcon icon='ban' /></Button>
      ) : (
        <Button style={{'float': 'right'}} bsStyle='danger' onClick={(e) => deleteAsset(asset.id)}>{'Delete Asset '}<FontAwesomeIcon icon='trash' /></Button>
      );

      details = (
        <div className='asset-details' >
          {deleteBtn}
          {editBtn}
          {Object.entries(editedAsset).map((a, i) => {
            const [key, value] = a;
            return editMode ? (
              <div key={i}>
                <h2>{key}</h2>
                <FormControl onChange={(e) => this.setState({
                  editedAsset: Object.assign({}, editedAsset, {[key]: e.target.value})
                })} value={value} />
              </div>
            ) : (
              <div key={i}>
                <h2>{key}</h2>
                <p>{asset[[key]]}</p>
              </div>
            )
          })}
        </div>
      );
    }
    return (
      <Row>
        <Col lg={12}>
          <Panel>
            <Panel.Heading><h1>Asset</h1></Panel.Heading>
            <Panel.Body>
                {details}
            </Panel.Body>
          </Panel>
        </Col>
      </Row>
    );
  }
}

export default AssetDetails;
