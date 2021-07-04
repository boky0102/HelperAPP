import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
/* import Link from '@material-ui/core/Link'; */
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import background from './static/background_blur.png'

import logo from './static/logo.svg'




const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${background})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',   
    background: `linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.2)
    )`,
    borderRadius: "15px",
    padding: theme.spacing(5)
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    width: "20%",
    height: "20%"
  }
}));

export default function Login(props) {
  const classes = useStyles();

  


  return (

    <Grid container component="main" className={classes.root}>
      
      <Grid item xs={12} sm={8} md={5}  elevation={6} >
        <div className={classes.paper}>
          <img src={logo} className={classes.logo} alt="logo" />
          
          <form className={classes.form} noValidate onSubmit={props.handleLogInSubmit}>
            <TextField
              onChange={props.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={props.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
       

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>

            <Box display={props.display} my={2}>

              <Alert variant="outlined" severity="error">
                  Wrong username or password
              </Alert> 
            </Box>
             
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <a href="register" >
                  {"Don't have an account? Sign Up"}
                </a>
              </Grid>
            </Grid>
            <Box mt={5}>
             
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>

  );
}