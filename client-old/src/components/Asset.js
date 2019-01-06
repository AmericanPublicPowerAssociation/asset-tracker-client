import React from 'react';
import {Row, Button, Col} from 'react-bootstrap';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarker} from '@fortawesome/free-solid-svg-icons'

import '../css/AssetsGrid.css';


library.add(faMapMarker)


const Asset = (props) => {
  const {className, asset, editMode, onClickEvent} = props;
  // if editing don't show asset search results list
  const style = editMode ? {cursor: 'not-allowed', visibility: 'hidden'} : {};
  const icon = (
    <Button style={{'float': 'left'}}>
      <FontAwesomeIcon icon='map-marker'/>
    </Button>
  );

  return (
    <Row className={`asset ${className}`} style={style} onClick={(e) => editMode || onClickEvent()} >
      <Col lg={12}>
        {icon}
        <h5>{asset.product}</h5>
      </Col>
    </Row>
  );
}


export default Asset;
