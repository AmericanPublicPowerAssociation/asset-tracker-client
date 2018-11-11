import React, {Component} from 'react';

import Asset from './Asset';

import 'bootstrap/dist/css/bootstrap.min.css';
import './AssetsGrid.css';


class AssetsGrid extends Component {
  shouldComponentUpdate(prevProps, prevState) {
    /**
     * only update component if props.assets changed
     **/
    const {assets} = this.props;
    return (assets.length !== prevProps.assets.length) || (
      assets.some((a, i) => a.id !== prevProps.assets[i].id));
  }

  render() {
    const {assets, updateSelected} = this.props;
    const rows = assets.map((a) => <Asset onClickEvent={() => updateSelected(a.id)} key={a.id} asset={a}/>);

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
