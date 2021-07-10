import { Box, makeStyles, Typography } from "@material-ui/core";

import Rating from '@material-ui/lab/Rating';

function Review(props){

    const useStyles = makeStyles(
        {
        avatarStyle:{
            width: "50px",
            height: "50px"
        },
        
        ratingWrap:{
            width: "90%"
        }

        }
    );

    const classes = useStyles();


    return(
        <Box className={classes.ratingWrap} display="flex" flexDirection="column" width="inherit" borderTop={1} borderColor={"grey.300"} mx={2}>

            <Box display="flex" flexDirection="row" width="inherit" justifyContent="space-between" m={1}>
                <Typography>{props.name}</Typography>
                <Rating defaultValue={props.rating} precision={0.5} readOnly></Rating>
            </Box>

            <Box m={1}>
                <Typography>{props.description}</Typography>
            </Box>
            
            
        </Box>
    )
}




export default Review;