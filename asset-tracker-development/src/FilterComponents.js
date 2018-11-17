import React, {Component} from 'react';

import AssetsGrid from './AssetsGrid';
import Map from './Map';
import SearchQuery from './SearchQuery';


class FilterComponents extends Component {
  state = {
    filteredAssets: []
  }

  componentDidUpdate() {
    const {selectedAsset} = this.props;
    if (selectedAsset) {
      const {filteredAssets} = this.state;
      const isNotInFilter = filteredAssets.every(
        (a) => a.id !== selectedAsset.id);
      if (isNotInFilter) {
        this.setState({
          filteredAssets: filteredAssets.concat([selectedAsset])
        })
      }
    }
  }

  updateFilteredAssets(filteredAssets) {
    // search for assets
    const {updateSelected} = this.props;
    updateSelected(null)
    this.setState({
      filteredAssets
    })
  }

  render() {
    const {selectedAsset, updateSelected} = this.props;
    const {filteredAssets} = this.state;
    return (
      <div className='row'>
        <div className='col-lg-12'>
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Map</h1>
              <div className='row'>
                    <div className="col-lg-8">
                      <Map selectedAsset={selectedAsset} updateSelected={(asset) => updateSelected(asset)} markers={filteredAssets} />
                    </div>
                    <div className="col-lg-4">
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
