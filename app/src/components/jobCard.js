import { Grid, Box, Typography, Link,} from "@material-ui/core";

import React, { useState } from "react";




function JobCard(props){

    
    
    return (
        
        <Grid container item direction="row" >
            
            <Grid item xs={2}>
                <Box mt={2} mr={2}>
                    <img width="100%" src={props.imgSrc}></img>
                </Box>
                
            </Grid>
            <Grid item container xs={10} direction="column">
                
                <Grid item xs={12} ><Box mb={2} mt={1}><Typography variant="h6"><Link to="/job" color="secondary" ><b>{props.title}</b></Link></Typography></Box></Grid>
                <Grid item container xs={12}>
                <Grid item container xs={10} direction="column">
                    <Grid item xs={12}>
                        <Typography>Description: {props.description}</Typography>
                    </Grid>
                    <Box mb={2} mt={1}>
                        <Grid item container direction="row" xs={12}>
                            
                            <Grid item xs={4}>
                            <Typography>Category: {props.category}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>Deadline: {props.deadline}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>Distance: {props.distance} </Typography>
                            </Grid>
                            
                        </Grid>
                    </Box>
                </Grid>
                <Grid alignContent="center" item xs={2}>
                    <Box ml={2}>
                    <Typography color="primary"><b>{props.budget + "€"}</b></Typography>
                    </Box>
                </Grid>
                </Grid>
            </Grid>
            
        </Grid>
        
    )
}

export default JobCard;

