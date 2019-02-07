import React from "react";
import { spacing } from "@material-ui/system";
import { withStyles } from "@material-ui/core/styles";
// import * as Colors from "material-ui/styles/colors";
// import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import getMuiTheme from "material-ui/styles/getMuiTheme";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import SearchIcon from "@material-ui/icons/Search";
import MapIcon from "@material-ui/icons/Map";
import TableIcon from "@material-ui/icons/ListAlt";
import ReportIcon from "@material-ui/icons/Assessment";
import AlertIcon from "@material-ui/icons/Notifications";
import AccountIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";

const styles = {
  grow: {
    flexGrow: 1
  },
  typography: {
    fontFamily: ["Avenir-Roman"],
    fontWeight: 900,
    color: "#207df0"
  },
  typography1: {
    fontFamily: ["Avenir-Roman"],
    color: "black"
  }
};

// const muiTheme = getMuiTheme({
//   palette: {
//     textColor: Colors.darkBlack,
//     primary1Color: Colors.white,
//     primary2Color: Colors.indigo700,
//     accent1Color: Colors.redA200,
//     pickerHeaderColor: Colors.darkBlack,
//     alternateTextColor: Colors.redA200
//   },
//   appBar: {
//     height: 60
//   }
// });

const NavigationBar = props => {
  const { classes } = props;
  return (
    <AppBar position="fixed" color="white">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          type="title"
          className={classes.typography}
        >
          ASSET TRACKER
        </Typography>
        <Typography
          style={{
            borderRight: "0.1em solid #e6e6e6",
            padding: "0.5em",
            height: 35
          }}
        />
        <Button
          variant="h6"
          style={{
            padding: "0.5em",
            marginLeft: "1rem",
            textTransform: "none"
          }}
          className={classes.typography1}
        >
          Asset locator
        </Button>
        <Button
          variant="h6"
          style={{
            padding: "0.5em",
            marginLeft: "0.5rem",
            textTransform: "none"
          }}
          className={classes.typography1}
        >
          Dashboard
        </Button>
        <Typography color="inherit" style={{}} className={classes.grow} />
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <MapIcon />
        </IconButton>
        <IconButton>
          <TableIcon />
        </IconButton>
        <IconButton>
          <ReportIcon />
        </IconButton>
        <IconButton>
          <Badge badgeContent={3} color="error">
            <AlertIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <SettingsIcon />
        </IconButton>
        <IconButton>
          <AccountIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(NavigationBar);
