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
    password: String,
    dateCreated: String,
    friends: String

})


const User = mongoose.model('User', userSchema);


const jobSchema = new mongoose.Schema({
    username: String,
    title: String,
    decription: String,
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
    }


});

const Job = mongoose.model('Job', jobSchema);


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

    console.log(reqPassword, reqUsername);

    bcrypt.hash(reqPassword, 10 , (err, hash) => {
        User.findOne({userName: reqUsername}, (err, user) => {
            if(err){
            res.send(err);
            } else if(user){
            res.send("User exists");
            } else{
            const hashedPassword = hash;
            console.log(hashedPassword);
            
            const newUser = new User({
            userName: reqUsername,
            password: hashedPassword,
            dateCreated: new Date()
            });
            
            newUser.save();
            console.log("New user created");
            res.send("OK");
            
            }
            })
    })
    
}
);

app.post("/login", (req,res) => {
    const reqUsername = req.body.username;
    const reqPassword = req.body.password;

    console.log(reqUsername, reqPassword);

    User.findOne({userName: reqUsername}, (err, user) => {
        if(err){
            res.send(err);
        } else if (user){
            bcrypt.compare(reqPassword, user.password, (error, same) => {
                if(err){
                    res.send(err);
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
        }
    })

    
    }
)

app.get("/tajna", [auth.isAuth], (req,res) => {
    res.json(req.jwt.userName);
    
    
})

app.get("/find-adress/:adress", (req,res) => {
    const adress = req.params.adress;
    const geoApiKey = process.env.GEO_CODE;

    const url ='https://app.geocodeapi.io/api/v1/autocomplete?apikey='+ geoApiKey +'&text='+ adress + '&size=1' + '&layers=address';
    
    axios.get(url)
    .then((response) => {
        console.log(response.data.features);

        const labelArray = [];

        const adressData = response.data.features;
        adressData.forEach((adress) => {
            console.log("ADRESA :", adress);
            labelArray.push(adress.properties.label);
        })
        
        res.send(labelArray);
    
    }).catch((err) => {
        res.send("Not found");
    })

})


app.post("/newJob", upload.single("productImage") ,(req,res) => {

    console.log(req.file);
    console.log(req.body);

    const imgPathPretty = req.file.path.replace("\\", "/");

    console.log("Ugly :", req.file.path);
    console.log("Pretty :", imgPathPretty)

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

app.get("/find/:title?&:category?&:distance?", (req,res) => {

    console.log(req.params.title);
    console.log(req.params.category);
    console.log(req.params.deadline);
    console.log(req.params.distance);

    const jobsArray = [];

    if(req.params.title != "?"){
        Job.find({title: /^/},(err, jobs) => {
            if(!err){
                console.log(jobs);
            } else{
                console.log("Error ...", err);
            }
            
        })

    }

    



    res.status(200).send();
})
    























app.listen(3001, () => {
    console.log("Server running on port 3001");
})