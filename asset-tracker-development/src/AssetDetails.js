import React, {Component} from 'react';


class AssetDetails extends Component {
  render() {
    const {asset} = this.props;
    const details = asset ? asset.product : '';
    return (
      <div className='row'>
        <div className='col-md-12'>
          {details}
        </div>
      </div>
    );
  }
}

export default AssetDetails;
