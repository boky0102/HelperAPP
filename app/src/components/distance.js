import { Box, Icon, makeStyles, Typography, useTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import RoomIcon from '@material-ui/icons/Room';
import green from '@material-ui/core/colors/green';
import yellow from '@material-ui/core/colors/yellow';


function Distance(props){

    const [colorState, setColorState] = useState(green[500])

    useEffect(() => {

        if(props.distance > 25 && props.distance < 100){
            setColorState(yellow[400]);
        }
        else if(props.distance >= 100){
            setColorState("red");
        }
        
    },[])

    const useStyles = makeStyles(
        {
            wraper: {
                display: "flex"
            },
            icon: {
                color: colorState
            },
            text: {
                color: colorState
            }

        }
    )
    
    const classes = useStyles();
    const theme = useTheme();


    return(
        <Box className={classes.wraper}>
            <Icon className={classes.icon}><RoomIcon></RoomIcon></Icon>
            <Typography className={classes.text} color={green[500]}>{Math.round(props.distance)}km</Typography>
        </Box>
    )
}


export default Distance