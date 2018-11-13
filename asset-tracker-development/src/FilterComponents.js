import React, {Component} from 'react';

import AssetsGrid from './AssetsGrid';
import Map from './Map';
import SearchQuery from './SearchQuery';


class FilterComponents extends Component {
  state = {
    filteredAssets: []
  }


  updateFilteredAssets(filteredAssets) {
    // search for assets
    this.setState({
      filteredAssets 
    })
  }

  render() {
    const {selectedAsset, updateSelected} = this.props;
    const {filteredAssets} = this.state;
    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Map</h1>
              <div className='row'>
                    <div className="col-md-8">
                      <Map selectedAsset={selectedAsset} updateSelected={(asset) => updateSelected(asset)} markers={filteredAssets} />
                    </div>
                    <div className="col-md-4">
                      <SearchQuery updateFilteredAssets={(filteredAssets) => this.updateFilteredAssets(filteredAssets)}/>
                      <AssetsGrid selectedAsset={selectedAsset} updateSelected={(asset) => updateSelected(asset)} assets={filteredAssets}/>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterComponents;
