import React, {Component} from 'react';

import Asset from './Asset';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AssetsGrid.css';


class AssetsGrid extends Component {
  render() {
    const {assets, updateSelected, selected_asset_id} = this.props;
    const rows = assets.map((a) => {
      const isSelected = (a.id === selected_asset_id);
      return <Asset isSelected={isSelected} onClickEvent={() => updateSelected(a.id)} key={a.id} asset={a}/>
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
