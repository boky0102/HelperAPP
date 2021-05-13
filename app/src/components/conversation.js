import { Avatar, Box, Grid, makeStyles, TextField, Typography, IconButton } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import avatar from "../static/picture.jpg";
import SendIcon from '@material-ui/icons/Send';

function Conversation(props){
    console.log("MailHolder: ", props.mailHolder);
    const cookie = new Cookies();

    const [conversationData, setConData] = useState([]);

    const useStyle = makeStyles({
        avatStyle: {
            width: "50px",
            height: "50px",
            marginLeft: "20px",
            marginRight: "10px",
            marginTop: "10px"
        },
        avatStyleReverse: {
            width: "50px",
            height: "50px",
            marginLeft: "10px",
            marginRight: "20px",
            marginTop: "10px"
        },

        textStyle: {
            marginTop: "10px",
            marginRight: "20px"
        },

        textStyleReverse: {
            marginTop: "10px",
            marginLeft: "20px"
        },

        hideScrollbar: {
            msOverflowStyle: "none",
            scrollbarWidth: "none"
        }
    })

    const [messageSuccess, setMessageSuccess] = useState(false);

    const classes = useStyle();

    

    useEffect(() => {
        const url = "http://localhost:3001/conversation/" + props.id;
        const token = cookie.get('token');
        axios.get(url, {headers: {'authorization': `Bearer ${token}`}})
        .then((response) => {
            console.log(response.data);
            setConData(response.data);

            
        })
        .catch((err) => console.log(err));
    }, [messageSuccess])

    const [avatars, setAvatars] = useState({
        holderAvatarSrc: "",
        otherAvatarSrc: ""
    });

    function findOther(conversation, mailholder){
        return new Promise((resolve,reject) => {
            for(var i=0; i<conversation.length; i++){
                if(conversation[i].sender !== mailholder){
                    console.log("U promisu",conversation[i].sender)
                    resolve(conversation[i].sender)
                }
            }
        })
    }

    
    


    

    useEffect(() => {
        
        const urlHolder = "http://localhost:3001/avatar/" + props.mailHolder;
        axios.get(urlHolder)
        .then((response) => {
            setAvatars((prevAvat) => {
                return{
                    ...prevAvat,
                    holderAvatarSrc: response.data
                }
            })
        })
        .catch((err) => console.log(err));

        findOther(conversationData, props.mailHolder)
        .then((other) => {
            const urlOther = "http://localhost:3001/avatar/" + other;
            console.log(urlOther);
            axios.get(urlOther)
            .then((response) => {
            console.log("SEVER RES :", response);
            setAvatars((prevAvat) => {
                return{
                    ...prevAvat,
                    otherAvatarSrc: response.data
                }
            })
        })
        .catch(err => console.log(err))

    }).catch(err => console.log(err));

        

        

    },[conversationData])

    const [message, setMessage] = useState("");

    function handleMessageChange(event){
        setMessage(event.target.value);
        console.log(message);
    }

   

    function handleMessageSent(event){
        event.preventDefault();
        const token = cookie.get('token');
        const url = "http://localhost:3001/conversation/message";
        const data = {
            message: message,
            id: props.id
        }
        
        axios.post(url, data, {headers: {'authorization': `Bearer ${token}`}})
        .then((response) => {
            if(response.status === 200){
                console.log("Message sent");
                setMessageSuccess(true);
            }
            else{
                console.log("Message not sent");
            }
        })
        .catch((err) => {
            console.log(err);
        })

    }

    

    console.log(avatars);
    
    return(
        <Grid item container xs={12}>
            <Box display="flex" flexDirection="column"  justifyContent="space-between" width="inherit">
                <Box display="flex" flexDirection="column" width="inherit" height="530px" overflow="auto" mb={2} className={classes.hideScrollbar}>
                    {conversationData.map((message) => {
                        if(message.sender === props.mailHolder){
                            return(
                                <Box display="flex" flexDirection="row"  >
                                    <Box>
                                        <Avatar src={avatars.holderAvatarSrc} className={classes.avatStyle}></Avatar>
                                    </Box>
        
                                    <Box alignSelf="center">
                                        <Typography className={classes.textStyle}>{message.message}</Typography>
                                    </Box>
                                </Box>
                            )

                        }
                        else{
                            return(
                                <Box display="flex" flexDirection="row" width="inherit" justifyContent="flex-end" >
        
                                    <Box alignSelf="center">
                                        <Typography className={classes.textStyleReverse}>{message.message}</Typography>
                                    </Box>

                                    <Box>
                                        <Avatar src={avatars.otherAvatarSrc} className={classes.avatStyleReverse}></Avatar>
                                    </Box>
                                    
                                </Box>
                            )
                        }
                        
                    })}
                    
                </Box>

                <Box>
                    <form onSubmit={handleMessageSent}>
                        <Box ml={2} mr={2} >
                            <TextField  required fullWidth rows="4" multiline variant="outlined" color="secondary" label="Message"  onChange={handleMessageChange} InputProps={{endAdornment:
                        <IconButton className={classes.sendBtn} type="submit">
                          <SendIcon></SendIcon>
                        </IconButton>}}>


                            </TextField>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Grid>
    )



}


export default Conversation;