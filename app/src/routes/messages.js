import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, Button, Typography, makeStyles, Card, CardActionArea, IconButton } from "@material-ui/core";
import Cookies from "universal-cookie";
import axios from "axios";
import Message from "../components/messages";
import { Link, useHistory } from "react-router-dom";
import Conversation from "../components/conversation";
import UserContext from "../userContext";
import BackspaceIcon from '@material-ui/icons/Backspace';





function Messager(){

    const cookies = new Cookies();
    const [currentInbox, setInbox] = useState("recieved");
    const [messageData, setMessageData] = useState([]);
    const [lastMessageIndx, setMessageIndx] = useState(false);
    const [currentMessage, setMessage] = useState(null);
    const [conversationData, setConversationData] = useState([]);

    const currentUser = useContext(UserContext);

    const useStyles = makeStyles(
        {
            messageLink: {
                textDecoration: "none",
               
            }
        }
    )

    const classes = useStyles();

    function getLastMessage(con){
        const last = con.messages[con.messages.length-1];
        return last;
    }


    useEffect(() => {
        const token = cookies.get('token');
        const url="http://localhost:3001/inbox";
        axios.get(url, {headers: {'authorization': `Bearer ${token}`}})
        .then((response) => {
            console.log("tu sam",response.data);
            setMessageData(response.data.sort((a,b) => getLastMessage(a).date > getLastMessage(b).date ? -1 : 1));


        })
        .catch((err) => console.log(err))
    },[])



    function handleClick(event){
        console.log(event.target.value);
    }

    useEffect(() => {
        
        messageData.forEach((conversation) => {
            if (conversation._id === currentMessage){
                setConversationData(conversation.messages);
            }
        
        })
        console.log(conversationData);

    },[setMessage, currentMessage])

    function handleBackClick(event){
        if(currentMessage === null){
            history.goBack();
        }
        else if(currentMessage !== null){
            setMessage(null);
        }
    }
    

    console.log(currentMessage);

    const history = useHistory();

    
    
   
    
    return(
        <Grid container item direction="column" xs={12}>
            <Box border={1} >
                <Box color="primary">
                    <IconButton onClick={handleBackClick}>
                        <BackspaceIcon>
                        </BackspaceIcon>
                    </IconButton>
   
                </Box>
                <Box borderTop={1} height="700px" overflow="auto" width="100%">
                    {
                        currentMessage === null ?
                        messageData.map((message) =>
                        <Card><CardActionArea onClick={(e) => setMessage(message._id)}><Message  name={message.messages[message.messages.length - 1].sender} lastMessage={message.messages[message.messages.length - 1].message}></Message></CardActionArea></Card>)
                        :
                        <Conversation mailHolder={currentUser} id={currentMessage}></Conversation>
                    }

                   
                    
                </Box>
            </Box>
        </Grid>

    )
}

export default Messager;