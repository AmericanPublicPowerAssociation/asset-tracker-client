import React, {Component} from 'react';

import AssetsGrid from './AssetsGrid';
import Map from './Map';
import SearchQuery from './SearchQuery';


class FilterComponents extends Component {
  state = {
    filtered_assets: []
  }

  componentDidMount() {
    const {all_assets} = this.props;
    this.setState({
      filtered_assets: all_assets
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const {all_assets} = this.props;
    if (
      prevProps.all_assets.length !== all_assets.length) {
        this.setState({
          filtered_assets: all_assets
        })
    }
  }

  filterAssets(search_query) {
    // search for assets
    const {all_assets} = this.props;
    const re = new RegExp(`.*${search_query}.*`, 'i');

    const filtered_assets = all_assets.filter((a) =>
      a.vendor.match(re) || a.product.match(re));
    this.setState({
      filtered_assets
    });
  }

  render() {
    const {selected_asset_index, updateSelected} = this.props;
    const {filtered_assets} = this.state;
    return (
      <div className='row'>
        <div className="col-md-8">
          <Map selected_asset_id={selected_asset_index} updateSelected={(selected_asset_index) => updateSelected(selected_asset_index)} markers={filtered_assets} />
        </div>
        <div className="col-md-4">
          <SearchQuery filterAssets={(search_query) => this.filterAssets(search_query)}/>
          <AssetsGrid updateSelected={(selected_asset_index) => updateSelected(selected_asset_index)} assets={filtered_assets}/>
        </div>
      </div>
    );
  }
}

export default FilterComponents;
