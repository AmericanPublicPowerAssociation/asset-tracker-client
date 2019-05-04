  if (UPDATE_ASSET_LOCATION === actionType) {
  }

    const {assetById, assetLocationById, featureGeometryById} = state
    const {id, longitude, latitude} = actionPayload
    const asset = assetById.get(id)

    const assetChildIds = asset.get('childIds', List())
    featureGeometryById.withMutations(map => {

    })

    assetChildIds.forEach(childId => {
      const assetLocation = assetLocationById.get(childId)
      if (assetLocation) return
      featureGeometryById.merge([id])
      dispatch({type: UPDATE_ASSET_GEOMETRY, payload: {id: childId, geometry: {
        type: 'Point', coordinates: [longitude, latitude]}}})
    })

    const assetParentIds = asset.get('parentIds', List())

    return state

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
