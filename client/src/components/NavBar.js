import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const NavBar = () => {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Asset Tracker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default NavBar;

