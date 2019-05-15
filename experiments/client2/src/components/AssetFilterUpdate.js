import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AssetTypeCheckboxes from '../components/AssetTypeCheckboxes'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}

  state = {
    isFilterListVisible: false,
    isAssetTypeCheckboxesHidden: true,
  }
  render() {
    const { classes } = this.props;
    const {
			selectedAssetTypeIds,
			// setSelectedAssetTypes,
      onAssetTypeClick,
      setSearchTerm,
		} = this.props
      return (
        <Paper elevation={1}>
          <div className={classes.root}>
            <IconButton 
              className={classes.iconButton}
              aria-label="Menu"
              onClick={() => {
                console.log('Iconbutton clicked')
                if (this.state.isAssetTypeCheckboxesHidden) {
                  this.setState({isAssetTypeCheckboxesHidden: false})
                  console.log('ishidden = false')
                } else {
                  this.setState({isAssetTypeCheckboxesHidden: true})
                  console.log('ishidden = true')
                }
              }}
              >
              <MenuIcon />
            </IconButton>
            <InputBase 
              className={classes.input} 
              placeholder="Search Assets" 
              onChange={(event)=> {
                console.log(event.target.value)
                setSearchTerm({ query: event.target.value })
              }
              }
              />
            <IconButton 
              className={classes.iconButton} 
              aria-label="Search">
              <SearchIcon />
            </IconButton>
          </div>
          {!this.state.isAssetTypeCheckboxesHidden && <AssetTypeCheckboxes 
            selectedAssetTypeIds={selectedAssetTypeIds}
            onAssetTypeClick={onAssetTypeClick} />}
          {/* <AssetTypeCheckboxes 
            selectedAssetTypeIds={selectedAssetTypeIds}
            onAssetTypeClick={onAssetTypeClick} /> */}
        </Paper>
      )
  }
}

