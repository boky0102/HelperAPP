import { Avatar, Box, Card, Icon, IconButton, makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PickedDate from "./pickedDate";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import axios from "axios";
import Cookie from "universal-cookie";


function Application(props){

    const theme = useTheme();

    const useStyles = makeStyles(
        {
            avatStyle:{
                width: "150px",
                height: "150px"
            },
            mainCardStyle:{
                [theme.breakpoints.down('sm')] :{
                    flexDirection: "column"
                }
            },

            succesButton:{
                color: "green"
            },

            deleteButton:{
                color: "red"
            },

            buttonBox:{
                alignSelf: "center"
            },

            avatarBox:{
                [theme.breakpoints.down('sm')] :{
                    alignSelf: "center"
                }
            }
        }
    )

    const [avatSrc, setAvatSrc] = useState("");

    const prettyDate = new Date(props.dateApplied);

    console.log(prettyDate.getUTCDate());
    

    useEffect(() => {
        
        const url = "http://localhost:3001/avatar/" + props.username;
        axios.get(url)
        .then((response) => {
            setAvatSrc(response.data)
        })
        .catch(err => console.log(err));

    }, [])

    const cookies = new Cookie();

    function handleAcceptClick(){

        const url = "http://localhost:3001/jobs/accepted";
        const token = cookies.get('token');
        const data = {
            user: props.username,
            jobId: props.jobId
        }
        axios.post( url ,data, {headers:{'authorization' : `Bearer ${token}`}})
        .then((response) => {
            console.log(response);
            props.rerender((prevJobs) => {
                prevJobs.filter((job) => {
                    if(job.id !== props.jobId){
                        return job
                    }
                })
            })
        })
        .catch(err => console.log(err))

    }

    function handleCancelClick(){

    }

    

    const classes = useStyles();

    return(
        <Card>
            <Box display="flex" flexDirection="row" className={classes.mainCardStyle}>
                <Box mt={2} ml={2} mr={2} display="flex" flexDirection="column">
                    <Box className={classes.avatarBox}>
                        <Avatar src={avatSrc} className={classes.avatStyle}></Avatar>
                    </Box>
                    <Box className={classes.buttonBox}>
                        <IconButton onClick={handleAcceptClick} className={classes.succesButton}><CheckCircleIcon></CheckCircleIcon></IconButton>
                        <IconButton onClick={handleCancelClick} className={classes.deleteButton}><CancelIcon></CancelIcon></IconButton>
                    </Box>
                    
                </Box>
                <Box width="100%"  display="flex" flexDirection="column" m={2}>
                    <Box  width="inherit" display="flex" flexDirection="row" justifyContent="space-between">
                        <Typography>Borna Ivankovic</Typography>
                        <Typography>Date applied :{prettyDate.toDateString()}</Typography>
                    </Box>
                    <Box mt={2} mr={2}>
                        <Typography>
                            {props.message}
                        </Typography>
                    </Box>
                    <Box mt={2}>
                        <Typography>Avalaible dates :</Typography>
                        <PickedDate dates={props.dates} deletable={false}></PickedDate>
                    </Box>
                </Box>
            </Box>
        </Card>
    )


}


export default Application