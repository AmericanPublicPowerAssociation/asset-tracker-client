UPDATE_ASSET_GEOMETRY,

export const updateAssetLocation = payload => (dispatch, getState) => {
  dispatch({type: UPDATE_ASSET_LOCATION, payload})

  const {id, longitude, latitude} = payload
  const {assetById, assetLocationById} = getState()
  const asset = assetById.get(id)
  const assetChildIds = asset.get('childIds', List())
  assetChildIds.forEach(childId => {
    const assetLocation = assetLocationById.get(childId)
    if (assetLocation) return
    dispatch({type: UPDATE_ASSET_GEOMETRY, payload: {id: childId, geometry: {
      type: 'Point', coordinates: [longitude, latitude]}}})
  })

  const assetParentIds = asset.get('parentIds', List())
  assetParentIds.forEach(parentId => {
    const assetParent = assetById.get(parentId)
    const assetTypeId = assetParent.get('typeId')
    if (assetTypeId !== 'l') return
    const poleIds = assetParent.get('childIds', List())
    const poleXYs = poleIds
      .map(poleId => poleId === id ?
        List([longitude, latitude]) :
        assetLocationById.get(poleId))
      .filter(assetLocation => assetLocation)
    dispatch({type: UPDATE_ASSET_GEOMETRY, payload: {id: parentId, geometry: {
      type: 'LineString', coordinates: poleXYs.toJS()}}})
  })
}
