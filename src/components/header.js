import React from "react";
import { Button, CssBaseline } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import {Link, NavLink} from 'react-router-dom';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
              style={{textDecoration: "none", color: "ActiveCaption"}}
              >
                Blog
              </Link>
          </Typography>
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
