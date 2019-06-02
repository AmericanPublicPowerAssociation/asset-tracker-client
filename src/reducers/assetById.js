import { List, Map } from 'immutable'
import {
  EXCLUDE_ASSET_RELATION,
  INCLUDE_ASSET_RELATION,
  MERGE_ASSET,
  SET_ASSET,
  SET_ASSETS,
  SET_ASSET_ERRORS,
} from '../constants'
import {
  getById,
} from '../macros'


const initialState = Map()


const assetById = (state=initialState, action) => {
  const actionType = action.type

  switch (actionType) {
    case SET_ASSETS: {
      const assets = action.payload
      return state.withMutations(state => {
        state.clear()
        state.merge(getById(assets, state))
      })
    }
    case SET_ASSET: {
      const asset = action.payload
      const id = asset.get('id')
      return state.set(id, asset)
    }
    case MERGE_ASSET: {
      const partialAsset = action.payload
      const { id } = partialAsset
      return state.mergeDeep({[id]: partialAsset})
    }
    case SET_ASSET_ERRORS: {
      const { id, errors }= action.payload
      return state.update(id, asset => asset.set('errors', errors))
    }
    case INCLUDE_ASSET_RELATION:
    case EXCLUDE_ASSET_RELATION: {
      const { id, key, otherId } = action.payload
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
