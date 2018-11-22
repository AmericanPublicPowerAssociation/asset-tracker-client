import React, {Component} from 'react';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarker} from '@fortawesome/free-solid-svg-icons'

import './AssetsGrid.css';

import {Row, Button, Col} from 'react-bootstrap';


library.add(faMapMarker)

class Asset extends Component {
  render() {
    const {isSelected, asset, editMode, onClickEvent} = this.props;
    const style = isSelected ? {borderRadius: '10px', backgroundColor: 'yellow'} : {borderRadius: '10px'}
    if (editMode) {
      style.cursor = 'not-allowed';
    }
    return (
      <Row style={style} onClick={(e) => {
        if (!editMode) {
          onClickEvent()
        }
      }} className='asset'>
        <Col lg={12}>
          <Button
            style={{'float': 'left'}}>
              <FontAwesomeIcon
                icon='map-marker'/>
          </Button>
          <h5>{asset.product}</h5>
        </Col>
      </Row>
    );
  }
}

export default Asset;
