import { Grid, TextField, Typography, Box, InputLabel, Select, MenuItem, makeStyles, IconButton, Button, CircularProgress } from "@material-ui/core";

import React, { useState, useContext } from "react";
import axios from "axios";

import EuroIcon from '@material-ui/icons/Euro';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import SendIcon from '@material-ui/icons/Send';
import UserContext from "../userContext";
import Cookies from "universal-cookie";



function NewJob(){

    const cookies = new Cookies();

    function add2Weeks(){
        var date = new Date();
        date.setDate(date.getDate() + 14);

        const ye = date.getFullYear();
        var mon = date.getMonth()+1;
        mon = mon.toString();


        if(mon.length === 1){
            mon="0"+mon;
        }

        var day = date.getDate();
        day = day.toString();
        if(day.length === 1){
            day="0"+day;
        }
        

        return `${ye}-${mon}-${day}`
        
      
    }


    

    const [currentCategory, setCategory] = useState();
    const [currentAdress, setAdress] = useState();
    const [arrayAdress, setArrayAdress] = useState([]);
    const [imgSrc, setImgSrc] = useState("");
    const [imgFile, setImgFile] = useState({file: null});
    const [number, isNumber] = useState(true);
    const [loading, isLoading] = useState(false);
    const [wrongAdress, setWrongAdress] = useState(false);
    const [jobCreated, setJobCreated] = useState(false);

    const user = useContext(UserContext);

    const [jobData, setJobData] = useState({
        username: user,
        title: "",
        description: "",
        category: "",
        deadline: add2Weeks(),
        budget: 0,
        adress: {
            streetAndNum: "",
            city: "",
            country: ""
        },
        image: ""
    })

    function handleChangeCategory(event){
        setCategory(event.target.value);
    }

    function handleAdressChange(event){
        setAdress(event.target.value);
        console.log(currentAdress);
        

        const url = "http://localhost/find-adress/"+currentAdress;
        
        axios.get(url).then(
            (response) => {
                setArrayAdress(response.data);
            }
        ).catch((err) => {
            console.log(err);
        })
        

    }

    function handleImageChange(event){
        
        setImgSrc(URL.createObjectURL(event.target.files[0]));
        
        setImgFile(event.target.files[0]);

        setJobData((prevData) => {
            return{
                ...prevData,
                image: event.target.files[0]
            }
        })
    }

    function handleFieldChange(event){
        const {value, name} = event.target
        switch(name){
            case "title":
                setJobData((prevData) => {
                    return{
                        ...prevData,
                        title: value
                    }
                })
            break;

            case "description":
                setJobData((prevData) => {
                    return{
                        ...prevData,
                        description: value
                    }
                })
            break;

            case "category":
                setJobData((prevData) => {
                    return{
                        ...prevData,
                        category: value
                    }
                })
            break;

            case "deadline":
                setJobData((prevData) => {
                    return{
                        ...prevData,
                        deadline: value
                    }
                })
            break;

            case "budget":
                var regex=/^[a-zA-Z]+$/;

                if(value.match(regex)){
                    isNumber(false);
                }else{
                    isNumber(true);
                }    

                setJobData((prevData) => {
                    return{
                        ...prevData,
                        budget: value
                    }
                })
            break;

            case "streetAndNumber":
                setJobData((prevData) => {
                    return{
                        ...prevData,
                        adress: {
                            ...prevData.adress,
                            streetAndNum: value
                        }
                    }
                })
            break;

            case "city":
                setJobData((prevData) => {
                    return{
                        ...prevData,
                        adress: {
                            ...prevData.adress,
                            city: value
                        }
                    }
                })
            break;

            case "country":
                setJobData((prevData) => {
                    return{
                        ...prevData,
                        adress: {
                            ...prevData.adress,
                            country: value
                        }
                    }
                })
            break;

            /* case "image":
                setJobData((prevData) => {
                    return{
                        ...prevData,
                        img: imgSrc
                    }
                }) */

        }
        console.log(jobData);
        event.preventDefault();
    }

    
    
    
    function handleJobSubmit(event){
        event.preventDefault();

        isLoading(true);

        const formData = new FormData();
        formData.append("username", jobData.username);
        formData.append("title", jobData.title);
        formData.append("description", jobData.description);
        formData.append("category", jobData.category);
        formData.append("deadline", jobData.deadline);
        formData.append("budget", jobData.budget);
        formData.append("streetAndNum", jobData.adress.streetAndNum);
        formData.append("city", jobData.adress.city);
        formData.append("country", jobData.adress.country);
        formData.append("productImage", imgFile);

        
        

        console.log("SUBMITED");
        const url="http://localhost:3001/newJob";
        const data = cookies.get('token');

        const config = {
            headers:{
                'authorization': `Bearer ${data}`/* ,
                'content-type' : 'multipart/form-data' */

            }
        }
        
        if(number === true){

            axios.post(url, formData, config)
            .then((response) => {
                if(response.status === 200){
                    
                    isLoading(false);
                    setJobCreated(true);
                }
                
            })
            .catch((err) => {
                isLoading(false);
                setWrongAdress(true);
        })

        }
        
    }



    const useStyles = makeStyles(
        {
            categoryStyle :{
                minWidth: 120
            },
            
            euroStyle :{
                color: "darkgreen"
            },

            input: {
                display: 'none',
            },
            resizeImage: {
                maxWidth: "50%",
                maxHeight: "50%"
                
            }
            
        }
    )

    

    const classes = useStyles();

    return(
        <Grid container direction="column">
            <form  encType="multipart/form-data" onSubmit={handleJobSubmit}>
            <Grid item>
                <Box my={2}>
                    <Typography variant="h4">Job info</Typography>
                </Box>
            </Grid>

            <Grid item>
                <Box mt={2}>
                    <TextField name="title" required fullWidth variant="outlined" color="secondary" label="Enter job title" autoFocus="true" size="large" onChange={handleFieldChange}></TextField>
                </Box>
            </Grid>

            <Grid item>
                <Box my={2}>
                    <TextField name="description" required fullWidth rows="3" multiline variant="outlined" color="secondary" label="Enter job description" size="large" onChange={handleFieldChange}></TextField>
                </Box>

            </Grid>

            <Grid item container direction="row">
                <Grid item>
                    <Box>
                    <InputLabel  color="secondary">Category</InputLabel>
                        <Select
                        className={classes.categoryStyle}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={currentCategory}
                        onChange={handleChangeCategory}
                        color="secondary"
                        required
                        name="category"
                        onChange={handleFieldChange}
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
                    </Box>
                </Grid>

                <Grid item>
                    <Box mb={2} mx={5}>
                        <TextField
                            name="deadline"
                            required
                            color="secondary"
                            id="date"
                            label="Deadline"
                            type="date"
                            defaultValue={add2Weeks()}
                            className={classes.textField}
                            onChange={handleFieldChange}
                            InputLabelProps={{
                            shrink: true
                            }}
                        />
                    </Box>
                </Grid>

                

            </Grid>

            <Grid item container alignItems="center" direction="row">
                <Grid item>
                    <Box mr={2}>
                        <TextField name="budget" required minWidth variant="outlined" color="primary" label="Budget" size="small" onChange={handleFieldChange}></TextField>
                    </Box>
                    
                    

                </Grid>

                <Grid>
                    <Box>
                            <EuroIcon className={classes.euroStyle}></EuroIcon>
                    </Box>  
                </Grid>

                <Grid>
                    {number==false && <Box color="red" ml={2}><Typography variant="p"> This is not a number </Typography> </Box>} 
                </Grid>
            </Grid>

            <Grid item>
                <Box mt={5}>
                    <Typography variant="h6">Adress info - it wont be displayed until you find worker</Typography>
                </Box>
            </Grid>

            
            <Grid item>
                <Box my={2}>
                    <TextField name="streetAndNumber" required fullWidth variant="outlined" color="secondary" label="Street and number" size="large" onChange={handleFieldChange}></TextField>
                </Box>
            </Grid>
                
            

            <Grid container item direction="row">
                <Box mr={2} my={1}>
                    <Grid item>
                        <TextField name="city" required width="inherit" variant="outlined" color="secondary" label="City" size="large" onChange={handleFieldChange}></TextField>
                    </Grid>
                </Box>
                <Box my={1}>
                    <Grid item>
                        <TextField name="country" required fullWidth variant="outlined" color="secondary" label="Country" size="large" onChange={handleFieldChange}/>
                        
                    </Grid>
                </Box >
            </Grid>

            <Grid item>
                <Box mt={5}>
                    <Typography variant="h6">Picture </Typography>
                </Box>
               
            </Grid>

            <Grid container item direction="column">
                <Grid item>
                    <Box my={2}>
                    <input
                        name="image"
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        
                        type="file"
                        onChange={handleImageChange}
              
                        
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span" endIcon={<CloudUploadIcon/>}>
                         Choose picture
                        </Button>

                    </label>
                        
                    </Box>
                </Grid>

                <Grid item>
                    <Box my={2}>
                        <img className={classes.resizeImage} src={imgSrc}/>
                    </Box>
                </Grid>

                <Grid container item direction="row">
                    <Grid item>
                        <Box my={2}>
                            <Button disabled={loading || jobCreated || imgSrc==""} color="secondary" type="submit"  size="large" variant="contained" endIcon={<SendIcon/>}>
                                POST JOB
                            </Button>
                        </Box>
                    </Grid>
                    <Grid>
                        <Box my={2} ml={2}>
                        {loading && <CircularProgress color="primary"/>}
                        </Box>
                    </Grid>

                </Grid>

                <Grid item>
                    <Box>
                        {wrongAdress && <Typography variant="h6"> Wrong address, try again </Typography>}
                        {jobCreated && <Typography variant="h6"> Job succesfully created </Typography>}
                        
                    </Box>

                </Grid>
            </Grid>
            </form>
        </Grid>
    )
}

export default NewJob;