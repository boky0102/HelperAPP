import Login from "./login"
import Register from "./register"
import UserContext from "./userContext";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { useState } from "react";

import axios from "axios";


import { Button, Box } from '@material-ui/core';

import Grid from '@material-ui/core/Grid';
import Header from './header';


import Find from "./routes/find";
import Messager from "./routes/messages";
import MyJobs from "./routes/myJobs";
import Myprofile from "./routes/myProfile";
import NewJob from "./routes/newJob";
import Job from "./routes/job";
import Cookies from "universal-cookie";





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
        country: ""
    })

    
    const [isAuthenticated, setAuthentication] = useState(false);
    const [regError, setRegError] = useState("");
    const [logError, setLogError] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [currentPage, setCurrentPage] = useState("/home");
    

    function checkCookie(){
        const data=cookies.get('token');
        
        const url="http://localhost:3001/tajna";

        axios.get(url,{headers: {'authorization': `Bearer ${data}`}})
        .then((response) => {
            console.log(response);
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

    checkCookie();

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
            
        })
    }

    function handleRegSubmit(event){

        const data = {
            username: newUser.username,
            password: newUser.password,
            streetAndNum: newUser.streetAndNum,
            city: newUser.city,
            country: newUser.country
        }
        
        const url ="http://localhost:3001/register";


        if(newUser.password === newUser.passwordConfirm){
            axios.post(url, data, {headers: {'Content-Type': 'application/json'}})
            .then((response) => {
                if(response.data === "User exists"){
                    setRegError("User already exists");
                }
                else if(response.data === "OK"){
                    
                    setAuthentication(true);

                }
            
            })
            .catch((error) => {
                console.log(error);
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
                    const cookies = new Cookies();

                    cookies.set('token', response.data.token);
                    
                    

                }
                else if(response.data === "WRONG"){
                    setLogError("Wrong username or password");
                }
            })
            .catch((error) => {
                console.log(error);
            })
        
        
        
        
        
        event.preventDefault();

    }

    function handleFindClick(){
        setCurrentPage("find");
    }

    function handleNewJobClick(){
        setCurrentPage("newJob");
    }

    function handleMessageClick(){
        setCurrentPage("messages");
    }

    function handleMyJobsClick(){
        setCurrentPage("myJobs");
    }
    
    function handleMyProfileClick(){
        setCurrentPage("myProfile");
    }

    function handleJobClick(){
        setCurrentPage("job");
    }

    function pageSwitch(page){
        switch(page){
            case "find":
                return <Find/>
                break;
            case "newJob":
                return <NewJob/>
                break;
            case "messages":
                return <Messager/>
                break;
            case "myJobs":
                return <MyJobs/>
                break;
            case "myProfile":
                return <Myprofile/>
                break;
            case "job":
                return <Job />
                break;
        }

    }

    console.log("Auth :",isAuthenticated);
    
   


    return(

        <UserContext.Provider value={currentUser}>
        <Router>
            <Switch>
                
                <Route path="/home">

                    {isAuthenticated === false ? <Redirect to="/" /> :


            <Grid container>
                <Grid item sm={2}></Grid>
                <Grid item xs={12} md={8} container direction="column">
                    <Header/>


                    <Grid container my={3}>
                        <Grid  item xs={12} sm={4}>
                            <Button onClick={handleFindClick} size="large" color="secondary" fullWidth>FIND JOB</Button>
                            <Button onClick={handleNewJobClick} size="large" color="secondary" fullWidth>POST JOB</Button>
                            <Button onClick={handleMessageClick} size="large" color="secondary" fullWidth>MESSAGES</Button>
                            <Button onClick={handleMyJobsClick} size="large" color="secondary" fullWidth>MY JOBS</Button>
                            <Button onClick={handleMyProfileClick} size="large" color="secondary" fullWidth>MY PROFILE</Button>
                        </Grid>


                       
                        <Grid container item xs={12} sm={8}><Box p={1}>
                        
                        {pageSwitch(currentPage)}
                           </Box>
                        </Grid>
                    </Grid>
                        
                </Grid>
                <Grid item  sm={2}></Grid>

                
            
            </Grid>}
                </Route> 

                <Route path="/register">

                    {isAuthenticated ? <Redirect to={currentPage} /> : <Register  handleChangeRegister={handleChangeRegister} handleRegSubmit={handleRegSubmit} display={regError != "" ? "block" : "none"} regErrMessage={regError} /> }
        
                    
                    
                </Route>

                


                <Route path="/">

                    {isAuthenticated ? <Redirect to={currentPage}/> : <Login handleChange={handleChangeLogin} handleLogInSubmit={handleLogInSubmit} display={logError != "" ? "block" : "none"}/> }
                    
                    
                </Route>
            
                


            </Switch>
            
        </Router>
        </UserContext.Provider>
    )
}


export default App