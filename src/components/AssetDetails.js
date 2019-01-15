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
    /*
     * editedAsset: Object => the current state of the edited form
     */
    this.state = {
      editedAsset: {},
    }
  }

  isValid = (obj) => Object.keys(obj).length > 0;

  componentDidMount() {
    if (this.isValid(this.props.asset)) {
      this.setState((state, props) => {
        const {id, lat, lng, ...editedAsset} = props.asset
        this.ORIGINALCOORDS = [lng, lat]
        return {
          editedAsset
        }
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const self = this;
    const {asset} = self.props;
    const {editedAsset} = self.state;
    if (!self.isValid(asset) && self.isValid(editedAsset)) {
      // if you are no longer selecting an asset, reset editedAsset
      self.setState({
        editedAsset: {},
      })
    } else if (self.isValid(asset) && prevProps.asset.id !== asset.id) {
      // a new asset was selected
      self.setState((state, props) => {
        const {id, lat, lng, ...editedAsset} = props.asset
        self.ORIGINALCOORDS = [lng, lat]
        return {
          editedAsset
        }
      })
    }
  }

  render() {
    const {asset, updateSelected, deleteAsset, editMode, saveAsset, toggleEdit} = this.props;
    const {editedAsset} = this.state;
    const style = {'float': 'right'}
    let details = '';

    if (this.isValid(editedAsset) && this.isValid(asset)) {
      const editBtn = editMode ? (
        <Button style={style} bsStyle='success'
          onClick={(e) => {
              const updatedAsset = Object.assign(
                {}, editedAsset, {
                  id: asset.id,
                  lng: asset.lng,
                  lat: asset.lat});
              toggleEdit(false);
              saveAsset(updatedAsset);
        }} >{'Save Asset '}<FontAwesomeIcon icon='save' /></Button>) : (
        <Button style={style} bsStyle='info' onClick={(e) =>
          toggleEdit(true)
        }>{'Edit Asset '}<FontAwesomeIcon icon='edit' /></Button>
      );

      const deleteBtn = editMode ? (
        <Button style={style} bsStyle='danger' onClick={(e) => {
            // if new asset use empty object
            // if editing an asset revert to original asset
            const a = asset.id !== '' ? (
              Object.assign(
                  {},
                  asset,
                  {
                    lng: this.ORIGINALCOORDS[0],
                    lat: this.ORIGINALCOORDS[1]
                  })
            ) : {};
            toggleEdit(false)
            updateSelected(a)
      }} >{'Cancel '}<FontAwesomeIcon icon='ban' /></Button>
      ) : (
        <Button style={style} bsStyle='danger' onClick={(e) =>
          deleteAsset(asset)
        }>{'Delete Asset '}<FontAwesomeIcon icon='trash' /></Button>
      );

      const assetForm = Object.entries(editedAsset).map((attr, i) => {
        const [key, value] = attr;
        return editMode ? (
          <div key={i}>
            <h2>{key}</h2>
            <FormControl onChange={(e) => {
              const value = e.target.value;
               this.setState((state, props) => {
                return {
                  editedAsset: Object.assign(
                    {},
                    state.editedAsset,
                    {
                      [key]: value
                    }
                  )
                }
              })}
            } value={value} />
          </div>
        ) : (
          <div key={i}>
            <h2>{key}</h2>
            <p>{asset[[key]]}</p>
          </div>
        )
      });

      details = (
        <div className='asset-details' >
          {deleteBtn}
          {editBtn}
          {assetForm}
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
