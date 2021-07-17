import Login from "./login"
import Register from "./register"
import UserContext from "./userContext";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link,
    useHistory
  } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";


import { Button, Box, Toolbar, AppBar, makeStyles, useTheme, Paper, Typography } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Header from './header';


import Find from "./routes/find";
import Messager from "./routes/messages";
import MyJobs from "./routes/myJobs";
import Myprofile from "./routes/myProfile";
import NewJob from "./routes/newJob";
import Job from "./routes/job";
import Cookies from "universal-cookie";
import Apply from "./routes/apply";
import Jobs from "./routes/jobs";
import Profile from "./routes/userProfile";
import SearchIcon from '@material-ui/icons/Search';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MessageIcon from '@material-ui/icons/Message';
import WorkIcon from '@material-ui/icons/Work';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SearchResult from "./routes/searchResult";






function App (){
    const cookies = new Cookies();
    const [user, setUsername] = useState({
        username: "",
        password: ""
    });

    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        streetAndNum: "",
        city: "",
        country: "",
        firstAndLastName: ""
    })

    
    const [isAuthenticated, setAuthentication] = useState(false);
    const [regError, setRegError] = useState("");
    const [logError, setLogError] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    

    const history = useHistory();
    

    function checkCookie(){
        const data=cookies.get('token');
        
        const url="http://localhost:3001/tajna";

        axios.get(url,{headers: {'authorization': `Bearer ${data}`}})
        .then((response) => {
            
            if(response.status === 200){
                setAuthentication(true);
                const user = response.data;
                setCurrentUser(user);
                console.log("CURRENT USER : ", currentUser);
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        checkCookie();
        console.log("Auth :",isAuthenticated);
    },[]);

    

    function handleChangeLogin(event){
        setUsername((prevUser) => {
            
            const {value, name} = event.target;

            if(event.target.name === "username"){
                return {
                    ...prevUser,
                    username: value
                }}
            else if(event.target.name === "password"){
                return {
                    ...prevUser,
                    password: value
                }
            }
            }
        );
    }

    function handleChangeRegister(event){
        const {value, name} = event.target;
        setNewUser((prevUser) => {
            

            if(name === "username"){
                return{
                    ...prevUser,
                    username: value
                }
            }
            else if(name === "password"){
                return{
                    ...prevUser,
                    password: value
                }
            }
            else if(name === "passwordConfirm"){
                return{
                    ...prevUser,
                    passwordConfirm: value
                }
            }

            else if(name === "streetAndNum"){
                return{
                    ...prevUser,
                    streetAndNum: value
                }
            }

            else if(name === "city"){
                return{
                    ...prevUser,
                    city: value
                }
            }

            else if(name === "country"){
                return{
                    ...prevUser,
                    country: value
                }
            }
            
            else if(name === "firstAndLastName"){
                return{
                    ...prevUser,
                    firstAndLastName: value
                }
            }
            
        })
        console.log(newUser);
        
    }

    function handleRegSubmit(event){

        console.log(newUser);
        const data = {
            username: newUser.username,
            password: newUser.password,
            streetAndNum: newUser.streetAndNum,
            city: newUser.city,
            country: newUser.country,
            firstAndLastName: newUser.firstAndLastName
        }

        console.log("Data prije slanje :",data);
        
        const url ="http://localhost:3001/register";


        if(newUser.password === newUser.passwordConfirm){
            axios.post(url, data, {headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                if(response.data === "User exists"){
                    setRegError("User already exists");
                }
                else if(response.data === "OK"){
                    
                    
                    setCurrentUser(data.username);
                    history.goBack()

                }
                
            
            })
            .catch((error) => {
                setRegError("Wrong address");
            });
        } else{
            setRegError("Passwords don't match");
        }


        event.preventDefault();
    }


    function handleLogInSubmit(event){
        
        const data = {
            username: user.username,
            password: user.password
        }

        const url = "http://localhost:3001/login";
        
        axios.post(url, data, {headers: {'Content-Type': 'application/json'}})
            .then((response) => {

                if(response.status === 200){
                    setAuthentication(true);
                    setCurrentUser(data.username);
                    const cookies = new Cookies();

                    cookies.set('token', response.data.token);
                    cookies.set('userCityX', response.data.userCoordinateX);
                    cookies.set('userCityY', response.data.userCoordinteY);   
                    

                }
                else if(response.status === 401){
                    
                }
            })
            .catch((error) => {
                setLogError("Wrong username or password");
            })
        
        
        
        
        
        event.preventDefault();

    }

    function handleLogOut(event){
        cookies.remove('token');
        cookies.remove('userCityX');
        cookies.remove('userCityY');
        setAuthentication(false);
    }

    const theme = useTheme();

    const useStyles = makeStyles(
        {
            sidebar:{
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                position: "fixed",
                width: "15%",
                [theme.breakpoints.down('sm')] : {
                    display: "none",
                    width: "0%"
                },
                backgroundColor: theme.palette.secondary.main
            },
            mainContainer: {
                [theme.breakpoints.down('sm')] : {
                    marginLeft: theme.spacing(1),
                    marginRight: theme.spacing(1),
                    width: "100%"
                },

                margin: theme.spacing(3),
                width: "95%"
            },
            icon: {
                width: "50px",
                height: "50px"
            }
        }
    )

    const classes = useStyles();

    const [navState, setNavState] = useState("");
    
    

    


    return(

        <UserContext.Provider value={currentUser}>
        <Router>
            <Switch>
                
                <Route path="/home">

                    {isAuthenticated === false ? <Redirect to="/" /> :


                        <Grid container>
                            
                            <Grid container item xs={12} md={12} direction="column">
                                <Grid item container>
                                    <Header handleLogOut={handleLogOut}/>
                                </Grid>


                                <Grid container item my={3}>
                                    <Grid  item xs={12} sm={2} >
                                        
                                            <Paper className={classes.sidebar} elevation={3} color="primary" square>
                                                <Link to="/home/find"><Button onClick={() => setNavState("find")} size="large" name="find" color={navState === "find" ? "primary" : "black"} variant={navState === "find" ? "contained" : "outlined"} fullWidth><Box><SearchIcon className={classes.icon}></SearchIcon><Typography>FIND A JOB</Typography></Box></Button></Link>
                                                <Link to="/home/post"><Button onClick={() => setNavState("post")} size="large" name="post" color={navState === "post" ? "primary" : "black"} variant={navState === "post" ? "contained" : "outlined"} fullWidth><Box><AddBoxIcon className={classes.icon}></AddBoxIcon><Typography>POST A JOB</Typography></Box></Button></Link>
                                                <Link to="/home/messages"><Button onClick={() => setNavState("messages")} size="large" name="messages" color={navState === "messages" ? "primary" : "black"} variant={navState === "messages" ? "contained" : "outlined"} fullWidth><Box><MessageIcon className={classes.icon}></MessageIcon><Typography>Messages</Typography></Box></Button></Link>
                                                <Link to="/home/jobs"><Button onClick={() => setNavState("jobs")} size="large" name="jobs" color={navState === "jobs" ? "primary" : "black"} variant={navState === "jobs" ? "contained" : "outlined"} fullWidth><Box><WorkIcon className={classes.icon}></WorkIcon><Typography>MY JOBS</Typography></Box></Button></Link>
                                                <Link to="/home/myprofile"><Button onClick={() => setNavState("myprofile")} size="large" name="myprofile" color={navState === "myprofile" ? "primary" : "black"} variant={navState === "myprofile" ? "contained" : "outlined"} fullWidth><Box><AccountBoxIcon className={classes.icon}></AccountBoxIcon><Typography>MY PROFILE</Typography></Box></Button></Link>
                                            </Paper>
                                        
                                    </Grid>


                                
                                    <Grid container item xs={12} sm={10}>
                                        
                                        
                                        <Box mt={2} width="inherit" className={classes.mainContainer}>
                                            
                                            <Switch>

                                                <Route path="/home/find">
                                                    <Find />
                                                </Route>

                                                <Route path="/home/post">
                                                    <NewJob />
                                                </Route>

                                                <Route path="/home/job/:id">
                                                    <Job />
                                                </Route>

                                                <Route path="/home/profile/:id">
                                                    <Profile></Profile>
                                                </Route>

                                                <Route path="/home/messages">
                                                    <Messager />
                                                </Route>

                                                <Route path="/home/myprofile">
                                                    <Myprofile />
                                                </Route>

                                                <Route path="/home/apply">
                                                    <Apply></Apply>
                                                </Route>

                                                <Route path="/home/jobs">
                                                    <Jobs></Jobs>
                                                </Route>

                                                <Route path="/home/search/:title/:category">
                                                    <SearchResult></SearchResult>
                                                </Route>

                                            </Switch>
                                            
                                        </Box>
                                        
                                        
                                    </Grid>
                                </Grid>
                                    
                            </Grid>
                            

                            
                        
                        </Grid>}
                </Route> 

                <Route path="/register">

                    {isAuthenticated ? <Redirect to="/home/find" /> : <Register  handleChangeRegister={handleChangeRegister} handleRegSubmit={handleRegSubmit} display={regError != "" ? "block" : "none"} regErrMessage={regError} /> }
        
                    
                    
                </Route>

            

                <Route path="/">

                    {isAuthenticated ? <Redirect to="/home/find"/> : <Login handleChange={handleChangeLogin} handleLogInSubmit={handleLogInSubmit} display={logError != "" ? "block" : "none"}/> }
                    
                    
                </Route>
            
                


            </Switch>
            
        </Router>
        </UserContext.Provider>
    )
}


export default App