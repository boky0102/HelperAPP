import React, { useEffect, useState } from "react";
import {Box, Grid, Button, Typography} from "@material-ui/core";
import Cookies from "universal-cookie";
import axios from "axios";
import Message from "../components/messages";





function Messager(){

    const cookies = new Cookies();
    const [currentInbox, setInbox] = useState("recieved");
    const [messageData, setMessageData] = useState([]);
    const [lastMessageIndx, setMessageIndx] = useState(false);

    useEffect(() => {
        const token = cookies.get('token');
        const url="http://localhost:3001/inbox";
        axios.get(url, {headers: {'authorization': `Bearer ${token}`}})
        .then((response) => {
            console.log(response.data);
            setMessageData(response.data);

        })
        .catch((err) => console.log(err))
    },[])

   
    
    return(
        <Grid container item direction="column">
            <Box border={1} height="700px" overflow="auto">
                <Box color="primary">
                    <Button onClick={(e) => setInbox("sent")}>Sent</Button>
                    <Button onClick={(e) => setInbox("recieved")}>Recieved</Button>
                </Box>
                <Box borderTop={1}>
                    {messageData.map((message) =>
                            <Message name={message.messages[message.messages.length - 1].sender} lastMessage={message.messages[message.messages.length - 1].message}></Message>
                        
                    )}
                </Box>
            </Box>
        </Grid>

    )
}

export default Messager;