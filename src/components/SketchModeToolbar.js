<ListItem
  classes={{selected: classes.selected}}
  button
  selected={sketchingMode === SKETCHING_MODE_EDIT}
  // disabled={!focusingAsset || focusingAsset.type !== 'b'}
  onClick={() => {
    setSketchingMode(SKETCHING_MODE_EDIT)
    setSketchingAssetType(undefined)
  }}
>
  <ListItemText primary='Edit' />
</ListItem>

<ListItem
  classes={{selected: classes.selected}}
  button
  selected={sketchingMode === SKETCHING_MODE_CONNECT}
  // disabled={!focusingAsset || focusingAsset.type !== 'b'}
  onClick={() => {
    setSketchingMode(SKETCHING_MODE_CONNECT)
    setSketchingAssetType(undefined)
  }}
>
  <ListItemText primary='Connect' />
</ListItem>
