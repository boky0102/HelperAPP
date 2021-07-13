import { Box, makeStyles, Typography, useTheme } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookie from "universal-cookie";
import MyJobCard from "./myJobCard";


function ScheduledJobs(){

    const cookies = new Cookie();
    const [jobData, setJobData] = useState([]);
    const [appliedJobs, setAppliedJobs ] = useState([]);

    useEffect(() => {
        
        const token = cookies.get('token');
        const url = "http://localhost:3001/myScheduledJobs";
        axios.get(url, {headers: {'authorization' : `Bearer ${token}`}})
        .then((response) => {
            setJobData(response.data);

        })
        .catch(err => console.log(err));

    }, [])

    useEffect(() => {
        
        const token = cookies.get('token')
        const url = "http://localhost:3001/appliedScheduled"
        axios.get(url, {headers: {'authorization' : `Bearer ${token}`}})
        .then((response) => {
            console.log("SCHEDULED RES", response.data);
            setAppliedJobs(response.data);
        })
        .catch(err => console.log(err));

    }, [])

    const theme = useTheme();

    const useStyles = makeStyles(
        {
            divider:{
                width: "100%",
                height: "1px",
                backgroundColor: "grey",
                marginBottom: theme.spacing(2)
            },
            dividerText: {
                marginTop: theme.spacing(2)
            }
        }
    )

    const classes = useStyles();


    return(
        <Box>
            
            <Typography className={classes.dividerText}>My scheduled jobs</Typography>
            <div className={classes.divider}></div>
            <Box>
                {jobData.map((job) => <MyJobCard  worker={job.worker} isScheduled={true} imgSrc={job.imgSrc} budget={job.budget + "€"} description={job.description} title={job.title} category={job.category} deadline={job.deadline} jobId={job._id}></MyJobCard>)}
            </Box>
            
            <Typography className={classes.dividerText}>Scheduled jobs applied to</Typography>
            <div className={classes.divider}></div>
            <Box>
                { appliedJobs.map((job) => <MyJobCard  worker={job.worker} isScheduled={true} imgSrc={job.imgSrc} budget={job.budget + "€"} description={job.description} title={job.title} category={job.category} deadline={job.deadline} jobId={job._id} applied={true} workProvider={job.username}></MyJobCard>) }
            </Box>
        </Box>
    )


}


export default ScheduledJobs