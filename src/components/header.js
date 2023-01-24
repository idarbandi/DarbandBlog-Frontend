import React, { useState } from "react";
import { Button, CssBaseline } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Search } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchBar from 'material-ui-search-bar';


const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  toolbarTitle: {
    flexGrow: 1
  },
}));

function Header() {
  const classes = useStyles();
  let history = useNavigate();
  const [data, setData] = useState({
    search: ''
  });
  const goSearch = (e) => {
    history({
      pathname: "/search/",
      search: "?search=" + data.search,
    });
    window.location.reload();
  };
  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        className="1px solid"
      >
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link
              to="/"
              component={NavLink}
              style={{ textDecoration: "none", color: "ActiveCaption" }}
            >
              Blog
            </Link>
          </Typography>
          <SearchBar
            value={data.search}
            onChange={(newValue) => setData({ search: newValue })}
            onRequestSearch={() => goSearch(data.search)}
          />
          <nav>
            <Link color="textPrimary" href="#" style={{ textDecoration: "none", color: "teal" }} component={NavLink} className={classes.link} to="/SignUp">
              Register
            </Link>
          </nav>
          <Button
            color="primary"
            href="#"
            variant="outlined"
            className={classes.link}
            component={NavLink}
            to="/login">
            Log In
          </Button>
          <Button
            color="secondary"
            href="#"
            variant="outlined"
            className={classes.link}
            component={NavLink}
            to="/logout">
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
