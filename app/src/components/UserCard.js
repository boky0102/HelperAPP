import { Avatar, Box, Button, Card, makeStyles, TextField, Typography, useTheme, IconButton } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import SendIcon from '@material-ui/icons/Send';
import PhoneIcon from '@material-ui/icons/Phone';
import axios from "axios";
import Cookie from "universal-cookie";
import { Alert, Rating } from "@material-ui/lab";
import { useHistory } from "react-router"

function UserCard(props){
    const cookies = new Cookie();
    const theme = useTheme();

    console.log("Worker: ", props.worker);

    const [workerData, setWorkerData] = useState({});

    const [jobCompleted, setJobCompleted] = useState(false);

    useEffect(() => {
        const url="http://localhost:3001/userData/" + props.worker;
        const token = cookies.get('token');
        axios.get(url, {headers : {'authorization' : `Bearer ${token}`}})
        .then((response) => {
            console.log(response);
            setWorkerData(response.data);
        })
        .catch(err => console.log(err));
    }, [])

    const useStyles = makeStyles(
        {
            avatStyle:{
                width: "100px",
                height: "100px"
            },
            cardStyle:{
                [theme.breakpoints.down('sm')] : {
                    flexDirection: "column"
                }
            },
            formStyle:{
                margin: "0px",
                padding: "0px"
            },
            buttonDone:{
                backgroundColor: theme.palette.primary.dark
            }
            
        }
    )

    const [messageClicked, setMessageClicked] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState({
        started: false,
        finished: false
    });
    const [review, setReview] = useState("");
    const [ratingValue, setRating] = useState(0);

    const [finishedClick, setFinishedClick] = useState(false);
    const [alert, setAlert] = useState("");

    function handleMessageClick(event){
        setMessageClicked(!messageClicked);
        setFinishedClick(false);
    }

    function handleMessageSent(event){
        event.preventDefault();
        const url="http://localhost:3001/message";
        const token = cookies.get('token');
        const data = {
            reciever: props.worker,
            message: message
        }
        axios.post(url, data, {headers : {'authorization' : `Bearer ${token}`}})
        .then((response) => {
            console.log(response);
            setLoading({
                finished: true,
                started: false
            })
        })
        .catch(err => console.log(err));
    }

    function handleMessageChange(event){
        setMessage(event.target.value);
    }

    function handleCompletedClick(){
        setFinishedClick(true);
        setMessageClicked(false);

    }

    function handleReviewChange(event){
        setReview(event.target.value);
        setAlert("");
    }

    const history = useHistory();

    function handleReviewSubmit(event){
        event.preventDefault();
        if(ratingValue !== 0){
            const url = "http://localhost:3001/jobfinished";
            const token = cookies.get('token');
            const data = {
                reviewMessage: review,
                worker: props.worker,
                rating: ratingValue,
                jobId: props.jobId
            }
            axios.post(url, data, {headers: {'authorization' : `Bearer ${token}`}})
            .then((response) => {
                if(response.status === 200){
                    setJobCompleted(true);
                    setTimeout(() => {
                        history.push("/home/find");
                    }, 3000)
                }
            })
            .catch(err => console.log(err));


        }
        else{
            setAlert("Please choose rating");
        }
        
    }

    function handleRatingChange(event, newValue){
        setRating(newValue);
    }

    const classes = useStyles();

    if(props.isPublic === false){
        return(
            <Box>
                <Card>
                    <Box width="100%" display="flex" flexDirection="row">
                        <Box display="flex" flexDirection="row" className={classes.cardStyle} width="100%">                
                            <Box  m={2} alignSelf="center">
                                <Avatar className={classes.avatStyle} src={"http://localhost:3001/" + workerData.avatar}>

                                </Avatar>
                            </Box>
                            <Box display="flex" width="100%" className={classes.cardStyle}  flexDirection="row" justifyContent="space-around">
                                <Box alignSelf="center" display="flex" justifyContent="center" flexDirection={"column"}>
                                    <Typography align="center">{workerData.firstAndLastName}</Typography>
                                    <Button alignSelf="center" variant="outlined" color="secondary" onClick={handleMessageClick}><Typography>Message</Typography></Button>
                                </Box>
                                <Box alignSelf="center" mt={1} display="flex">
                                    <PhoneIcon></PhoneIcon>
                                    <Typography>{workerData.phonePref + " "} {workerData.phonePost}</Typography>
                                </Box>
                                <Box alignSelf="center" my={1}>
                                    <Button variant="contained" onClick={handleCompletedClick} className={classes.buttonDone}>COMPLETED ?</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {messageClicked && 
                    <Box width="100%" display="flex" justifyContent="center">
                        <Box width="100%" ml={2} mr={2} mb={2}>
                            <form className={classes.formStyle} onSubmit={handleMessageSent}>
                                <TextField required onChange={handleMessageChange} label="Send a message" multiline rows="3" fullWidth variant="outlined" InputProps={{endAdornment:
                                    <IconButton type="submit">
                                    <SendIcon></SendIcon>
                                    </IconButton>}}></TextField>
                            </form>
                        </Box>
                    </Box>
                    }
                    {(loading.started === false && loading.finished === true) && <Alert type="success">Message sent successfully</Alert>}

                    {finishedClick &&
                         <Box width="100%" display="flex" justifyContent="center">
                         <Box width="100%" ml={2} mr={2} mb={2}>
                             <form className={classes.formStyle} onSubmit={handleReviewSubmit}>
                                 <TextField required onChange={handleReviewChange} label="Write a review" multiline rows="3" fullWidth variant="outlined" InputProps={{endAdornment:
                                     <IconButton type="submit">
                                     <SendIcon></SendIcon>
                                     </IconButton>}}></TextField>
                                <Box mt={1} mb={1} display="flex">
                                    <Typography>Rating :</Typography>
                                    <Rating value={ratingValue} onChange={handleRatingChange}></Rating>
                                </Box>
                                <Box>
                                    {alert !== "" && <Alert severity="error">{alert}</Alert>}
                                    {jobCompleted && <Alert severity="success">Review posted successfully, redirecting ...</Alert>}
                                </Box>
                             </form>
                         </Box>
                     </Box>
                    }

                </Card>
            </Box>
        )

    }
    

}


export default UserCard