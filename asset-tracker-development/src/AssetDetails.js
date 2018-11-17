import React, {Component} from 'react';


class AssetDetails extends Component {
  render() {
    const {asset} = this.props;
    let details = ''
    if (asset) {
      details = (
        <div className='asset-details'>
          <h5>Vendor</h5>
          <p>{asset.vendor}</p>
          <h5>Product</h5>
          <p>{asset.product}</p>
          <h5>Version</h5>
          <p>{asset.version}</p>
          <h5>ID</h5>
          <p>{asset.id}</p>

        </div>
      )
    }
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Asset</h1>
                {details}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AssetDetails;
