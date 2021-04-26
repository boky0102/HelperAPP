// Packages

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const axios = require('axios');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/jobPictures/");
    },

    filename: function(req,file,cb) {
        cb(null, new Date().toISOString().split(":").join("-") + file.originalname);
    } 
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});



const options = {

}

// Server modules
const auth =  require("./authenticate.js");
const distance = require("./distanceCalc");
const titleDiff = require("./searchLogic");



// Server and database initialization


const app = express();





app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/public/jobPictures",express.static(__dirname + "/public/jobPictures"));


mongoose.connect('mongodb://localhost/messUsersDB', {useNewUrlParser: true, useUnifiedTopology: true});


const userSchema = new mongoose.Schema({
    userName: String,
    firstAndLastName: String,
    password: String,
    dateCreated: String,
    streetAndNum: String,
    city: String,
    country: String,
    coordinates: {
        x: Number,
        y: Number
    },
    reviews: []

})


const User = mongoose.model('User', userSchema);


const jobSchema = new mongoose.Schema({
    username: String,
    title: String,
    description: String,
    category: String,
    deadline: String,
    budget: Number,
    streetAndNum: String,
    city: String,
    country: String,
    imgSrc: String,
    coordinates: {
        x: Number,
        y: Number
    },
    distance: String


});



const Job = mongoose.model('Job', jobSchema);

const messageSchema = new mongoose.Schema({
    from: String,
    to: String,
    viewedBySender: Boolean,
    viewedByReciever: Boolean,
    message: String
});

const Message = mongoose.model('Message', messageSchema);


const Notification = mongoose.model('Notification', jobSchema);
const notificationSchema = new mongoose.Schema({
    user: String,
    notificationMessage: String
})




function sortByDiffIndex(jobA, jobB){
    if(jobA.titleDiffIndx >= jobB.titleDiffIndx){
        return 1;
    } else{
        return -1;
    }
}



function filterJobsByTitle(jobs,title){


    return new Promise((resolve, reject) => {
        const filteredJobs = [];

   

        jobs.forEach((job) => {
        

        const titleDiffIndx = titleDiff.getTitleDiffIndex(job.title, title);
        
        if(titleDiffIndx > 1){
            const jobWthIndx = {
                username: job.username,
                budget: job.budget,
                title: job.title,
                category: job.category,
                description: job.description,
                imgSrc: job.imgSrc,
                id: job.id,
                deadline: job.deadline,
                diffIndx: titleDiffIndx
            };
            
            filteredJobs.push(jobWthIndx);
        }

        const returnArray = filteredJobs.sort((a,b) => (a.diffIndx > b.diffIndx ? -1 : 1));

        resolve(returnArray);


    })


        
    })

}


// ROUTING

app.get("/", (req,res) => {
    User.find((err, users) => {
        res.send(users);
    })
})




app.get("/users/:usrName", (req,res) => {
    const reqUser = req.params.usrName;

    User.findOne({userName: reqUser}, (err, user) => {
        if(err){
            res.send(err);
        } else{
            res.send(user);
        }
    })

})

app.post("/register", (req,res) =>{
    const reqUsername = req.body.username;
    const reqPassword = req.body.password;


    console.log(req.body);


    

    bcrypt.hash(reqPassword, 10 , (err, hash) => {
        User.findOne({userName: reqUsername}, (err, user) => {
            if(err){
                res.send(err);
                console.log("Tu zapelo");
            } else if(user){
                res.send("User exists");
                console.log("Zapelo 2");
            } else if(!user){
                const hashedPassword = hash;
                
                
                const newUser = new User({
                userName: reqUsername,
                password: hashedPassword,
                dateCreated: new Date()
                });

                const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

                var options = {
                method: 'GET',
                params: {limit: '1', namePrefix: req.body.city},
                headers: {
                    'x-rapidapi-key': process.env.RAPID_API,
                    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
                }
                };

                axios.get(url,options)
                .then((response) => {

                    const data = response.data.data;
            

                    if(data.length === 1){
                        console.log("DOBAR")
                        const x = data[0].latitude;
                        const y = data[0].longitude;

                        console.log(hash);

                        newUser.coordinates.x = x;
                        newUser.coordinates.y = y;

                        
                        
                        newUser.streetAndNum = req.body.streetAndNum;
                        newUser.city = req.body.city;
                        newUser.country = req.body.country;
                        newUser.firstAndLastName = req.body.firstAndLastName
                        
                        newUser.save();

                        res.send("OK")
                        }
                        else{
                            console.log("NEDOBAR")
                            res.status(400).send();
                        }

                })
                .catch(console.log("Bad request"));

                
                
                
                
                }
                })
    })
    
}
);

