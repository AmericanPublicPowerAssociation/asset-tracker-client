export const handleSearchAssets = (filters) => {
  return (dispatch) => {
    APIsearch(filters)
      .then((assets) => {
        dispatch(searchAssets(assets))
      })
  }
}

export const handleRemoveAsset = (asset) => {
  return (dispatch) => {
    dispatch(removeAsset(asset.id))
    APIdeleteAsset(asset.id)
      .catch(() => {
        dispatch(addAsset(asset))
        alert('An error occurred')
      })
  }
}
