import React, { useContext, useEffect, useState, useRef } from "react";
import { Box, Grid, Button, Typography, makeStyles, Card, CardActionArea, IconButton } from "@material-ui/core";
import Cookies from "universal-cookie";
import axios from "axios";
import Message from "../components/messages";
import { Link, useHistory } from "react-router-dom";
import Conversation from "../components/conversation";
import UserContext from "../userContext";
import BackspaceIcon from '@material-ui/icons/Backspace';
import AccountBoxIcon from '@material-ui/icons/AccountBox';





function Messager(){

    const cookies = new Cookies();
    const [messageData, setMessageData] = useState([]);
    const [currentMessage, setMessage] = useState(null);
    const [conversationData, setConversationData] = useState([]);

    const currentUser = useContext(UserContext);

    const useStyles = makeStyles(
        {
            messageLink: {
                textDecoration: "none",
               
            },
            conversationHeader: {
                display: "flex",
                alignItems: "center"
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
            
            setMessageData(response.data.sort((a,b) => getLastMessage(a).date > getLastMessage(b).date ? -1 : 1));


        })
        .catch((err) => console.log(err))
    },[])

    console.log("Message data : ",messageData);

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

    function getConversationName(conversationObject, currentUser){
        console.log("TU Sam")
        if(conversationObject.user1 === currentUser){
            const returnData = {
                username : conversationObject.user2,
                fullName : conversationObject.user2fullName
            }
            return returnData;
        }
        
        if(conversationObject.user2 === currentUser){
            const returnData = {
                username : conversationObject.user1,
                fullName : conversationObject.user1fullName
            }
            return returnData;
        }

    }

    const [fullName, setFullName] = useState("");
    const [name, setName] = useState("");

    function handleProfileClick(){
        history.push("/home/profile/" + name);
    }
    
    /* {message.messages[message.messages.length - 1].sender} */
   
    
    return(
        <Grid container item direction="column" xs={12}>
            <Box border={1} >
                <Box className={classes.conversationHeader}>
                    <IconButton onClick={handleBackClick}>
                        <BackspaceIcon>
                        </BackspaceIcon>
                    </IconButton>
                    {
                        currentMessage !== null && 
                        <Button onClick={handleProfileClick} variant="outlined" color="secondary" endIcon={<AccountBoxIcon color="secondary" ></AccountBoxIcon>}>{fullName}</Button>
                    }
                </Box>
                <Box borderTop={1} height="700px" overflow="auto" width="100%">
                    {
                        currentMessage === null ?
                        messageData.map((message) =>
                        <Card><CardActionArea onClick={() => {
                            setMessage(message._id);
                            setFullName(getConversationName(message, currentUser).fullName);
                            setName(getConversationName(message, currentUser).username);
                        }}>
                        <Message  name={getConversationName(message, currentUser).username} fullName={getConversationName(message, currentUser).fullName}  lastMessage={message.messages[message.messages.length - 1].message}></Message></CardActionArea></Card>)
                        :
                        <Conversation mailHolder={currentUser} id={currentMessage}></Conversation>
                    }

                   
                    
                </Box>
            </Box>
        </Grid>

    )
}

export default Messager;