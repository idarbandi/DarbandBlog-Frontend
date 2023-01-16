import React from 'react';
import { CssBaseline } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
  appBar : {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));


function Header() {
  const classes = useStyles();
  return (
  <>
  <CssBaseline/>
  <AppBar
    position="static"
    color="inherit"
    elevation={0}
    className="1px solid">
    <Toolbar>
      <Typography variant='h6' color="inherit" noWrap>
        TopBar
      </Typography>
    </Toolbar>
  </AppBar>
  </>
  );
}

export default Header;