import { AppBar, Avatar, Toolbar, Box, Button, IconButton, Select, Input, MenuItem, InputLabel, TextField } from "@material-ui/core";

import {makeStyles} from "@material-ui/styles";

import theme from "./theme";
import logo from "./static/drawing2.svg";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useContext, useEffect, useRef, useState } from "react";
import UserContext from "./userContext";
import axios from "axios";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";
import SearchIcon from '@material-ui/icons/Search';





function Header(props){


    const useStyles = makeStyles({
        typographySyles: {
          
        },
        avatarStyoes: {
            width:100,
            height:100,
            [theme.breakpoints.down('sm')]: {
                display: "none"
            }
        },
    
        toolbarStyle: {
            display: 'flex',
            flexDirection: 'row',
            color: theme.palette.primary.dark,
            justifyContent: 'space-between',
            alignItems:"center",
            
    
        },
    
        iconStyle:{
            alignSelf: "center"
        },
    
        logoStyle:{
            width: "100%",
            height: "auto",
            /* [theme.breakpoints.down('sm')] : {
                width: "60%"
            }, */
            marginLeft: theme.spacing(2)
        },
    
        logoContainer:{
            [theme.breakpoints.down('sm')] : {
                width: "100px"
            }
        },
    
        logOutFull: {
            [theme.breakpoints.down('sm')] : {
                display: "none"
            }
        },
    
        logOutSmall: {
            display: "none",
            [theme.breakpoints.down('sm')] : {
                display: "block",
            }
        },
    
        hamburgerIcon: {
            display: "none",
            [theme.breakpoints.down('sm')] : {
                display: "block"
            }
        },

        fakeDiv : {
            height: "132px",
            width: "100%",
            [theme.breakpoints.down('sm')] : {
                height: "80px"
            }
        },

        appBarForm: {
            display:"flex",
            justifyContent: "center",
            alignItems: "center"
        },

        formWraper: {
            display: "flex"
        },

        searchForm: {
            marginLeft: theme.spacing(4),
            [theme.breakpoints.down('sm')] : {
                display: "none"
            }
        },
        category: {
            
            marginLeft: theme.spacing(2)
        }
    
        
    })

    const classes = useStyles();
    const username = useContext(UserContext);
    const [avatSrc, setAvat] = useState("");
    const [height, setHeight] = useState(0);

    const toolbarHeight = useRef(null)
    
    

    useEffect(() => {
        const url = "http://localhost:3001/avatar/" + username;
        axios.get(url)
        .then((response) => {
            setAvat(response.data);
        })
        .catch(err => console.log(err));
    },[username])

    useEffect(() => {
        setHeight(toolbarHeight.current.clientHeight);
    }, [])
    
    
    const [drawer, openDrawer] = useState(false);
    console.log(drawer);

        

    return(
        <Box>
            <AppBar position="fixed">
                
                <Toolbar className={classes.toolbarStyle} innerRef={toolbarHeight}>
                    
                        <Box my={2} className={classes.formWraper}>
                            <Avatar src={avatSrc} className={classes.avatarStyoes}></Avatar>
                            <IconButton className={classes.hamburgerIcon} onClick={() => openDrawer(!drawer)}><MenuIcon></MenuIcon></IconButton>
                            <Box className={classes.appBarForm}>
                                <TextField className={classes.searchForm} variant="outlined" color="secondary" placeholder="Search for jobs" endAdornment={
                                    <IconButton><SearchIcon></SearchIcon></IconButton>
                                }></TextField>
                                
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                color="secondary"
                                required
                                name="category"
                                defaultValue="Any"
                                className={classes.category}
                                >
                                    <MenuItem value={"Any"}>Any</MenuItem>
                                    <MenuItem value={"Digital"}>Digital</MenuItem>
                                    <MenuItem value={"Hard Labour"}>Hard Labour</MenuItem>
                                    <MenuItem value={"Cleaning"}>Cleaning</MenuItem>
                                    <MenuItem value={"Gardening"}>Gardening</MenuItem>
                                    <MenuItem value={"Driving"}>Driving</MenuItem>
                                    <MenuItem value={"Teaching"}>Teaching</MenuItem>
                                    <MenuItem value={"Furniture moving"}>Furniture moving</MenuItem>
                                    <MenuItem value={"Furniture building"}>Furniture Building</MenuItem>
                                    <MenuItem value={"Machine fixing"}>Machine fixing</MenuItem>
                                    <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                                </Select>

                                <Button className={classes.category} variant="contained" color="secondary" endIcon={<SearchIcon></SearchIcon>}>Search</Button>
                            </Box>
                        </Box>
                        <Box p={1} mx={2} className={classes.logoContainer}>
                            <img alt="helper logo" src={logo} className={classes.logoStyle}/>
                            
                        </Box>
                        {/* <Box>
                            <NotificationsIcon className={classes.iconStyle} />
                        </Box> */}
                        <Box>
                            <Button color="secondary" variant="contained" onClick={props.handleLogOut} endIcon={<ExitToAppIcon></ExitToAppIcon>} className={classes.logOutFull}>LOG OUT</Button>
                            <IconButton className={classes.logOutSmall}><ExitToAppIcon></ExitToAppIcon></IconButton>
                        </Box>
                    
                </Toolbar>
                
                
            </AppBar>
            <Box className={classes.fakeDiv}>
                
            </Box>
        </Box>
        
       
    )
}

export default Header;