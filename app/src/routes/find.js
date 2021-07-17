
import { AppBar, makeStyles, Toolbar, TextField, Box, FormControl, InputLabel, Select, MenuItem, Typography, Slider, Button, Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useContext, useState } from "react";
import theme from "../theme";
import SearchIcon from '@material-ui/icons/Search';
import UserContext from "../userContext";
import axios from "axios";
import MyJobCard from "../components/myJobCard";
import grey from "@material-ui/core/colors/grey";


const dotenv = require('dotenv');

dotenv.config();



const useStyles = makeStyles({

       searchToolbarStyle: {
           backgroundColor: theme.palette.secondary.light,
           width: "100%",
           
           
       },

       searchIconStyle: {
            display: "flex",
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems:"center"
       },

       formControl: {
           minWidth: 120
           
       },
       sliderWrap: {
           width: "70%",
           [theme.breakpoints.down('md')] : {
               width: "100%"
           }
       },

       searchWrap: {
           display: "flex",
           alignItems: "center",
           justifyContent: "space-around",
           margin: theme.spacing(4),
           [theme.breakpoints.down('md')] : {
               flexDirection: "column",
               alignItems: "flex-start"
           }
       },

       sliderContainer: {
           display: "flex",
           flexDirection: "column",
           alignItems: "center",
           color : grey[700]
       },

       categorySelect: {
           marginBottom: theme.spacing(2)
       }
    }
    )

function Find(props){

    

    const classes= useStyles();

    const [category, setCategory] = useState("");

    const user = useContext(UserContext);
    

    

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

        


        var userURL = user;

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
                
                
                <Paper elevation={2} className={classes.searchToolbarStyle} >
                    <form noValidate onSubmit={handleSearchSubmit}>
                    
                        
                            
                                <Box className={classes.searchWrap}>
                                <TextField onChange={handleSearchChange} name="title" color="secondary" id="standard-basic" size="medium" placeholder="Search by title"></TextField>
                                
                            

                            
                                
                                <FormControl className={classes.formControl}>
                                    <InputLabel  color="secondary">Category</InputLabel>
                                        <Select
                                        className={classes.categorySelect}
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
                                
                            
                       

                                <Box className={classes.sliderContainer}>
                                    <Typography gutterBottom >Maximum distance in km (If set to 0 it will display all distances)</Typography>
                                    <Box className={classes.sliderWrap}>
                                    <Slider value={sliderVal}  name="distance" onChange={updateRange} color={"secondary"} valueLabelDisplay="auto" aria-label="pretto slider"  />
                                    </Box>
                                </Box>
                            
                            

                            
                            

                                <Button type="submit" variant="contained" color="primary" endIcon={<SearchIcon/>}>Search</Button>
                            
                            
                            
                       
                        
                    
                        </Box>
                    </form>
                </Paper>
                
                
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

