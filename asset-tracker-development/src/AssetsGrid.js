import React, {Component} from 'react';

import Asset from './Asset';

import './AssetsGrid.css';
import {Row, Col} from 'react-bootstrap';
import { Button } from 'react-bootstrap';

class AssetsGrid extends Component {
  render() {
    const {assets, updateSelected, editMode, selectedAsset, addNewAsset} = this.props;
    const rows = assets.map((a) => {
      const isSelected = selectedAsset && (a.id === selectedAsset.id);
      return <Asset editMode={editMode} isSelected={isSelected} onClickEvent={() => updateSelected(a)} key={a.id} asset={a}/>
    });

    return (
      <div>
      <Row className='assets-grid'>
        <Col lg={12}>
          {rows}
        </Col>
      </Row>
      <Button
      onClick={addNewAsset}
      >Add asset</Button>
      </div>
    );
  }
}

export default AssetsGrid;
