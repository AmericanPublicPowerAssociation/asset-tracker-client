import { ADD_ASSET } from '../constants'

const initialState = {
  assets: [],
  remoteAssets: [],
}

const rootReducer = (state=initialState, action) => {
  if (action.type === ADD_ASSET) {
    return Object.assign({}, state, {
      assets: state.assets.concat(action.payload)
    })
  }
  if (action.type === 'FOUND_BAD_WORD') {
    return Object.assign({}, state, {
      assets: state.assets.concat({title: 'xxx', id: -1})
    })
  }
  if (action.type === 'DATA_LOADED') {
    console.log('hey data loaded!')
    return Object.assign({}, state, {
      remoteAssets: state.remoteAssets.concat(action.payload)
    })
  }
  return state;
}

export default rootReducer
