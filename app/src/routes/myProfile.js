import { Grid, Box, Avatar, Typography, makeStyles, Button, TextField, Switch, SvgIcon, Fade } from "@material-ui/core";
import CloudUpload from "@material-ui/icons/CloudUpload";
import React, { useEffect, useLayoutEffect, useState } from "react"
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import viber from '../static/icons/viber.svg';
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";
import Cookies from "universal-cookie";


function Myprofile(){



    const cookie = new Cookies();
    const useStyles = makeStyles({
        avatStyle:{
            width: "200px",
            height: "200px"
        },
        iconStyle:{
            width: "35px",
            height: "35px",
            
        }
    })

    const [userData, setUserData] = useState({});


    useLayoutEffect(() => {
        const url = "http://localhost:3001/user";
        const token = cookie.get('token');
        axios.get(url, {headers: {'authorization' : `Bearer ${token}`}})
        .then((response) => {
            setUserData(response.data);

        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const classes = useStyles();
    const [stateNotChanged, setStateChanged] = useState(true); 
    const [formState, setFormState] = useState({
        name: "",
        streetAndNum: "",
        city: "",
        country: "",
        phonePref: "",
        phonePost: "",
        facebookURL:"",
        image: ""
    });
    

    console.log(userData);


    function handleFormChange(event){

        setStateChanged(false);

        const {value, name} = event.target;

        if(name === "name"){
            setFormState((prevState) => {
                return{
                    ...prevState,
                    name: value
                }
            })
        }
        else if(name === "streetAndNum"){
            setFormState((prevState) => {
                return{
                    ...prevState,
                    streetAndNum: value
                }
            })
        }
        else if(name === "city"){
            setFormState((prevState) => {
                return{
                    ...prevState,
                    city: value
                }
            })
        }
        else if(name === "country"){
            setFormState((prevState) => {
                return{
                    ...prevState,
                    country: value
                }
            })
        }
        else if(name === "phonePrefix"){
            setFormState((prevState) => {
                return{
                    ...prevState,
                    phonePref: value
                }
            })
        }
        else if(name === "phonePostfix"){
            setFormState((prevState) => {
                return{
                    ...prevState,
                    phonePost: value
                }
            })
        }
        else if(name === "facebookURL"){
            setFormState((prevState) => {
                return{
                    ...prevState,
                    facebookURL: value
                }
            })
        }
        

    }

    const [switchState, setSwitchState] = useState({
        whatsapp: false,
        facebook: false,
        viber: false
    });

    function handleSwitchChange(event){
        setStateChanged(false);
        const {value, name} = event.target;
        if(name === "facebook"){
            setSwitchState((prevState) => {
                return{
                    ...prevState,
                    facebook: event.target.checked
                }

            })
        }

        if(name === "whatsapp"){
            setSwitchState((prevState) => {
                return{
                    ...prevState,
                    whatsapp: event.target.checked
                }

            })
        }

        if(name === "viber"){
            setSwitchState((prevState) => {
                return{
                    ...prevState,
                    viber: event.target.checked
                }

            })
        }

    }

    const [imgSrc, setImgSrc] = useState("");
    const [imgFile, setImgFile] = useState({file: null});
    const [avatarChanged, setAvatarChanged] = useState(false);

    function handleImageChange(event){
        
        setImgSrc(URL.createObjectURL(event.target.files[0]));
        
        setImgFile(event.target.files[0]);

        setStateChanged(false);

        setAvatarChanged(true);

        setFormState((prevState) => {
            return{
                ...prevState,
                image: event.target.files[0]
            }
        })
    }

    function handleFormSubmit(event){
        event.preventDefault();

        const formData = new FormData;
        formData.append("name", formState.name);
        formData.append("streetAndNum", formState.streetAndNum);
        formData.append("city", formState.city);
        formData.append("country", formState.country);
        formData.append("whatsapp", switchState.whatsapp);
        formData.append("facebook", switchState.facebook);
        formData.append("viber", switchState.viber);
        formData.append("facebookURL", formState.facebookURL);
        formData.append("image", imgFile);
        formData.append("phonePref", formState.phonePref);
        formData.append("phonePost", formState.phonePost);

        const url="http://localhost:3001/profileChange";
        const token = cookie.get('token')

        axios.post(url, formData, {headers: {'authorization' : `Bearer ${token}`}})
        .then((response) =>{
            console.log(response);
        })
        .catch((err) => {
            console.log(err);
        })
        

    }
    
    console.log(userData.city, userData.streetAndNum);
    return(
        

            <Grid container direction="column" xs={12}>

                <form onSubmit={handleFormSubmit}>
        
                    <Grid item container direction="row" xs={12}>
                        
                            <Grid item container xs={12} md={4}>
                                <Box>
                                    <Box  m={2} display="flex" flexDirection="column">
                                        
                                        <Avatar className={classes.avatStyle} src={avatarChanged ? imgSrc : "http://localhost:3001/" + userData.avatar}></Avatar>
                                        <Box mt={1}>
                                            
                                      
                                        </Box>
                                        <Box alignSelf="center">
                                        <input
                                            name="image"
                                            accept="image/*"
                                            style={{display: "none"}}
                                            id="contained-button-file"
                                            
                                            type="file"
                                            onChange={handleImageChange}
                                
                                            
                                        />
                                        <label htmlFor="contained-button-file">
                                            <Button  variant="contained" color="secondary" component="span" endIcon={<CloudUpload/>}>
                                            <Typography>Change avatar</Typography>
                                            </Button>

                                        </label>
                                        </Box>
                                        
                                    </Box>
                                    <Box m={3}>
                                        
                                    </Box>
                                </Box>
                            </Grid>


                            <Grid container item xs={12} md={8}>
                                <Box display="flex" flexDirection="column" m={2} width="100%">
                                    <Box m={2}><TextField  onChange={handleFormChange} name="name" fullWidth label={userData.firstAndLastName !== "" ? userData.firstAndLastName : "First and Last name"}></TextField></Box>
                                    <Box m={2}><TextField  onChange={handleFormChange} name="streetAndNum"  fullWidth label={userData.streetAndNum !== "" ? userData.streetAndNum : "Street and number"}></TextField></Box>
                                    <Box m={2}><TextField  onChange={handleFormChange} name="city" fullWidth label={userData.city !== "" ? userData.city : "City"}></TextField></Box>
                                    <Box m={2}><TextField  onChange={handleFormChange} name="country" fullWidth label={userData.country !== "" ? userData.country : "Country"}></TextField></Box>
                                    
                                </Box>

                            </Grid>
                            
                
                            
                        
                    </Grid>

                    <Grid item container xs={12} direction="column">

                        <Box m={3}>
                            <Box mb={1}><Typography variant="h6">Phone number</Typography></Box>
                            <Box display="flex">
                                <Box mr={2} width="80px"><TextField label={userData.phonePref !== "" ? userData.phonePref : "Country code"} name="phonePrefix" onChange={handleFormChange} fullWidth variant="outlined" size="small"></TextField></Box>
                                <Box width="200px"><TextField label={userData.phonePost !== "" ? userData.phonePost : "Phone number"} size="small" name="phonePostfix" onChange={handleFormChange} fullWidth variant="outlined"></TextField></Box>
                            </Box>
                        </Box>

                        <Box mb={2} ml={3} mr={3}>
                            <Typography variant="h6">Choose platforms where people can get in touch with you</Typography>
                        </Box>

                        <Box mx={3} display="flex" flexDirection="row" alignContent="center">
                            <Box display="flex" flexDirection="row" width="133px">
                                <WhatsAppIcon fontSize="large" ></WhatsAppIcon>
                                <Typography variant="h6">Whatsapp</Typography>
                            </Box>
                            <Box>
                                <Switch checked={switchState.whatsapp} name="whatsapp"  onChange={handleSwitchChange}></Switch>
                            </Box>
                            
                        </Box>

                        <Box mx={3} display="flex" flexDirection="row" alignContent="center">
                            <Box display="flex" flexDirection="row" width="133px">
                                <img src={viber} alt="viber-icon" className={classes.iconStyle}></img>
                                <Typography variant="h6">Viber</Typography>
                            </Box>
                            
                            
                            <Box>
                                <Switch checked={switchState.viber} name="viber"  onChange={handleSwitchChange}></Switch>
                            </Box>
                        </Box>

                        <Box mx={3} display="flex" flexDirection="row" alignContent="center">
                            <Box display="flex" flexDirection="row" width="133px">
                                <FacebookIcon fontSize="large"></FacebookIcon>
                                <Typography variant="h6">Facebook</Typography>
                            </Box>
                            
                            
                            <Box >    
                                    <Switch checked={switchState.facebook} name="facebook" onChange={handleSwitchChange}></Switch>
                            </Box>
    
                        </Box>

                        <Box mx={3}>
                            
                                {switchState.facebook && <Fade in={switchState.facebook}><TextField onChange={handleFormChange} autoFocus name="facebookURL" label="profileURL" fullWidth size="small" variant="outlined"></TextField></Fade>}


                        </Box>

                        <Box m={3}>
                            <Button type="submit" disabled={stateNotChanged} color="primary" variant="contained"><Typography>Save Changes</Typography><SaveIcon></SaveIcon></Button>
                        </Box>

                        

                        

                    </Grid>

                </form>
            </Grid>
        
        
    )
}

export default Myprofile;