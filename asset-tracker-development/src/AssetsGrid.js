import React, {Component} from 'react';

import Asset from './Asset';

import './AssetsGrid.css';
import {Row, Col} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'


library.add(faPlusCircle)

class AssetsGrid extends Component {
  render() {
    const {assets, updateSelected, editMode, selectedAsset, addNewAsset} = this.props;
    const rows = assets.map((a) => {
      const isSelected = selectedAsset && (a.id === selectedAsset.id);
      return <Asset editMode={editMode} isSelected={isSelected} onClickEvent={() => updateSelected(a)} key={a.id} asset={a}/>
    });

    return (
      <div>
        <Row>
          <Col lg={12}>
            <Button style={{'float': 'right', marginBottom: '10px'}} bsStyle='primary' onClick={addNewAsset}>{'Add new Asset '}<FontAwesomeIcon icon='plus-circle' /></Button>
          </Col>
        </Row>
        <Row className='assets-grid'>
          <Col lg={12}>
            {rows}
          </Col>
        </Row>
      </div>
    );
  }
}

export default AssetsGrid;
