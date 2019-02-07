import React from "react";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { ASSET_TYPES } from "../constants";

const styles = {
  text: {
    color: "white"
  }
};

const AssetFilter = props => {
  return (
    <List disablePadding>
      {ASSET_TYPES.map(x => (
        <ListItem
          button
          key={x.id}
          onClick={() => {
            console.log("hey");
          }}
        >
          <ListItemText
            classes={{ primary: props.classes.text }}
            primary={x.name}
            fontFamily={x.fontFamily}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(AssetFilter);
