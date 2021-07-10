import { Box, makeStyles, useTheme, Avatar, Typography, Card, TextField, IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router'
import Cookies from 'universal-cookie'

import Rating from '../components/rating';
import Review from '../components/review';


function Profile(){


    const { id } = useParams()
    const cookie = new Cookies();

    const [userData, setUserData] = useState({});


    useEffect(() => {

        const url = "http://localhost:3001/profileInfo/" + id;
        const token = cookie.get('token');

        axios.get(url, {headers: {'authorization': `Bearer ${token}`}})
        .then((response) => {
            setUserData(response.data);
        })
        .catch(err => console.log(err))

    }, [])

    console.log(userData);

    const theme = useTheme();
    const useStyles = makeStyles(
        {

            mainWrap: {
                display: "flex",
                flexDirection: "column",
                width: "100%"
            },

            profileWrap: {
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-around"
            },

            nameAndRating: {
                display: "flex"
            },

            reviewsWrap: {
                width: "100%",
                height: "500px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            },
            profileInfo: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: theme.spacing(3),
                width: "50%"
            },
            avatarContainer:{
                width: "40%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            },
            avatar: {
                width: "200px",
                height: "200px",
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(3)
            },
            inputMessage: {
                width: "100%",
                height: "100%",
                
            },
            inputContainer: {
                width: "100%",
                flexGrow: 2
            },
            infoItem: {
                flexGrow: 1
            }
            
        }
    )

    const classes = useStyles();


    function calculateAverageRating(userData){
        let ratingSum = 0;
        if(userData.reviews !== undefined){
            userData.reviews.forEach((review) => {
                ratingSum += review.rating
            })
        }
        

        if(ratingSum > 0){
            return ratingSum/userData.reviews.length;
        }
        else{
            return 0;
        }
    }
    


    return(
        <Card className={classes.mainWrap}>
            <Box className={classes.profileWrap}>
                <Box className={classes.avatarContainer}>
                    <Avatar className={classes.avatar} src={"http://localhost:3001/" + userData.avatarSrc}>

                    </Avatar>
                </Box>
                <Box className={classes.profileInfo}>
                    <Box className={classes.nameAndRating}>
                        <Typography className={classes.infoItem}>{userData.name}</Typography>
                        <Rating rating={userData.reviews !== undefined && calculateAverageRating(userData)}></Rating>
                    </Box>
                    
                    <Typography className={classes.infoItem}>Location: {userData.city}, {userData.country}</Typography>
                    <Typography className={classes.infoItem}>Jobs completed: {userData.jobsCompleted}</Typography>
                    <Box className={classes.inputContainer}>
                        <TextField className={classes.inputMessage} placeholder={"Send message"} multiline rows="2" variant="outlined" 
                        InputProps={{endAdornment:
                        <IconButton type="submit">
                          <SendIcon></SendIcon>
                        </IconButton>}}></TextField>
                    </Box>
                    
                </Box>
            </Box>
            <Box className={classes.reviewsWrap}>
                {
                    userData.reviews !== undefined && userData.reviews.map((review) => 
                        
                        <Review name={review.reviewer} rating={review.rating} description={review.note}></Review>
                        
                    )
                }
            </Box>
        </Card>
    )
}



export default Profile