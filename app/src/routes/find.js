
import { AppBar, makeStyles, Toolbar, TextField, Box, FormControl, InputLabel, Select, MenuItem, Typography, Slider, Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useContext, useState } from "react";
import theme from "../theme";
import SearchIcon from '@material-ui/icons/Search';
import UserContext from "../userContext";
import axios from "axios";
import MyJobCard from "../components/myJobCard";


const dotenv = require('dotenv');

dotenv.config();



const useStyles = makeStyles({

       searchToolbarStyle: {
           backgroundColor: theme.palette.secondary.light
       },

       searchIconStyle: {
            display: "flex",
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems:"center"
       },

       formControl: {
           minWidth: 120
       }
    }
    )

function Find(props){

    

    const classes= useStyles();

    const [category, setCategory] = useState("");

    const user = useContext(UserContext);
    console.log("USER :", user);

    

    const [sliderVal, setSliderVal] = useState(0);



    function handleSearchChange(event){
        const {value, name} = event.target;
        if(name == "title"){
            setSearchParams((prevParams) => {
                return{
                    ...prevParams,
                    title: value
                }
                
            })
        }

        
        console.log(searchParams);

    }

    

    function handleChangeCategory(event){
        setCategory(event.target.value);
        setSearchParams((prevParams) => {
            return{
                ...prevParams,
                category: event.target.value
            }
        })
    }

    



    const updateRange = (event, data) => {
        setSliderVal(data);
        setSearchParams((prevParams) => {
            return{
                ...prevParams,
                distance: data
            }
        })

    }

    const [searchParams, setSearchParams] = useState({
        title:"",
        category: "",
        distance: sliderVal,
        user: ""
    })

    const [jobData, setJobData] = useState([]);

    

    function handleSearchSubmit(event){

        event.preventDefault();


        setJobData([]);
        

        var titleURL = "none";
        var categoryURL = "none";
        var distanceURL = "none";

        
        
        

        if(searchParams.title === "" && (searchParams.category === "" || searchParams.category === "Any") && searchParams.distance === 0 ){
            
            titleURL = "none";
            categoryURL = "none";
            distanceURL = "none";

        }

        else if(searchParams.title !== "" && (searchParams.category === "" || searchParams.category === "Any") && searchParams.distance === 0){
            
            titleURL = searchParams.title;
            categoryURL = "none";
            distanceURL = "none";

        }

        else if(searchParams.title !== "" && (searchParams.category !== "" && searchParams.category !== "Any") && searchParams.distance === 0){

            titleURL = searchParams.title;
            categoryURL = searchParams.category;
            distanceURL = "none";
            
        }

        else if(searchParams.title !== "" && (searchParams.category !== "" && searchParams.category !== "Any") && searchParams.distance !== 0){
            
            titleURL = searchParams.title;
            categoryURL = searchParams.category;
            distanceURL = searchParams.distance;

        }

        else if(searchParams.title === "" && (searchParams.category === "" || searchParams.category === "Any") && searchParams.distance !== 0){
            
            titleURL = "none";
            categoryURL = "none";
            distanceURL = searchParams.distance;
        }

        else if(searchParams.title === "" && (searchParams.category !== "" && searchParams.category !== "Any") && searchParams.distance !== 0){

            titleURL = "none";
            categoryURL = searchParams.category;
            distanceURL = searchParams.distance;

        }

        else if(searchParams.title === "" && (searchParams.category !== "" && searchParams.category !== "Any") && searchParams.distance === 0){

            titleURL = "none";
            categoryURL = searchParams.category;
            distanceURL = "none";

        }

        else if(searchParams.title !== "" && (searchParams.category === "" || searchParams.category === "Any") && searchParams.distance !== 0){

            titleURL = searchParams.title;
            categoryURL = "none";
            distanceURL = searchParams.distance;

        }

        


        var userURL = searchParams.user;

        if(userURL === ""){
            userURL = "none";
        }

        console.log(titleURL, categoryURL, distanceURL, userURL);


        const url="http://localhost:3001/find/"+titleURL+"&"+categoryURL+"&"+distanceURL+"&"+userURL;

        axios.get(url, {headers: {'Cache-Control' : 'no-cache'}}).then((response) => {
            setJobData(response.data);
            
        }).catch((err) => {
            console.log(err);
        });


    }

    function makeImgURL(imgSrc){
        var url = "http://localhost:3001/"+imgSrc;
        return url;
    }

    console.log(jobData);


    


    
    return(
        <Grid container direction="column" xs={12}>
            
            <Grid container item xs={12}>
                
                <AppBar position="relative" >
                <Toolbar className={classes.searchToolbarStyle} >
                    <form noValidate onSubmit={handleSearchSubmit}>
                    <Grid container direction="column" xs={12}>
                        
                            <Grid item xs={12}>
                                <Box mt={2} mb={1}>
                                    <TextField onChange={handleSearchChange} name="title" color="secondary" fullWidth="true" id="standard-basic" size="medium" placeholder="Search by title"></TextField>
                                </Box>
                            </Grid>

                            <Grid item>
                                <Box pb={2}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel  color="secondary">Category</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        onChange={handleChangeCategory}
                                        color="secondary"
                                        >
                                            <MenuItem value={"Any"}>Any</MenuItem>
                                            <MenuItem value={"Digital"}>Digital</MenuItem>
                                            <MenuItem value={"Hard Labour"}>Hard Labour</MenuItem>
                                            <MenuItem value={"Cleaning"}>Cleaning</MenuItem>
                                            <MenuItem value={"Gardening"}>Gardening</MenuItem>
                                            <MenuItem value={"Driving"}>Driving</MenuItem>
                                            <MenuItem value={"Teaching"}>Teaching</MenuItem>
                                            <MenuItem value={"Furniture moving"}>Furniture moving</MenuItem>
                                            <MenuItem value={"Furniture building"}>Furniture Building</MenuItem>
                                            <MenuItem value={"Machine fixing"}>Machine fixing</MenuItem>
                                            <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                                        </Select>
                                </FormControl>
                                </Box>
                            
                        </Grid>

                        
                        <Grid item> <Typography gutterBottom >Maximum distance in km (If set to 0 it will display all distances)</Typography></Grid>
                        <Box mb={2}>
                        <Grid container item direction="row" justify="space-evenly">
                            <Grid item xs={12} sm={4}>
                                
                                <Slider value={sliderVal}  name="distance" onChange={updateRange} color={"secondary"} valueLabelDisplay="auto" aria-label="pretto slider"  />

                            </Grid>
                            <Grid item xs={0} sm={4}>

                            </Grid>
                            <Grid item xs={12} sm={4}>

                                <Button type="submit" variant="contained" color="primary" endIcon={<SearchIcon/>}>Search</Button>
                            </Grid>
                            
                            
                        </Grid>
                        </Box>
                    
                    </Grid>
                    </form>
                </Toolbar>
                </AppBar>
                
            </Grid>

            <Grid container item xs={12} direction="column" alignContent="center" >

                {jobData.map((job) => (
                    <Box width="inherit"    borderTop={1} borderColor="grey.200">
                        <MyJobCard id={job._id} title={job.title} distance={job.distance} imgSrc={job.imgSrc} description={job.description.substring(0,150)+"..."} budget={job.budget + "€"} category={job.category} deadline={job.deadline} isPublic={true} jobCoordinateX={job.coordinates.x} jobCoordinateY={job.coordinates.y} />
                    </Box>
                ))}

            
                
                
            </Grid>

        </Grid>
    )
}

export default Find;

