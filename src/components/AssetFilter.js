import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InputBase from '@material-ui/core/InputBase'


const styles = {
  root: {
    height: '100%',
  },
  nameInput: {
    padding: 0,
  },
}


class AssetFilter extends PureComponent {
  render = () => {
    const {
      classes,
      // Get global variables
      assetNameQuery,
      setAssetNameQuery,
    } = this.props
    return (
      <Paper className={classes.root} square>
        <List>
          <ListItem>
            <InputBase
              value={assetNameQuery}
              placeholder='Filter by Name'
              inputProps={{
                className: classes.nameInput,
              }}
              onChange={event => setAssetNameQuery({
                query: event.target.value})}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary='Filter by Type' />
          </ListItem>
          <ListItem>
            <ListItemText primary='Filter by Utility' />
          </ListItem>
        </List>
      </Paper>
    )
  }
}


export default withStyles(styles)(AssetFilter)
