import { Box, Grid, makeStyles, Typography, Button, ThemeProvider, useTheme } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Cookie from "universal-cookie";
import MyJobCard from "../components/myJobCard";
import workerIcon from "../static/worker.svg";

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

    console.log("MYJOB DATA :", myJobsData);
    const theme = useTheme();

    const useStyles = makeStyles(
        {
            workerIconStyle: {
                height: "100px",
                width: "100px"
            },
            mainWrap:{
                width: "100%",
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            },
            container:{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            },
            infoWrap:{
                marginLeft: theme.spacing(2) 
            }

        }
    )

    const classes = useStyles();

    const history = useHistory();
    
    
    return(
        <div>
            {
            myJobsData.length > 0 ?
            myJobsData !== undefined && myJobsData.map((job) => {
                return(
                    <Grid item container xs={12} md={12} direction="column">
                        <MyJobCard applications={job.applications} rerender={setMyJobsData} imgSrc={job.imgSrc} budget={job.budget + "€"} description={job.description} title={job.title} category={job.category} deadline={job.deadline} jobId={job._id} isPublic={false}></MyJobCard>
                    </Grid>
                )
            })
            :
            <Box className={classes.mainWrap}>
                <Box className={classes.container}>
                    <img src={workerIcon} className={classes.workerIconStyle} />
                    <Box className={classes.infoWrap}>
                        <Typography>You don't have any active job listings</Typography>
                        <Button variant="contained" color="secondary" onClick={() => history.push("/home/post")}>ADD NEW JOB</Button>
                    </Box>
                    
                </Box>
            </Box>
            }
        </div>
    )
        

    
}


export default MyJobs



