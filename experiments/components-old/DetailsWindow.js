import DeleteButton from './DeleteButton'

const _onChange = (e) => {
  const field = e.target.name
  const input = e.target.value
  const assetId = focusingAsset.id
  setAssetById(
    produce( draft => {
      draft[assetId][field] = input
    })
  )
}
    
<DeleteButton
  setFocusingAssetId={setFocusingAssetId}
  setSelectedFeatureIndexes={setSelectedFeatureIndexes}
  geoJson={geoJson}
  setGeoJson={setGeoJson}
  selectedFeatureIndexes={selectedFeatureIndexes}
  focusingAsset={focusingAsset}i
  setAssetById={setAssetById}
/>
