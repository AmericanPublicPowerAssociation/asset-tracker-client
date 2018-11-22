import React, {Component} from 'react';

import {Row, Button, FormControl, Col, Panel} from 'react-bootstrap';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faEdit, faSave} from '@fortawesome/free-solid-svg-icons'


library.add(faTrash)
library.add(faEdit)
library.add(faSave)

class AssetDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editedAsset: null,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.asset === null && this.state.editedAsset !== null) {
      console.log('edit!')
      this.setState({
        editedAsset: null
      })
    } else if (this.props.asset && (!prevProps.asset || prevProps.asset.id !== this.props.asset.id)) {
      const {lat, lng, id, ...editedAsset} = this.props.asset
      this.setState({
        editedAsset
      })
    }
  }

  render() {
    const {asset, deleteAsset, editMode, saveAsset, toggleEdit} = this.props;
    const {editedAsset} = this.state;
    let details = '';
    if (editedAsset && asset) {
      console.log(JSON.stringify(editedAsset))
      const editBtn = editMode ? (
        <Button style={{'float': 'right'}} bsStyle='success' onClick={(e) => {
              const updatedAsset = Object.assign(editedAsset, {id: asset.id, lng: asset.lng, lat: asset.lat});
              saveAsset(updatedAsset)
        }}><FontAwesomeIcon icon='save' /></Button>) : (
          <Button style={{'float': 'right'}} bsStyle='info' onClick={(e) => toggleEdit(true)}><FontAwesomeIcon icon='edit' /></Button>
        );

      const deleteBtn = <Button style={{'float': 'right'}} bsStyle='danger' onClick={(e) => deleteAsset(asset.id)}><FontAwesomeIcon icon='trash' /></Button>

      const coords = editMode ? (
              <div>
                <h2>Latitude</h2>
                <FormControl readOnly value={asset.lat} />
                <h2>Longitude</h2>
                <FormControl readOnly value={asset.lng} />
              </div>
      ) : '';
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
                  editedAsset: Object.assign(editedAsset, {[key]: e.target.value})
                })} value={value} />
              </div>
            ) : (
              <div key={i}>
                <h2>{key}</h2>
                <p>{asset[[key]]}</p>
              </div>
            )
          })}
          {coords}
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
