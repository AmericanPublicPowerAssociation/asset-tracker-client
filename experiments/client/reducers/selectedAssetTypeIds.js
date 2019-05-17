if (SET_SELECTED_ASSET_TYPES === actionType) {
  const {ids} = action.payload
  return state.withMutations(state => {
    state.clear()
    state.concat(ids)
  })
}
