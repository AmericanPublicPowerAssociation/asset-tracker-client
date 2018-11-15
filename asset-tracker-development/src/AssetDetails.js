import React, {Component} from 'react';


class AssetDetails extends Component {
  render() {
    const {asset} = this.props;
    const details = asset !== null ? asset.product : '';
    return (
      <div className='row'>
        <div className='col-md-12'>
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
