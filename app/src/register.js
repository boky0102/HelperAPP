import React from 'react';
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
import {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import background from './static/background_blur.png'

import logo from './static/logo.svg'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${background})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
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
    padding: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      height: "90%",
      justifyContent: 'flex-start'
    },
    
     
    
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
    width: "5%",
    height: "5%"
  }
}));

export default function Register(props) {
  const classes = useStyles();

  return (
 
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      
      <Grid item xs={12} sm={8} md={5} elevation={6}>
        <div className={classes.paper}>
          
          <img src={logo} className={classes.logo} alt="Logo"></img>
          
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <form className={classes.form} onSubmit={props.handleRegSubmit} >
            <TextField
              onChange={props.handleChangeRegister}
              required
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="email"
              autoFocus
              size="small"
            />
            <TextField
              required
              onChange={props.handleChangeRegister}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
            />
            
            <TextField
              required
              onChange={props.handleChangeRegister}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordConfirm"
              label="Confirm password"
              type="password"
              id="password"
              autoComplete="current-password"
              size="small"
            />

            <TextField
              required
              onChange={props.handleChangeRegister}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="firstAndLastName"
              label="First and Last name"
              type="text"
              id="password"
              autoComplete="current-password"
              size="small"
            />

            <TextField
              required
              onChange={props.handleChangeRegister}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="streetAndNum"
              label="Street and number"
              type="text"
              id="password"
              autoComplete="current-password"
              size="small"
            />

            <TextField
              required
              onChange={props.handleChangeRegister}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="city"
              label="City"
              type="text"
              id="password"
              autoComplete="current-password"
              size="small"
            />

            <TextField
              required
              onChange={props.handleChangeRegister}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="country"
              label="Country"
              type="text"
              id="password"
              autoComplete="current-password"
              size="small"
            />


            
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              size="small"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              size="small"
            >
              Register
            </Button>
            <Box display={props.display} my={2}>

              <Alert variant="outlined" severity="error">
                  {props.regErrMessage}
              </Alert> 
            </Box>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                
              </Grid>
            </Grid>
            
          </form>
        </div>
      </Grid>
    </Grid>
 
  );
}