import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';

import Asset from './Asset';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'

import './AssetsGrid.css';


library.add(faPlusCircle)


const AssetsGrid = (props) => {
  const {assets, updateSelected, editMode, selectedAsset, addNewAsset} = props;
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
      } bsStyle='primary' onClick={addNewAsset} >{'Add new Asset '}<FontAwesomeIcon icon='plus-circle' />
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
