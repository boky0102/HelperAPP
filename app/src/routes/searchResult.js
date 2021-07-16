import { Box, Select, MenuItem, FormLabel, makeStyles, useTheme } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyJobCard from "../components/myJobCard";
import UserContext from "../userContext";

function SearchResult(){

    const { title, category } = useParams();
    console.log(title, category)
    const [jobs, setJobs] = useState([]);

    const currentUser = useContext(UserContext);

    useEffect(() => {


        const url="http://localhost:3001/find/"+ title+ "&" + category + "&"+ 1000 + "&" + currentUser;
        axios.get(url, {headers: {'Cache-Control' : 'no-cache'}})
        .then((response) => {
            setJobs(response.data);
            console.log(response.data);
        })
        .catch(err => console.log(err))
        
    }, [category, title])

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
            }
        }
    )
    const classes = useStyles();

    return(
        <Box>
        <Box className={classes.selectFormWrap}>
            <FormLabel className={classes.labelStyle}>Sort By :</FormLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            color="secondary"
            variant="outlined"
            
            >
                <MenuItem value={"Distance"}>Distance</MenuItem>
                <MenuItem value={"Budget"}>Budget</MenuItem>
                
            </Select>
        </Box>
        <Box>
            {
                jobs.map((job) => 
                    <MyJobCard id={job._id} title={job.title} distance={job.distance} imgSrc={job.imgSrc} description={job.description.substring(0,150)+"..."} budget={job.budget + "€"} category={job.category} deadline={job.deadline} isPublic={true} jobCoordinateX={job.coordinates.x} jobCoordinateY={job.coordinates.y}></MyJobCard>
                )
            }
        </Box>
        </Box>
    )

}

export default SearchResult;