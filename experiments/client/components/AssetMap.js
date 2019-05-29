import AssetMapToggleView from './AssetMapToggleView'

class AssetMap extends PureComponent {

  state = {
    withSatelliteImagery: false,  
  }

  onClick = event => {
    const {
      // Get local variables
      onSelect,
      // Get global variables
      setSelectedAssets,
      setFocusingAsset,
    } = this.props
    const assetIds = [...new Set(
      event.features &&
      event.features.map(f => f.properties.id))]
    const assetCount = assetIds.length
    if (assetCount === 0) {
      setSelectedAssets({ids: []})
      return
    } else if (assetCount > 1) {
      setSelectedAssets({ids: assetIds})
    }
    setFocusingAsset({id: assetIds[0]})
    onSelect()
  }

  handleWithSatelliteImagery = dataFromChild => {
    this.setState({ withSatelliteImagery: dataFromChild })
  }

  getCursor = ({isHovering}) => {
    return isHovering ? 'pointer' : 'all-scroll'
  }

  render () {
    return (
      <ReactMapGL
        interactiveLayerIds={interactiveLayerIds.toJS()}
        onClick={this.onClick}
        getCursor={this.getCursor}
      >
        <AssetMapToggleView 
          handleWithSatelliteImagery={this.handleWithSatelliteImagery}
        />
      </ReactMapGL>
    )
  }
}
