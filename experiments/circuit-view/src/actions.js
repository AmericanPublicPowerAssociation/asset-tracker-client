import {
  CREATE_NEW_NODES,
  DELETE_NODES,
  UPDATE_NODES,
  CREATE_NEW_EDGES,
  DELETE_EDGES,
  UPDATE_EDGES,
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
