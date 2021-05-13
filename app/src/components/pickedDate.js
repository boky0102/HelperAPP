import { IconButton, makeStyles, Typography, useTheme } from "@material-ui/core";
import React from "react";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';





function PickedDate(props){
    
    const theme = useTheme();
    const useStyles = makeStyles(
        {
            box:{
                display: "flex",
                justifyContent: "center",
                width: "150px",
                height: "40px",
                backgroundColor: theme.palette.secondary.dark,
                color: "white",
                borderRadius: "15px",
                marginRight: "5px",
                marginTop: "5px",
                marginBottom: "5px"
            },
            wrapper:{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "10px"
            },
            date:{
                alignSelf: "center"
            }
        }
    )

    const classes = useStyles();


    

    return(
        <div className={classes.wrapper}>
            {props.dates !== undefined && props.dates.map((date, index) => {
                return(
                    <div key={index} className={classes.box}>
                        <div className={classes.date}>
                            <Typography style={{color: "black"}}>{date.split("-").join("/")}</Typography>
                        </div>
                        {props.deletable === true && <IconButton onClick={() => props.handleDeleteClick(index)}><HighlightOffIcon ></HighlightOffIcon></IconButton>}
                    </div>
                )
            })}
        </div>

        
    )      
    
}


export default PickedDate