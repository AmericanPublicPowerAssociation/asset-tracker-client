import React, {Component} from 'react';

import Asset from './Asset';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AssetsGrid.css';


class AssetsGrid extends Component {
  render() {
    const {assets, updateSelected, selectedAsset} = this.props;
    const rows = assets.map((a) => {
      const isSelected = selectedAsset !== null && (a.id === selectedAsset.id);
      return <Asset isSelected={isSelected} onClickEvent={() => updateSelected(a)} key={a.id} asset={a}/>
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
