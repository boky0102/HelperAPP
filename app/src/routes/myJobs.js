import { Box, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookie from "universal-cookie";
import MyJobCard from "../components/myJobCard";

function MyJobs(){

    const cookie = new Cookie();

    const [myJobsData, setMyJobsData] = useState([]);
    
    useEffect(() => {
        const url = "http://localhost:3001/myjobs";
        const token = cookie.get('token');

        axios.get(url, {headers: {'authorization' : `Bearer ${token}`}})
        .then((response) => {
            setMyJobsData(response.data);
        })
        .catch(err => console.log(err));
    }, [])
    
    
    return(
        <div>
            {myJobsData !== undefined && myJobsData.map((job) => {
                return(
                    <Grid item container xs={12} md={12} direction="column">
                        <MyJobCard applications={job.applications} rerender={setMyJobsData} imgSrc={job.imgSrc} budget={job.budget + "€"} description={job.description} title={job.title} category={job.category} deadline={job.deadline} jobId={job._id} isPublic={false}></MyJobCard>
                    </Grid>
                )
            })}
        </div>
    )
        

    
}


export default MyJobs



