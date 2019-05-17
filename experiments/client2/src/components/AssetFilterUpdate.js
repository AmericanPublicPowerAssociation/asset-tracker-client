import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  iconButton: {
    padding: 10,
  },
}

state = {
  isFilterListVisible: false,
  isAssetTypeCheckboxesHidden: true,
}

const {
  selectedAssetTypeIds,
  // setSelectedAssetTypes,
  onAssetTypeClick,
} = this.props
  return (
      <div className={classes.root}>
        <IconButton 
          className={classes.iconButton}
          aria-label="Menu"
          onClick={() => {
            if (this.state.isAssetTypeCheckboxesHidden) {
              this.setState({isAssetTypeCheckboxesHidden: false})
            } else {
              this.setState({isAssetTypeCheckboxesHidden: true})
            }
          }}
          >
          <MenuIcon />
        </IconButton>
      </div>
      {!this.state.isAssetTypeCheckboxesHidden && <AssetTypeCheckboxes 
        selectedAssetTypeIds={selectedAssetTypeIds}
        onAssetTypeClick={onAssetTypeClick} />}
      {/* <AssetTypeCheckboxes 
        selectedAssetTypeIds={selectedAssetTypeIds}
        onAssetTypeClick={onAssetTypeClick} /> */}
