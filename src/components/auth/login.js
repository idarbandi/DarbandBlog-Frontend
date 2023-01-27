import React, { useState } from "react";
import axiosInstance from "../../axios/login";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//Material_UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ReactFacebookLogin from 'react-facebook-login';
import GoogleLogin from "react-google-login";
import ReactGoogleLogin from '../../axios/googleLogin';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Facebooklogin from "../../axios/facebooklogin";




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", //Fixing IE 11 ISSUE
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn() {
  const history = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      // Trimming Any WhiteSpace
      [e.target.name]: e.target.value.trim(),
    });
  };

  const responseFacebook = (response) => {
    ReactFacebookLogin(response.access_token);
  }

  const responseGoogle = (response) => {
    ReactGoogleLogin(response.access_token)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios
      .post("http://127.0.0.1:8000/api/auth/token/", {
        grant_type: 'password',
        username: formData.email,
        password: formData.password,
        client_id: "4nMXyQkDNi5290RyBmnyk7DQBnR9SUf0g1qCKSew",
        client_secret: "8zv6lYfuP1dZf85rsAaFB7Vx1OQJQCvzWQ5e91GUguttwUrHaiZexVfWUx2kVanVd77t35vKsN6Wp9Tk1NkJQW2FIwFjTgWwN1LVeI4k4f0P5Q1oGxco2bUBc1AbUJgL"
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token); 
      }).then(
        history("/")
      )
      
      ;
  };

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography component="h1" variant="h5">
          SignUp
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember Me"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Log In
            </Button>
            <ReactFacebookLogin
              appId="ddeeed"
              fields="name, email, picture"
              callback={responseFacebook}
              className={classes.facebook}
            />
            <GoogleLogin
              appId="your app ID"
              fields="name, email, picture"
              callback={responseGoogle}
            />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot Password
                </Link>
              </Grid>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                Dont Have an Account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
