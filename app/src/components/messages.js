import { Grid, Box, Avatar, Typography, makeStyles } from "@material-ui/core";
import React from "react"
import avatar from "../static/picture.jpg"


function Message(props){

    const useStyles = makeStyles(
        {
            avatStyle:{
                width: "100px",
                height: "100px"
            }
        }
    )

    const classes = useStyles();

    return(

        <Grid item container direction="row">
            <Box display="flex" flexDirection="row" m={2} >
                <Box  display="flex" flexDirection="column" alignItems="center">
                    <Avatar src={avatar} className={classes.avatStyle}></Avatar>
                    <Typography>{props.name}</Typography>
                </Box>
                <Box ml={3} alignSelf="center">
                    <Typography>{props.lastMessage}</Typography>
                </Box>
            </Box>
        </Grid>


    )

   


}


export default Message;