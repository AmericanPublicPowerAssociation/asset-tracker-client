import { List, Map } from 'immutable'
import {
  SET_ASSET,
  SET_ASSETS,
  SET_ASSET_LOCATION,
} from '../constants'


const initialState = Map()


const assetLocationById = (state=initialState, action) => {
  switch (action.type) {
    case SET_ASSETS: {
      const assets = action.payload
      const assetLocationById = assets.filter(_ => _.location).reduce((
        assetLocationById, asset,
      ) => assetLocationById.set(
        asset.get('id'),
        asset.get('location'),
      ), Map())
      return state.withMutations(state => {
        state.clear()
        state.merge(assetLocationById)
      })
    }
    case SET_ASSET: {
      const asset = action.payload
      const id = asset.get('id')
      return state.set(id, asset.get('location'))
    }
    case SET_ASSET_LOCATION: {
      const {id, longitude, latitude} = action.payload
      return state.merge({
        [id]: List([longitude, latitude]),
      })
    }
    default:
      return state
  }
}


export default assetLocationById
