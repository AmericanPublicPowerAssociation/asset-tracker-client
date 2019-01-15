import {APIget, APIsearch, APIaddAsset, APIeditAsset, APIdeleteAsset} from './api'

export const ADD_ASSET = 'ADD_ASSET';
export const REMOVE_ASSET = 'REMOVE_ASSET';
export const EDIT_ASSET = 'EDIT_ASSET';
export const RECEIVE_ASSETS = 'RECEIVE_ASSETS'
export const SET_SELECTED = 'SET_SELECTED'
export const TOGGLE_EDIT = 'TOGGLE_EDIT'


export const addAsset = asset => ({
  type: ADD_ASSET,
  asset
})

export const toggleEdit = editMode => ({
  type: TOGGLE_EDIT,
  editMode
})

export const setSelected = asset => ({
  type: SET_SELECTED,
  asset
})

export const removeAsset = id => ({
  type: REMOVE_ASSET,
  id
})

export const editAsset = asset => ({
  type: EDIT_ASSET,
  asset
})

export const searchAssets = assets => ({
  type: RECEIVE_ASSETS,
  assets
})

export const handleGetAssets = () => {
  return (dispatch) => {
    APIget()
      .then((assets) => {
        dispatch(searchAssets(assets))
      })
  }
}

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

export const handleAddAsset = (asset) => {
  return (dispatch) => {
    APIaddAsset(asset)
    .then((id) => {
      dispatch(addAsset(Object.assign({}, asset, {id})));
    })
    .catch(() => {
      alert('An error occurred')
    })
  }
}

export const handleEditAsset = (asset) => {
  return (dispatch) => {
    APIeditAsset(asset)
    .then(() => {
      dispatch(editAsset(asset));
    })
    .catch(() => {
      alert('An error occurred')
    })
  }
}
