import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class AssetsGrid extends Component {
  render() {
    const {assets} = this.props;
    let rows = [];
    assets.forEach((a) => {
      const asset = (<div key={a.id} className='row'><div className='col-md-12'>{a.product}<hr/></div></div>);
      rows.push(asset);
    });
    return (
      <div className='row'>
        <div className="col-md-12">
      {rows}
        </div>
      </div>
    );
  }
}

export default AssetsGrid;
