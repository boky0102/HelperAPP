import { Grid, Box, Avatar, Typography } from "@material-ui/core";
import React from "react"
import avatar from "../static/picture.jpg"

function Myprofile(){
    return(
        

            
        
                <Grid item container direction="row">
                    <Box>
                        <Box borderLeft={1}>
                            <Avatar src={avatar}></Avatar>
                            <Typography>hgfdhgfdhgf</Typography>
                        </Box>
                        <Box>
                            <Typography>hgfdhgfdhfgh</Typography>
                        </Box>
                    </Box>
                </Grid>
        
        
            
 
        
    )
}

export default Myprofile;