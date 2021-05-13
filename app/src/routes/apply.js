import { Box, Button, CircularProgress, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PickedDate from "../components/pickedDate";
import SendIcon from '@material-ui/icons/Send';
import axios from "axios";
import Cookie from "universal-cookie";
import { Alert } from "@material-ui/lab";
import { useHistory } from "react-router";

function Apply(props){

    const cookie = new Cookie();


    const [dates, setDates] = useState([]);
    const [message, setMessage] = useState("");
    const [posted, didPost] = useState({
        started: false,
        finished: false
    });

    function handleDatePick(event){
        setDates((prevDates) => {
            return[
                ...prevDates, event.target.value
            ]
        })
    }
    console.log(dates);

    function handleDelClick(index){
        console.log("INDEX FOR DELETE : ", index);
        setDates(prevDates => prevDates.filter((date, currentIndex) => {
            if(currentIndex !== index){
                return date;
            }
        }))
    }


    
    function handleMessageChange(event){
        setMessage(event.target.value);
    }

    const [exists, setExists] = useState(false);

    function handleFormSubmit(event){
        event.preventDefault();
        didPost((prevPost) => {
            return{
                finished: false,
                started: true
            }
        })
        const url = "http://localhost:3001/job/apply";
        const token = cookie.get('token');
        const data = {
            dates: dates,
            message: message,
            id: props.id
        }

        axios.post(url, data, {headers: {'authorization' : `Bearer ${token}`}})
        .then((response) => {
            console.log(response);
            if(response.status === 200){
                didPost((prevStatus) => {
                    return{
                        started: false,
                        finished: true
                    }
                });
            }
            else if(response.status === 402){
                didPost((prevStatus) => {
                    return{
                        started: false,
                        finished: true
                    }
                })
                setExists(true);
            }
        })
        .catch(err => console.log(err));
    }

    const history = useHistory();

    useEffect(() => {
        if(posted.finished === true){
            setTimeout(() => history.push("/home/jobs"),3000)
        }

        return clearInterval()
            
        
            
        
    }, [posted])

    console.log(message);
    return(
        <Box width="100%" display="flex">
            <Box width="100%" m={3} mt={3}>
                <form onSubmit={handleFormSubmit}>
                <TextField required multiline rows={3} label="Message" variant="outlined" fullWidth onChange={handleMessageChange}></TextField>

                <Box mt={3}>
                    <TextField
                            name="deadline"
                            color="secondary"
                            id="date"
                            label="Available dates"
                            type="date"
                            onChange={handleDatePick}
                            InputLabelProps={{
                            shrink: true
                            }}
                    />

                </Box>
                <Box>
                    <PickedDate dates={dates} deletable={true} handleDeleteClick={handleDelClick}></PickedDate>
                </Box>
                <Box mt={1}>
                    <Button disabled={posted.started || posted.finished} type="submit" variant="contained" endIcon={<SendIcon></SendIcon>} color="primary">
                        <Typography>Apply</Typography>
                    </Button>
                </Box>
                <Box mt={1}>
                    {posted.started === true && <CircularProgress></CircularProgress>}
                    {(posted.finished === true && exists === false) && <Alert type="success"><Typography>Applied succesfully, redirecting to Jobs...</Typography></Alert>}
                    {(posted.finished === true && exists === true) && <Alert type="warning"><Typography>You have already applied for this job</Typography></Alert>}
                </Box>
                
                </form>
                
            </Box>
            

        </Box>
    )





}


export default Apply;