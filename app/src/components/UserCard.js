import { Avatar, Box, Button, Card, makeStyles, TextField, Typography, useTheme, IconButton, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";
import SendIcon from '@material-ui/icons/Send';
import PhoneIcon from '@material-ui/icons/Phone';
import axios from "axios";
import Cookie from "universal-cookie";
import { Alert } from "@material-ui/lab";

function UserCard(props){
    const cookies = new Cookie();
    const theme = useTheme();

    console.log("Worker: ", props.worker);

    const [workerData, setWorkerData] = useState({});

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
            }
            
        }
    )

    const [messageClicked, setMessageClicked] = useState(false);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState({
        started: false,
        finished: false
    });

    function handleMessageClick(event){
        setMessageClicked(!messageClicked);
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
                                <Box alignSelf="center" mt={1}>
                                    <Typography>{workerData.firstAndLastName}</Typography>
                                </Box>
                                <Box alignSelf="center" mt={1} display="flex">
                                    <PhoneIcon></PhoneIcon>
                                    <Typography>{workerData.phonePref + " "} {workerData.phonePost}</Typography>
                                </Box>
                                <Box alignSelf="center" my={1}>
                                    <Button variant="outlined" color="secondary" onClick={handleMessageClick}><Typography>Message</Typography></Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    {messageClicked && 
                    <Box width="100%" display="flex" justifyContent="center">
                        <Box width="100%" ml={2} mr={2} mb={2}>
                            <form className={classes.formStyle} onSubmit={handleMessageSent}>
                                <TextField required onChange={handleMessageChange} multiline rows="3" fullWidth variant="outlined" InputProps={{endAdornment:
                                    <IconButton type="submit">
                                    <SendIcon></SendIcon>
                                    </IconButton>}}></TextField>
                            </form>
                        </Box>
                    </Box>
                    }
                    {(loading.started === false && loading.finished === true) && <Alert type="success">Message sent successfully</Alert>}

                </Card>
            </Box>
        )

    }
    

}


export default UserCard