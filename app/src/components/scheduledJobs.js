import { Box } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookie from "universal-cookie";
import MyJobCard from "./myJobCard";


function ScheduledJobs(){

    const cookies = new Cookie();
    const [jobData, setJobData] = useState([]);

    useEffect(() => {
        
        const token = cookies.get('token');
        const url = "http://localhost:3001/myScheduledJobs";
        axios.get(url, {headers: {'authorization' : `Bearer ${token}`}})
        .then((response) => {
            console.log(response.data)
            setJobData(response.data);

        })
        .catch(err => console.log(err));

    }, [])


    return(
        <Box>
            {jobData.map((job) => <MyJobCard  worker={job.worker} isScheduled={true} imgSrc={job.imgSrc} budget={job.budget + "€"} description={job.description} title={job.title} category={job.category} deadline={job.deadline} jobId={job._id}></MyJobCard>)}
        </Box>
    )


}


export default ScheduledJobs