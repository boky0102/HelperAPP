import { AppBar, Avatar, Toolbar, Box, Button, IconButton } from "@material-ui/core";

import {makeStyles} from "@material-ui/styles";

import theme from "./theme";
import logo from "./static/drawing2.svg";
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useContext, useEffect, useRef, useState, useLayoutEffect } from "react";
import UserContext from "./userContext";
import axios from "axios";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import React from "react";





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
    
    console.log(height);

    return(
        <Box>
            <AppBar position="fixed">
                
                <Toolbar className={classes.toolbarStyle} innerRef={toolbarHeight}>
                    
                        <Box my={2}>
                            <Avatar src={avatSrc} className={classes.avatarStyoes}></Avatar>
                            <IconButton className={classes.hamburgerIcon}><MenuIcon></MenuIcon></IconButton>
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