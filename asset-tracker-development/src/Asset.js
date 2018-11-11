import React, {Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AssetsGrid.css';


class Asset extends Component {
  render() {
    const {isSelected, asset, onClickEvent} = this.props;
    const style = isSelected ? {backgroundColor: 'lightblue'} : {}
    return (
      <div style={style} onClick={(e) => onClickEvent()} className='row asset'>
        <div className='col-md-12'>
          {asset.product}
        </div>
      </div>
    );
  }
}

export default Asset;
