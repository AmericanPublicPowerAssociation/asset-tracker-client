import { List, Map } from 'immutable'
import {
  EXCLUDE_ASSET_RELATION,
  INCLUDE_ASSET_RELATION,
  REPLACE_ASSET,
  REPLACE_ASSETS,
  REPLACE_ASSET_ERRORS,
} from '../constants'
import {
  getById,
} from '../macros'


const initialState = Map()


const assetById = (state=initialState, action) => {
  const actionType = action.type
  const actionPayload = action.payload

  switch (actionType) {
    case REPLACE_ASSETS: {
      const assets = actionPayload
      return getById(assets)
    }
    case REPLACE_ASSET: {
      const asset = actionPayload
      const id = asset.get('id')
      return state.set(id, asset)
    }
    case REPLACE_ASSET_ERRORS: {
      const asset = actionPayload
      const id = asset.get('id')
      const errors = asset.get('errors')
      return state.update(id, asset => asset.set('errors', errors))
    }
    case INCLUDE_ASSET_RELATION:
    case EXCLUDE_ASSET_RELATION: {
      const { id, key, otherId } = actionPayload
      if (id === otherId) {
        return state
      }
      const asset = state.get(id)
      const otherKey = {
        'connectedIds': 'connectedIds',
        'parentIds': 'childIds',
        'childIds': 'parentIds',
      }[key]
      const otherAsset = state.get(otherId)

      const relatedAssetIds = asset.get(key, List())
      const otherRelatedAssetIds = otherAsset.get(otherKey, List())

      const toggle = actionType === INCLUDE_ASSET_RELATION ?
        (assetIds, assetId) => assetIds.push(assetId) :
        (assetIds, assetId) => assetIds.filter(_ => _ !== assetId)

      return state.merge({
        [id]: asset.set(key, toggle(relatedAssetIds, otherId)),
        [otherId]: otherAsset.set(otherKey, toggle(otherRelatedAssetIds, id)),
      })
    }
    default:
      return state
  }
}


export default assetById
