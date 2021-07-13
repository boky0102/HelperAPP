import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import MyJobCard from "../components/myJobCard";
import { Box } from "@material-ui/core";

function AppliedJobs(){

    const cookies = new Cookies();
    const [jobsData, setJobsData] = useState([]);

    useEffect(() => {

        const url = "http://localhost:3001/myapplied"
        const token = cookies.get('token');

        axios.get(url, {headers : {'authorization' : `Bearer ${token}`}})
        .then((response) => {
            setJobsData(response.data);
        })
        .catch(err => console.log(err));

    }, [])

    return(
        <Box>
            {
            (jobsData !== undefined && jobsData.length > 0) &&
                jobsData.map((job) => 
                    <MyJobCard id={job._id} title={job.title} distance={job.distance} imgSrc={job.imgSrc} description={job.description.substring(0,150)+"..."} budget={job.budget + "€"} category={job.category} deadline={job.deadline} isPublic={true} />
                )
            }
        </Box>    
        
    )
}

export default AppliedJobs;