app.post("/login", (req,res) => {
    const reqUsername = req.body.username;
    const reqPassword = req.body.password;



    User.findOne({userName: reqUsername}, (err, user) => {
        if(err){
            res.send(err);
        } else if (user){
            bcrypt.compare(reqPassword, user.password, (error, same) => {
                if(err){
                    console.log(err);
                    
                } else{
                    if(same){
                        let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                            algorithm: 'HS512',
                            expiresIn: "1 week"
                            })

                        
                        
                        res.json({token: token, username: user.userName});
                        
                    }else{
                    res.status(401).send();
                }}
                
            })
        } else if(!user){
            res.status(401).send();
        }

    })

    
    }
)

app.get("/tajna", [auth.isAuth], (req,res) => {
    res.json(req.jwt.userName);
    
    
})




app.post("/newJob", upload.single("productImage") ,(req,res) => {



    const imgPathPretty = req.file.path.replace("\\", "/");

    

    const newJob = new Job({
        username: req.body.username,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        deadline: req.body.deadline,
        budget: req.body.budget,
        streetAndNum: req.body.streetAndNum,
        city: req.body.city,
        country: req.body.country,
        imgSrc: imgPathPretty
    });

    const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';

    var options = {
        method: 'GET',
        params: {limit: '1', namePrefix: req.body.city},
        headers: {
          'x-rapidapi-key': process.env.RAPID_API,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
      };

    axios.get(url,options)
    .then((response) => {
        const data = response.data.data;
        

        if(data.length === 1){
            console.log("DOBAR")
            const x = data[0].latitude;
            const y = data[0].longitude;
            newJob.coordinates.x = x;
            newJob.coordinates.y = y;
            newJob.save();
            res.status(200).send();

        }else{
            console.log("NEDOBAR")
            res.status(400).send();
        }
        

    })
    .catch(err => console.log("ERROR TU ALO",err));
    
    
})

app.get("/find/:title&:category&:distance&:username",(req,res) => {

    console.log(req.params.title);
    console.log(req.params.category);
    console.log(req.params.distance);
    console.log(req.params.username);

    const jobsArray = [];

    if(req.params.title === "none"){

        if(req.params.category === "none" && req.params.distance === "none" && req.params.username === "none"){
            Job.find({}, (err, jobs) => {
                res.send(jobs)
            })

        }

        else if(req.params.category !== "none" && req.params.distance === "none" && req.params.username === "none"){
            Job.find({category: req.params.category}, (err, jobs) => {
                res.send(jobs);
            })
        }

        else if(req.params.category !== "none" && req.params.distance !== "none" && req.params.username !== "none"){

            

            Job.find({category: req.params.category}, (err, jobs) => {
                
                if(jobs){
                    
                    User.findOne({userName: req.params.username}, (err, user) => {
                        if(user){

                            var filteredJobs = [];

                            if(user.userName !== req.params.username){

                                
                                jobs.forEach((job) => {
                                    if(distance.getDistance(job.coordinates.x,job.coordinates.y,user.coordinates.x,user.coordinates.y) <= req.params.distance){
                                        job.distance = distance.getDistance(job.coordinates.x,job.coordinates.y,user.coordinates.x,user.coordinates.y)
                                        filteredJobs.push(job);
                                    }
                                })
                                 res.send(filteredJobs);


                            }

                            
                        
                        }else{
                            console.log("Didnt find user");
                        }
                        
                    })
                }

            })

        }

        else if(req.params.category === "none" && req.params.distance !== "none" && req.params.username !== "none"){

            Job.find({}, (err, jobs) => {
                
                if(jobs){
                    
                    User.findOne({userName: req.params.username}, (err, user) => {
                        if(user){

                            var filteredJobs = [];

                            if(user.userName !== req.params.username){

                                jobs.forEach((job) => {
                                    if(distance.getDistance(job.coordinates.x,job.coordinates.y,user.coordinates.x,user.coordinates.y) <= req.params.distance){
                                        job.distance = distance.getDistance(job.coordinates.x,job.coordinates.y,user.coordinates.x,user.coordinates.y);
                                        filteredJobs.push(job);
                                    }
                                })


                            }
                            
                            
                            
                            res.send(filteredJobs);
                            


                        }else{
                            console.log("Didnt find user");
                        }
                        
                    })
                }
            })

        }

        else if(req.params.category === "none" && req.params.distance === "none" && req.params.username !== "none"){
            Job.find({}, (err,jobs) => {
                if(err){
                    console.log("Err");
                }
                else{
                    console.log("TU SAM USO")
                    
                    const filteredJobs = [];
                    jobs.forEach((job) => {
                        console.log(job.username, " ", req.params.username);
                        if (job.username != req.params.username){
                            filteredJobs.push(job);
                        }
                    })
                    if(filteredJobs.length>0){
                        res.send(filteredJobs);
                    }
                    else{
                        res.status(404).send();
                    }
                }
            })
        }



    }
    else if(req.params.title !== "none"){
        if(req.params.category === "none" && req.params.distance === "none" && req.params.username === "none"){

            Job.find({}, (err, jobs) => {
                filterJobsByTitle(jobs, req.params.title).then((response) => {
                    res.send(response);
                });
                
            })
        }

        else if (req.params.category !== "none" && req.params.distance ==="none" && req.params.username === "none"){

            Job.find({category: req.params.category}, (err, jobs) => {
                filterJobsByTitle(jobs, req.params.title).then((response) => {
                    res.send(response);
                })
            })

        }
        else if (req.params.category !== "none" && req.params.distance !== "none" && req.params.username !== "none"){
            Job.find({category: req.params.category}, (err,jobs) => {
                if(jobs){
                    User.findOne({userName: req.params.username}, (err, user) => {

                        if(user){


                            if(user.username !== req.params.username){
                                let filteredJobs = [];
                                jobs.forEach((job) => {
                                
                                if(distance.getDistance(job.coordinates.x,job.coordinates.y,user.coordinates.x,user.coordinates.y) <= req.params.distance){
                                    job.distance = distance.getDistance(job.coordinates.x,job.coordinates.y,user.coordinates.x,user.coordinates.y)
                                    filteredJobs.push(job);
                                }
                                })
                                filterJobsByTitle(filteredJobs, req.params.title).then((response) => {
                                res.send(response);
                                })


                            }
                            else{
                                res.send("No data");
                            }
                            
                        }
                    })
                }
            })

        }
        else if (req.params.category === "none" && req.params.distance !== "none" && req.params.username !== "none"){

            Job.find({}, (err,jobs) => {
                if(jobs){
                    User.findOne({userName: req.params.username}, (err, user) => {
                   
                        if(user){

                            if(user.userName !== req.params.username){

                                let filteredJobs = [];
                                jobs.forEach((job) => {
                                
                                if(distance.getDistance(job.coordinates.x,job.coordinates.y,user.coordinates.x,user.coordinates.y) <= req.params.distance){
                                    job.distance = distance.getDistance(job.coordinates.x,job.coordinates.y,user.coordinates.x,user.coordinates.y)
                                    filteredJobs.push(job);
                                }
                                })
                                filterJobsByTitle(filteredJobs, req.params.title).then((response) => {
                                    res.send(response);
                                })


                            }
                            else{
                                res.send("No data");
                            }
                            
                        }
                    })
                }
            })

        }

        else if(req.params.category === "none" && req.params.distance === "none" && req.params.username !== "none"){
            Job.find({}, (err,jobs) => {
                if(err){
                    console.log(err);
                }
                else{
                    const filteredJobs = [];
                    jobs.forEach((job) => {
                        if(job.username !== req.params.username){
                            filteredJobs.push(job);
                        }
                    });
                    if(filteredJobs.length > 0){
                        filterJobsByTitle(filteredJobs, req.params.title)
                        .then((response) => {
                            res.send(response);
                        });
                        
                    }
                    else{
                        res.status(404).send();
                    }
                }

            })
        }

    }

    
})
    


app.get("/job/:id", (req,res) => {

    const id = req.params.id;

    Job.findOne({_id: id}, (err, job) => {
        if(err){
            console.log(err);
        }
        else{
            User.findOne({userName: job.username}, (err, user) => {
                
                if(user){
                    const data = {
                        jobData: job,
                        userData: {
                            name: user.firstAndLastName,
                            username: user.userName,
                            reviews: user.reviews
    
                        }
                    }
                    res.send(data);

                }

                else{
                    console.log("Nema takvog usera");
                }
                
            })
        }
    })

})

app.post("/message", [auth.isAuth] , (req,res) => {
    const username = req.jwt.userName;
    const message = req.body.message;
    const reciever = req.body.reciever;
    console.log(username, "-", reciever, ":", message);

    if(username !== "" && message !== "" && reciever !== ""){
        const newMessage = new Message;
        newMessage.from = username;
        newMessage.to = reciever;
        newMessage.message = message;
        newMessage.save();
        res.status(200).send();
    }
    else{
        res.status(400).send();
    }
})




















app.listen(3001, () => {
    console.log("Server running on port 3001");
})