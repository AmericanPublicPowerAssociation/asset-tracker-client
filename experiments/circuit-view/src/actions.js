import {
  CREATE_NEW_NODES,
  DELETE_NODES,
  UPDATE_NODES,
  CREATE_NEW_EDGES,
  DELETE_EDGES,
  UPDATE_EDGES,
  TOGGLE_PALETTE,
  SET_FOCUSED_NODE,
} from './constants'


export const createNewNodes = payload => (
  {type: CREATE_NEW_NODES, payload})
export const deleteNodes = payload => (
  {type: DELETE_NODES, payload})
export const updateNodes = payload => (
  {type: UPDATE_NODES, payload})


export const createNewEdges = payload => (
  {type: CREATE_NEW_EDGES, payload})
export const deleteEdges = payload => (
  {type: DELETE_EDGES, payload})
export const updateEdges = payload => (
  {type: UPDATE_EDGES, payload})

export const togglePalette = payload => (
  {type: TOGGLE_PALETTE, payload})

export const setFocusedNode = payload => (
  {type: SET_FOCUSED_NODE, payload})
