import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";
import picture from "../static/picture.jpg";
import Rating from '@material-ui/lab/Rating';

function Review(props){

    const useStyles = makeStyles(
        {
        avatarStyle:{
            width: "50px",
            height: "50px"
        }
        }
    );

    const classes = useStyles();


    return(
        <Box display="flex" flexDirection="column" width="inherit" borderTop={1} borderColor={"grey.300"} mx={2}>

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