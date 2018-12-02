import React, {Component} from 'react';
import {Row, Col, Panel} from 'react-bootstrap';

import AssetsGrid from './AssetsGrid';
import Map from './Map';
import SearchQuery from './SearchQuery';


class FilterComponents extends Component {
  render() {
    const {addNewAsset, selectedAsset, updateSelected, editMode} = this.props;
    const {filteredAssets} = this.state;
    return (
    );
  }
}


export default FilterComponents;
