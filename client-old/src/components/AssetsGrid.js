import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

import Asset from './Asset';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'

import '../css/AssetsGrid.css';


library.add(faPlusCircle)


const AssetsGrid = (props) => {
  const {assets, updateSelected, editMode, selectedAsset, toggleEdit} = props;
  const rows = assets.map((a, i) => {
    const isSelected = (a.id === selectedAsset.id);
    return <Asset
      className={`${isSelected ? 'selected' : ''}`}
      editMode={editMode} onClickEvent={() => updateSelected(a)} key={i} asset={a}/>
  });
  const addBtn = (
    <Button style={
        {
          'float': 'right',
          'marginBottom': '10px'
        }
      } bsStyle='primary' onClick={() => {
					// create asset that has all the keys of a regular asset but with empty values
					// toggle "editMode"
					// talk to component that defines asset model, get that model
					const assetObj = {
							'id': '',
							'lat': '',
							'lng': '',
							'name': '',
							'product': '',
							'type_id': -1,
							'vendor': '',
							'version': '',
					};
					updateSelected(assetObj)
					toggleEdit(true)
}} >{'Add new Asset '}<FontAwesomeIcon icon='plus-circle' />
    </Button>
  );

  return (
    <div>
      <Row>
        <Col lg={12}>{addBtn}</Col>
      </Row>
      <Row className='assets-grid'>
        <Col lg={12}>{rows}</Col>
      </Row>
    </div>
  );
}


export default AssetsGrid;
