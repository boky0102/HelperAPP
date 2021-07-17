import { Box, Card, CardActionArea, CardMedia, Typography, Grid, useTheme, makeStyles, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Category from "./category";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Application from "./application";
import UserCard from "./UserCard";
import UserBigCard from "./userBigCard";
import distanceCalc from "../functions/distanceCalc";
import Cookies from "universal-cookie";
import Distance from "./distance";

function MyJobCard(props){


    const theme = useTheme();

    const useStyles = makeStyles(
        {
            cardStyle: {
                width: "100%",
                [theme.breakpoints.down('md')] :{
                    flexDirection: "column"
                }
            },
            
            iconStyleOpen:{
                transitionTimingFunction: "ease-in-out",
                transition: "0.7s",
                transform: "rotate(90deg)"
                
            },
            iconStyleClose:{
                transitionTimingFunction: "ease-in-out",
                transition: "0.7s",
                transform: "rotate(0deg)"
            },
            titleAndButton: {
                [theme.breakpoints.down('sm')] :{
                    flexDirection: "column",
                    alignItems: "center"
                }
            },
            imageContainer: {
                width: "80%",
                [theme.breakpoints.down('md')] :{
                    width: "100%"
                },
                height: "300px"

            },
            imgStyle: {
                width: "100%",
                height: "100%",
                
                [theme.breakpoints.down('md')] :{
                    width: "100%"
                },
                objectFit: "cover"
            },
            mainCardStyle: {
                marginLeft: props.profile && theme.spacing(2),
                marginRight: props.profile && theme.spacing(2),
                marginTop: props.profile && theme.spacing(1)
            }
            
        }
    )

    const cookies = new Cookies()

    

    const classes = useStyles();
    const history = useHistory();
    const [isClicked, clicked] = useState(false);

    const [coordinates, setCoordinates] = useState({});
    const [distance, setDistance] = useState();
    
    
    useEffect(() => {


        const userX = cookies.get('userCityX');
        const userY = cookies.get('userCityY');

        if(userX !== null & userY !== null){
            setCoordinates({
                x: userX,
                y: userY
            })
            setDistance(distanceCalc(userX,userY,props.jobCoordinateX,props.jobCoordinateY));
        }

        

        }, [])
    
    console.log("DISTANCE", distance);
    

    function handleCardClick(){

        if(props.isScheduled !== true){

            if(props.isPublic === true){
                history.push("/home/job/" + props.id);
            }
            else{
                clicked(!isClicked);
            }

        }

        
    }

    

    return(
        <Box mt={3}>
        <Card className={classes.mainCardStyle}>
            <CardActionArea onClick={handleCardClick}>

                
                
                        <Box className={classes.cardStyle} display="flex" flexDirection="row">
                            <Box className={classes.imageContainer} ><img className={classes.imgStyle} alt="job-descriptive" src={"http://localhost:3001/" + props.imgSrc} width="75%" /></Box>
                        
                
                   
                            <Box display="flex" flexDirection="column" width="100%">

                                <Box m={2} display="flex"  flexDirection="row" alignItems="center" justifyContent="space-between" className={classes.titleAndButton}>
                                    <Typography>
                                        {props.title}
                                    </Typography>
                                    {
                                        (props.jobCoordinateX !== undefined && props.jobCoordinateY !== undefined && distance !== undefined) && 
                                        <Distance distance={distance}></Distance>
                                    }
                                    {(props.isPublic !== true && props.isScheduled !== true) && <Button size="small" color="primary" variant="contained" endIcon={<ArrowForwardIosIcon className={isClicked ? classes.iconStyleOpen : classes.iconStyleClose}></ArrowForwardIosIcon>}>
                                        <Typography>
                                            SHOW APPLICANTS
                                        </Typography>
                                    </Button>}
                                </Box>
                            

                                <Box width="100%" height="100%" display="flex" flexDirection="column" justifyContent="space-between">
                            
                                    <Box borderTop={1} width="inherit" borderColor={"grey.300"}>
                                        <Box m={2} >
                                            <Typography>
                                                {props.description}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box my={2} display="flex" width="100%" justifyContent="space-between" alignItems="center">
                            
                                        <Box mx={2}>
                                            <Typography>
                                                Deadline: {props.deadline.split("-").join("/")}
                                            </Typography>
                                        </Box>

                                        <Box mx={3}>
                                            
                                                <Category category={props.category}></Category>
                                            
                                        </Box>

                                        <Box ml={3} mr={3}>
                                            <Typography>
                                                {props.budget}
                                            </Typography>
                                        </Box>

                                    </Box>

                                </Box>


                            </Box>
                

                        </Box>
                 
            
                
            </CardActionArea>
        </Card>
         {isClicked && 
            <Box mt={1}>
                {props.applications !== undefined && props.applications.map((application) => 
                    
                        <Application rerender={props.rerender} username={application.username} message={application.message} dates={application.dates} dateApplied={application.applicationDate} jobId={props.jobId} workerId={application._id}></Application>
                    
                ) }
            </Box>
        } 



        { (props.isScheduled !== undefined && props.isScheduled && props.applied === undefined) !== false && 
            <UserCard worker={props.worker}  jobId={props.jobId} isPublic={false}></UserCard>
            
        }

        { (props.isScheduled !== undefined && props.isScheduled && props.applied === true && props.applied !== undefined) !== false &&
            <UserBigCard workProvider={props.workProvider}></UserBigCard>
        }
        </Box>
    )

}



export default MyJobCard