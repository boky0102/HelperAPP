import { Box, Typography } from "@material-ui/core";
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


    return(
        <Box>
            <Typography>My scheduled jobs</Typography>
            <Box>
                {jobData.map((job) => <MyJobCard  worker={job.worker} isScheduled={true} imgSrc={job.imgSrc} budget={job.budget + "€"} description={job.description} title={job.title} category={job.category} deadline={job.deadline} jobId={job._id}></MyJobCard>)}
            </Box>
            <Typography>Scheduled jobs I applied to</Typography>
            <Box>
                { appliedJobs.map((job) => <MyJobCard  worker={job.worker} isScheduled={true} imgSrc={job.imgSrc} budget={job.budget + "€"} description={job.description} title={job.title} category={job.category} deadline={job.deadline} jobId={job._id}></MyJobCard>) }
            </Box>
        </Box>
    )


}


export default ScheduledJobs