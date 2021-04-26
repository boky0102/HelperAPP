import Login from "./login"
import Register from "./register"
import UserContext from "./userContext";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
import { useEffect, useState } from "react";

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
        country: "",
        firstAndLastName: ""
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
                    
                    setAuthentication(true);
                    setCurrentUser(data.username);

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
        setAuthentication(false);
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

    
    
   


    return(

        <UserContext.Provider value={currentUser}>
        <Router>
            <Switch>
                
                <Route path="/home">

                    {isAuthenticated === false ? <Redirect to="/" /> :


                        <Grid container>
                            <Grid item sm={2}></Grid>
                            <Grid container item xs={12} md={8} container direction="column">
                                <Grid item container>
                                    <Header handleLogOut={handleLogOut}/>
                                </Grid>


                                <Grid container item my={3}>
                                    <Grid  item xs={12} sm={4} >
                                        <Link to="/home/find"><Button size="large" color="secondary" fullWidth>FIND JOB</Button></Link>
                                        <Link to="/home/post"><Button size="large" color="secondary" fullWidth>POST JOB</Button></Link>
                                        <Link to="/home/messages"><Button size="large" color="secondary" fullWidth>MESSAGES</Button></Link>
                                        <Link to="/home/myjobs"><Button size="large" color="secondary" fullWidth>MY JOBS</Button></Link>
                                        <Link to="/home/myprofile"><Button size="large" color="secondary" fullWidth>MY PROFILE</Button></Link>
                                    </Grid>


                                
                                    <Grid container item xs={12} sm={8}>
                                        <Box p={1} width="inherit">
                                            
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

                                                <Route path="/home/messages">
                                                    <Messager />
                                                </Route>

                                            </Switch>
                                        </Box>
                                    </Grid>
                                </Grid>
                                    
                            </Grid>
                            <Grid item  sm={2}></Grid>

                            
                        
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