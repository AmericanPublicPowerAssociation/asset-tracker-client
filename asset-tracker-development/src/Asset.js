import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AssetsGrid.css';


class Asset extends Component {
  render() {
    const {asset} = this.props;
    return (
      <div className='row asset'>
        <div className='col-md-12'>
          {asset.product}
        </div>
      </div>
    );
  }
}

export default Asset;
