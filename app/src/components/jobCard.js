import { Grid, Box, Typography, Link,} from "@material-ui/core";

import React, { useState } from "react";




function JobCard(){

    
    const a  = "Dobar dan moze li mi netko pomoci popraviti ovu ves masinu vec je jako stara treba mi hitno pomoc molim vas pomozite ljudi hajde bolan";
    return (
        
        <Grid container item direction="row" xs={12}>
            
            <Grid item xs={2}>
                <Box mt={2}>
                    Slika
                </Box>
                
            </Grid>
            <Grid item container xs={10} direction="column">
                
                <Grid item xs={12} ><Box mb={2} mt={1}><Typography variant="h6"><Link href="/job" color="secondary" ><b>Pomoc oko drva</b></Link></Typography></Box></Grid>
                <Grid item container xs={12}>
                <Grid item container xs={10} direction="column">
                    <Grid item xs={12}>
                        <Typography>{a.substring(0,250)+" ..."}</Typography>
                    </Grid>
                    <Box mb={2} mt={1}>
                        <Grid item container direction="row" xs={12}>
                            
                            <Grid item xs={4}>
                            <Typography>Category:</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>Deadline</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography>Distance: </Typography>
                            </Grid>
                            
                        </Grid>
                    </Box>
                </Grid>
                <Grid alignContent="center" item xs={2}>
                    <Box ml={2}>
                    <Typography color="primary"><b>100$</b></Typography>
                    </Box>
                </Grid>
                </Grid>
            </Grid>
            
        </Grid>
        
    )
}

export default JobCard;

