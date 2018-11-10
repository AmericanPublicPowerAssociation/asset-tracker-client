import React, {Component} from 'react';

import Asset from './Asset';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AssetsGrid.css';


class AssetsGrid extends Component {
  render() {
    const {assets, updateSelected} = this.props;
    let rows = [];
    assets.forEach((a) => {
      const asset = (<Asset onClickEvent={() => updateSelected(a.id)} key={a.id} asset={a}/>);
      rows.push(asset);
    });

    return (
      <div className='row assets-grid'>
        <div className="col-md-12">
          {rows}
        </div>
      </div>
    );
  }
}

export default AssetsGrid;
