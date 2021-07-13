import React, { useEffect, useState } from "react";
import { Avatar, Box, Card,  makeStyles, Typography, useTheme, Button, Icon, IconButton } from "@material-ui/core"
import Cookies from "universal-cookie";
import axios from "axios";
import { useHistory } from "react-router";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import viber from '../static/icons/viber.svg';

function UserBigCard(props){

    const theme = useTheme();
    const useStyles = makeStyles(
        {
            wraper : {
                width: "100%",
                height: "200px",
                display: "flex",
                [theme.breakpoints.down('sm')] : {
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "auto"
                }
            },
            leftSideContainer: {
                width: "30%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                [theme.breakpoints.down('sm')] : {
                    marginBottom: theme.spacing(4)
                }
            },
            avatar:{
                width: "100px",
                height: "100px",
                [theme.breakpoints.down('sm')] : {
                    marginTop: theme.spacing(2)
                }
            },
            rightSideContainer: {
                width: "70%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            },
            addressContainer: {
                display: "flex",
                marginBottom: theme.spacing(2)
            },
            icon: {
                marginRight: theme.spacing(2)
            },
            contactIcons: {
                display: "flex"
            }

        }
    )

    const cookies = new Cookies();
    
    const [profileData, setProfileData] = useState({});

    useEffect(() => {

        const url = "http://localhost:3001/userData/" + props.workProvider;
        const token = cookies.get('token');

        axios.get(url, {headers: {'authorization' : `Bearer ${token}`}})
        .then((response) => {
            console.log(response.data);
            setProfileData(response.data);
        })
        .catch(err => console.log(err));

    }, [])

    const classes = useStyles();
    const history = useHistory();

    return(
        <Box>
            <Card>
                <Box className={classes.wraper}>
                    <Box className={classes.leftSideContainer}>
                        <Avatar className={classes.avatar} src={"http://localhost:3001/" + profileData.avatar} ></Avatar>
                        <Typography>{profileData.firstAndLastName}</Typography>
                        <Button variant="outlined" color="secondary" onClick={() => history.push("/home/profile/"+ props.workProvider)} endIcon={<AccountBoxIcon></AccountBoxIcon>}>Profile</Button>
                    </Box>
                    <Box className={classes.rightSideContainer}>
                        <Box className={classes.addressContainer}>
                            <Icon className={classes.icon} color="secondary"><HomeIcon></HomeIcon></Icon>
                            <Typography>{profileData.streetAndNum}, {profileData.city}, {profileData.country}</Typography>
                        </Box>
                        <Box className={classes.addressContainer}>
                            <Icon className={classes.icon} color="secondary"><PhoneIcon></PhoneIcon></Icon>
                            <Typography>{"+" + profileData.phonePref + profileData.phonePost}</Typography>
                        </Box>
                        <Box className={classes.contactIcons}>
                            { profileData.whatsapp === true && <a href={"https://wa.me/"+ profileData.phonePref + profileData.phonePost}><IconButton color="secondary"><WhatsAppIcon color="green"></WhatsAppIcon></IconButton></a> }
                            { profileData.facebook !== false && <a href={profileData.facebookURL} target={profileData.facebookURL}><IconButton color="secondary"><FacebookIcon></FacebookIcon></IconButton></a> }
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default UserBigCard;