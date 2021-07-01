import { Box, Card, CardActionArea, CardMedia, Typography, Grid, useTheme, makeStyles, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Category from "./category";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Application from "./application";
import UserCard from "./UserCard";

function MyJobCard(props){


    const theme = useTheme();

    const useStyles = makeStyles(
        {
            cardStyle: {
                [theme.breakpoints.down('md')] :{
                    flexDirection: "column"
                }
            },
            imgStyle: {
                [theme.breakpoints.down('md')] :{
                    width: "100%"
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
            }
            
        }
    )

    

    const classes = useStyles();
    const history = useHistory();
    const [isClicked, clicked] = useState(false);

    function handleCardClick(event){

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
        <Card >
            <CardActionArea onClick={handleCardClick}>

                
                
                        <Box className={classes.cardStyle} display="flex" flexDirection="row">
                        <img className={classes.imgStyle} alt="job-descriptive" src={"http://localhost:3001/" + props.imgSrc} width="75%"></img>
                
                   
                            <Box display="flex" flexDirection="column" width="100%">

                                <Box m={2} display="flex"  flexDirection="row" alignItems="center" justifyContent="space-between" className={classes.titleAndButton}>
                                    <Typography>
                                        {props.title}
                                    </Typography>
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

                                    <Box my={2} display="flex" width="100%" justifyContent="space-between">
                            
                                        <Box mx={2}>
                                            <Typography>
                                                Deadline: {props.deadline.split("-").join("/")}
                                            </Typography>
                                        </Box>

                                        <Box mx={3}>
                                            <Typography>
                                                <Category category={props.category}></Category>
                                            </Typography>
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
        {(isClicked && props.isPublic !== false) && 

            <Box mt={1}>
                {props.application !== undefined && props.applications.map((application) => 
                    
                        <Application rerender={props.rerender} username={application.username} message={application.message} dates={application.dates} dateApplied={application.applicationDate} jobId={props.jobId}></Application>
                    
                ) }
            </Box>
        
        }

        {props.isScheduled !== undefined && 
            <UserCard worker={props.worker}  jobId={props.jobId} isPublic={false}></UserCard>
            
        }
        </Box>
    )

}



export default MyJobCard