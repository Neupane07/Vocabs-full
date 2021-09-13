import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    fontFamily: "Kumbh Sans",
  },
  textField: {
    width: 100,
  },
}));

export default function Navbar({ searchText, setSearchText }) {
  const [show, setShow] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {!show ? (
            <Typography variant="h6" className={classes.title}>
              Vocabs
            </Typography>
          ) : (
            ""
          )}
          <SearchIcon onClick={() => setShow(!show)} />
          {show ? (
            <TextField
              id="standard-search"
              label="Search field"
              type="search"
              style={{ color: "white" }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          ) : (
            ""
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
