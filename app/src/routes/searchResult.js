import { Box, Select, MenuItem, FormLabel, makeStyles, useTheme, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState,  useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import MyJobCard from "../components/myJobCard";
import UserContext from "../userContext";
import sadIcon from "../static/sad.svg"

function SearchResult(){

    const { title, category } = useParams();
    console.log(title, category)
    const [jobs, setJobs] = useState([]);

    const currentUser = useContext(UserContext);

    useEffect(() => {


        const url="http://localhost:3001/find/"+ title+ "&" + category + "&"+ 1000 + "&" + currentUser;
        axios.get(url, {headers: {'Cache-Control' : 'no-cache'}})
        .then((response) => {
            setJobs([...response.data]);
            console.log(response.data);
        })
        .catch(err => console.log(err))
        
    }, [category, title, currentUser])

    const theme = useTheme();

    const useStyles = makeStyles(
        {
            labelStyle: {
                marginRight: theme.spacing(2)
            },
            selectFormWrap: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            },
            noResultsIconWrap: {
                width: "100px",
                height: "100px"
            },
            noResultContainer: {
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginTop: theme.spacing(5)
            }
        }
    )
    const classes = useStyles();

    function handleSortChange(event){
        if(event.target.value === "Distance"){
            const sortedJobs = [...jobs.sort((a,b) => (a.distance < b.distance ? -1 : 1))]
            console.log("SORTED JOBS", sortedJobs);
            setJobs(() => sortedJobs);
        }
        else if(event.target.value === "Budget-higher"){
            const sortedJobs = [...jobs.sort((a,b) => (a.budget < b.budget ? 1 : -1))]
            console.log("SORTED JOBS", sortedJobs);
            setJobs(() => sortedJobs);
        }
        else if(event.target.value === "Budget-lower"){
            const sortedJobs = [...jobs.sort((a,b) => (a.budget < b.budget ? -1 : 1))]
            console.log("SORTED JOBS", sortedJobs);
            setJobs(() => sortedJobs);
        }
    }

    return(
        <Box>
        <Box className={classes.selectFormWrap}>
            <FormLabel className={classes.labelStyle}>Sort By :</FormLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            color="secondary"
            variant="outlined"
            onChange={handleSortChange}
            >
                <MenuItem value={"Distance"}>Distance</MenuItem>
                <MenuItem value={"Budget-higher"}>Budget - Higher first </MenuItem>
                <MenuItem value={"Budget-lower"}>Budget - Lower first</MenuItem>
                
            </Select>
        </Box>
        <Box>
            {
                jobs.length > 0 ?
                jobs.map((job) => 
                    <MyJobCard id={job._id} key={job._id} title={job.title} distance={job.distance} imgSrc={job.imgSrc} description={job.description.substring(0,150)+"..."} budget={job.budget + "€"} category={job.category} deadline={job.deadline} isPublic={true} jobCoordinateX={job.coordinates.x} jobCoordinateY={job.coordinates.y}></MyJobCard>
                )
                :
                <Box className={classes.noResultContainer}>
                    <img src={sadIcon} className={classes.noResultsIconWrap} alt="Sad icon" />
                    <Typography>No results were found. <br/> 
                        Try different search options</Typography>
                </Box>
            }
        </Box>
        </Box>
    )

}

export default SearchResult;