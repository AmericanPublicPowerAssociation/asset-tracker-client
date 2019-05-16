const {
  selectedAssetTypeIds,
  setSelectedAssetTypes,
} = this.props
return (
  <FormControl>
    <Select
      fullWidth
      multiple
      value={selectedAssetTypeIds.toJS()}
      onChange={event => setSelectedAssetTypes({ids: event.target.value})}
      renderValue={selected => (
        <div>
        {selected.map(value =>
          <Chip key={value} label={ASSET_TYPE_BY_ID[value]['name']} 
            style={{ marginLeft: '4px' }}
          />
        )}
        </div>
      )}
    >
    {Object.entries(ASSET_TYPE_BY_ID).map(([id, {name}]) =>
      <MenuItem key={id} value={id}>
        <Checkbox checked={selectedAssetTypeIds.toJS().indexOf(id) > -1} />
          <ListItemText primary={name} />
      </MenuItem>
    )}
    </Select>
  </FormControl>
)
