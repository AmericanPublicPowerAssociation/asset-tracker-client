import React, {Component} from 'react';

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapMarker} from '@fortawesome/free-solid-svg-icons'

import 'bootstrap/dist/css/bootstrap.min.css';
import './AssetsGrid.css';


library.add(faMapMarker)

class Asset extends Component {
  render() {
    const {isSelected, asset, onClickEvent} = this.props;
    const style = isSelected ? {backgroundColor: 'yellow'} : {}
    return (
      <div style={style} onClick={(e) => onClickEvent()} className='row border-bottom asset'>
        <div className='col-lg-12'>
          <button
            style={{'float': 'left'}}
            className='btn'>
              <FontAwesomeIcon
                icon='map-marker'/>
          </button>
          <h5>{asset.product}</h5>
        </div>
      </div>
    );
  }
}

export default Asset;
