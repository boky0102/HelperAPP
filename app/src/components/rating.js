import React from 'react';
import { Box, Typography} from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';

function Rating(props){
    return(
        <Box display="flex" flexDirection="row" ml={2}>
            {props.rating === 0 ?
            <Box display="flex"><StarIcon color={"secondary"}></StarIcon><Typography>(NA)</Typography></Box>
            :
            <Box display="flex"><StarIcon color={"secondary"}></StarIcon><Typography>{props.rating}</Typography></Box>
        }
        </Box>
    )

}

export default Rating