import { Box, Button, Card, Grid, Typography } from "@material-ui/core"
import React, { useState } from "react"
import AppliedJobs from "./appliedJobs";
import MyJobs from "./myJobs";
import ScheduledJobs from "../components/scheduledJobs";

function Jobs(){

    const [currentMenu, setCurrentMenu] = useState("myjobs")

    function handleMyJobClick(event){
        setCurrentMenu("myjobs");
    }

    function handleAppliedClick(event){
        setCurrentMenu("applied");
    }

    function handleScheduledClick(event){
        setCurrentMenu("scheduled")
    }

    return(
        <Grid container xs={12}>
            <Grid item xs={12}>
                <Box display="flex" width="100%" >
                    <Button onClick={handleMyJobClick} variant={ currentMenu === "myjobs" ? "contained" : "" } color={ currentMenu === "myjobs" ? "primary" : "" } fullWidth><Typography>My jobs</Typography></Button>
                    <Button onClick={handleAppliedClick} variant={ currentMenu === "applied" ? "contained" : "" } color={ currentMenu === "applied" ? "primary" : "" } fullWidth><Typography>Pending job applications</Typography></Button>
                    <Button onClick={handleScheduledClick} variant={ currentMenu === "scheduled" ? "contained" : "" } color={ currentMenu === "scheduled" ? "primary" : "" } fullWidth><Typography>Scheduled jobs</Typography></Button>
                </Box>

            </Grid>
            <Grid item container xs={12}>
                <Box width="100%" borderTop={1} borderColor={"grey.300"}>
                    {currentMenu === "myjobs" && <MyJobs ></MyJobs>}
                    {currentMenu === "applied" && <AppliedJobs></AppliedJobs>}
                    {currentMenu === "scheduled" && <ScheduledJobs></ScheduledJobs>}
                </Box>

            </Grid>
        </Grid>
    )
}





export default Jobs