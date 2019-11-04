import {
  CREATE_NEW_NODES,
  CREATE_NEW_EDGES,
  DELETE_NODES,
} from './constants'


export const createNewNodes = (payload) => {
  return {type: CREATE_NEW_NODES, payload}
} 

export const createNewEdges = (payload) => {
  return {type: CREATE_NEW_EDGES, payload}
} 

export const deleteNodes = (payload) => {
  return {type: DELETE_NODES, payload}
}
