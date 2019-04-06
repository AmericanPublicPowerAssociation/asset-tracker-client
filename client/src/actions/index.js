import { List } from 'immutable'
import {
  ADD_ASSET,
  UPDATE_ASSET,
  UPDATE_ASSET_LOCATION,
  UPDATE_ASSET_GEOMETRY,
  TOGGLE_ASSET_RELATION,
  ADD_SELECTED_ASSET_TYPE,
  TOGGLE_SELECTED_ASSET_TYPE,
  SET_SELECTED_ASSET_TYPES,
  SET_SELECTED_ASSETS,
  SET_FOCUSING_ASSET,
  SET_RELATING_ASSET,
  SET_LOCATING_ASSET,
} from '../constants'

export const addAsset = payload => ({
  type: ADD_ASSET, payload})
export const updateAsset = payload => ({
  type: UPDATE_ASSET, payload})

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
export const toggleAssetRelation = payload => ({
  type: TOGGLE_ASSET_RELATION, payload})

export const addSelectedAssetType = payload => ({
  type: ADD_SELECTED_ASSET_TYPE, payload})
export const toggleSelectedAssetType = payload => ({
  type: TOGGLE_SELECTED_ASSET_TYPE, payload})
export const setSelectedAssetTypes = payload => ({
  type: SET_SELECTED_ASSET_TYPES, payload})

export const setSelectedAssets = payload => ({
  type: SET_SELECTED_ASSETS, payload})

export const setFocusingAsset = payload => ({
  type: SET_FOCUSING_ASSET, payload})
export const setRelatingAsset = payload => ({
  type: SET_RELATING_ASSET, payload})
export const setLocatingAsset = payload => ({
  type: SET_LOCATING_ASSET, payload})
