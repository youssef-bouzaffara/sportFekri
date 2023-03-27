// import express module
const express = require("express");

// import Bcrypt module
const bcrypt = require("bcrypt");

// import jsonwebtoken module
const jwt = require("jsonwebtoken");

// import Multer module
const multer = require("multer");

// import Path module
const path = require("path");

// import body-parser module
const bodyParser = require("body-parser");

// import mongoose module
const mongoose = require("mongoose");
// sportFekriDB => DB name ---- création automatique
mongoose.connect("mongodb://127.0.0.1:27017/sportFekriDB");

//  import axios module pour communiquer entre l'app.js et une app externe (n'importe)
const axios= require("axios");

// create an express application
const app = express();

// Import authenticate
const authenticate= require("./middelware/authenticate")


// ------------ Configure Body-parser
// Send JSON responses
//  .use  pour la configuration de l'app
app.use(bodyParser.json());
// Get objects from Requests
app.use(bodyParser.urlencoded({ extended: true }));



// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});



// configuration path : remplacer backend/images   par   /avatars
app.use('/avatars', express.static(path.join('backend/images')))


const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}

const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});

//   import Match Model
const Match = require("./models/match");

//   import Player Model
const Player = require("./models/player");

//   import User Model
const User = require("./models/user");

//   import Team Model
const Team = require("./models/team");
const { json } = require("body-parser");

//   Business Logic : Add object
let matchesTab = [
    { id: 1, scoreOne: 2, scoreTwo: 0, teamOne: "FCB", teamTwo: "RMA" },
    { id: 2, scoreOne: 1, scoreTwo: 0, teamOne: "CA", teamTwo: "EST" },
    { id: 3, scoreOne: 2, scoreTwo: 0, teamOne: "LIV", teamTwo: "PSG" },
    { id: 4, scoreOne: 2, scoreTwo: 3, teamOne: "MCI", teamTwo: "MAN" }
];

// pour traiter un request
//   app.MethodeHTTP("/path",(req,res) =>{

//   --------- TRAITEMENT -----------

//   })



// --------------------------------------------Traitement Logique Matches 

// Busines logic : Add Match
app.post("/matches", (req, res) => {

    console.log("Here BL: Add Match");

    // create match var (Type Match) =>
    // var to be saved into matches collection 
    // req.body doit être compatible avec les attributs du model
    // let match = new Match(req.body); 

    // 2 ème méthode
    let match = new Match({
        scoreOne: req.body.scoreOne,
        scoreTwo: req.body.scoreTwo,
        teamOne: req.body.teamOne,
        teamTwo: req.body.teamTwo
    });

    console.log("Here Match :", match);

    // save match Intp matches collection
    match.save();

    // response sous format JSON
    res.json({ message: "Added with success", isAdded: true });
});

// Busines logic : Get All Matches
app.get("/matches", authenticate, (req, res) => {
    console.log("Here BL : Get All Matches");

    Match.find().then((data) => {
        res.json({ matches: data, message: "OK!" });
    })

});

// Busines logic : Get Match By ID
app.get("/matches/:id", (req, res) => {
    console.log("Here BL : Get Match BY ID");
    let id = req.params.id;
    Match.findOne({ _id: id }).then(
        (doc) => {
            res.json({ match: doc, isFinded: true });
        })
});

// Busines logic : Delete Match By ID
app.delete("/matches/:id", (req, res) => {
    let id = req.params.id;
    for (let i = 0; i < matchesTab.length; i++) {
        if (matchesTab[i].id == id) {

            matchesTab.splice(i, 1);
            break;
        }

    }

    res.json({ msg: `Match N°${id} is deleted !` })
});

// Busines logic : Edit Match 
app.put("/matches", (req, res) => {
    console.log("Here BL : Edit Match");
    let newMatch = req.body;
    Match.updateOne({ _id: newMatch._id }, newMatch).then(
        (editResp) => {
            console.log(editResp);
            if (editResp.nModified == 1) {
                res.json({ msg: "Match edited with success !" });
            };
        }
    );

});

// Busines logic : Search Matches by Scores
app.post("/matches/searchByScores", (req, res) => {
    console.log("Here BL : Search Matches By Scores");
    let ob = req.body;
    let tabOfSearch = [];
    for (let i = 0; i < matchesTab.length; i++) {
        if (matchesTab[i].scoreOne == ob.scoreOne && matchesTab[i].scoreTwo == ob.scoreTwo) {
            tabOfSearch.push(matchesTab[i]);
        }
    }

    res.json({ matches: tabOfSearch, message: "OK!" });

});



// --------------------------------------------Traitement Logique Players 

// Busines logic : Add Player
app.post("/players", (req, res) => {
    console.log("Here BL: Add Player");

    var player = new Player({
        playerName: req.body.playerName,
        age: req.body.age,
        position: req.body.position,
        number: req.body.number
    })

    player.save();

    res.json({ message: "Added with success", isAdded: true });


});

// Busines logic : Get All Players
app.get("/players", (req, res) => {
    console.log("Here BL : Get All Players");

    Player.find().then(
        (data) => {

            console.log(data);
            res.json({ players: data, msg: "ok" });
        }
    )
});

// Busines logic : Get Team By ID
app.get("/players/:id", (req, res) => {
    console.log("Here BL : Get Player BY ID");
    let id = req.params.id;
    Player.findOne({ _id: id }).then(
        (doc) => {
            res.json({ player: doc, playerFinded: true });
        }
    )
});

// Busines logic : Delete Player By ID
app.delete("/players/:id", (req, res) => {
    console.log("Here BL : Delete Player By ID");
});

// Busines logic : Edit Player 
app.put("/players", (req, res) => {
    console.log("Here BL : Edit Player");
});


// --------------------------------------------Traitement Logique Users 

// Busines logic : Login User
//  0=> Check Email
//  1=> Check Pwd
//  2=> Welcome
app.post("/allUsers/signin", (req, res) => {

    console.log("Here BL: Login User", req.body);
    let findedUser = {};
    User.findOne({ email: req.body.email }).then(
        (doc) => {
            console.log("Here searched object by Email :", doc);
            findedUser = doc;
            if (!doc) {
                res.json({ message: "0"});
            }

            return bcrypt.compare(req.body.pwd, doc.pwd);

        }
    ).then(
        (pwdResult) => {
            console.log("Here pwd result :", pwdResult);

            if (!pwdResult) {

                res.json({ message: "1"});

            } else {

                const token = jwt.sign(
                    {
                    email: findedUser.email,
                    userId: findedUser._id,
                    userRole: findedUser.role,
                    },
                    "Testing" ,
                    { expiresIn: "3min" }
                    );

                    let userToSend = {
                    id: findedUser._id,
                    firstName: findedUser.firstName,
                    lastName: findedUser.lastName,
                    role: findedUser.role,
                    jwt: token,
                    expiresIn: 180,
                    };

                res.json({ message: "2", user: userToSend });

            }

        }
    )

});

// Busines logic : Signup User
app.post("/allUsers/subscription", multer({ storage: storageConfig }).single('img'), (req, res) => {
    console.log("Here BL: Signup User");
    console.log("Here into Signup : ", req.body);

    bcrypt.hash(req.body.pwd, 8).then(
        (cryptedPwd) => {
            let user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pwd: cryptedPwd,
                role: req.body.role,
                avatar: `http://localhost:3000/avatars/${req.file.filename}`
            });

            user.save((error, doc) => {
                console.log("Here error", error);
                console.log("Here document", doc);

                if (doc) {
                    res.json({ message: "User added with success" })
                } else {
                    res.json({ message: "Error" })
                }
            });
        }
    )




});


// Busines logic : Get Profile By ID
app.get("/allUsers/updateProfile/:idUser", (req, res) => {
    console.log("Here BL : Get Profile By ID");
    User.findOne({ _id: req.params.idUser }).then(

        (doc) => {
            console.log("here response ", doc);
            if (doc) {
                res.json({ user: doc, isFinded: true });
            } else {
                res.json({ user: doc, isFinded: false });
            }

        }
    )

});

// Busines logic : Edit Profile 
// Messag Type : 
// 0 =>> Error : user not finded is DB
// 1 =>> Error : Can not edit Profile
// 2 =>> Error : Old password is not matching
// 3 =>> Error : update with Success

app.put("/allUsers", (req, res) => {
    console.log("Here BL : Edit Profile", req.body);
    let updatedUser = {};
    User.findOne({ _id: req.body._id }).then(
        (doc) => {
            console.log("Here doc finded", doc);
            if (!doc) {
                res.json({ msg: "Could not find you in Data", typeResp: "0" });
            } else {
                return bcrypt.compare(req.body.oldPwd, doc.pwd)
            }
        }
    ).then(
        (pwdResultCheck) => {
            console.log("here pwd check part :", pwdResultCheck);
            if (pwdResultCheck) {
                bcrypt.hash(req.body.newPwd, 8).then(
                    (cryptedPwd) => {
                        console.log("crypted pwd :", cryptedPwd);

                        // Creating an object to be updated from the info recieved from FE
                        updatedUser = {
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            pwd: cryptedPwd,
                            role: req.body.role,
                            avatar: req.body.avatar
                        };

                        User.updateOne({ _id: req.body._id }, updatedUser).then(
                            (response) => {
                                console.log("response of update :", response);
                                if (response.nModified == 1) {
                                    res.json({ msg: "Profile Edited With Success !", typeResp: "3" })
                                }
                                else {
                                    res.json({ msg: "Error, Can not edit Your profile!", typeResp: "1" })
                                }
                            }
                        )
                    }
                )

            } else {
                res.json({ msg: "The old Password entered is not matching with the old Password in DB !", typeResp: "2" });
            }
        }
    )

});


// *********************************** Traitement Logique Teams****************************

// Busines logic : Add Team
app.post("/teams", (req, res) => {
    console.log("Here BL : Add Team , ", req.body);

    let team = new Team({
        teamName: req.body.teamName,
        stadium: req.body.stadium,
        owner: req.body.owner,
        foundation: req.body.foundation
    })

    team.save(
        (err, doc) => {

            // if (err) {
            //     res.json({ msg: "NOK" });
            // } else {
            //     res.json({ msg: "OK" });
            // };

            err ? res.json({ msg: "NOK" }) : res.json({ msg: "OK" });
        });

});

// Busines logic : Get All Teams
app.get("/teams", (req, res) => {
    console.log("Here BL : Get All Teams");

    Team.find().then(
        (data) => {

            console.log(data);
            res.json({ teams: data, msg: "ok" });
        }
    )
});

// Busines logic : Get Team By ID
app.get("/teams/:id", (req, res) => {
    console.log("Here BL : Get Team BY ID");
    let id = req.params.id;
    Team.findOne({ _id: id }).then(
        (doc) => {
            res.json({ team: doc, teamFinded: true });
        }
    )
});

// Busines logic : Delete Team By ID
app.delete("/teams/:id", (req, res) => {
    let id = req.params.id;
    console.log("Here BL : Delete Team By ID :", id);
    Team.deleteOne({ _id: id }).then(
        (deleteResponse) => {
            console.log("Here response from DB after deleting :", deleteResponse);
            // res.json({message : "Deleted with success"});

            if (deleteResponse.deletedCount == 1) {
                res.json({ message: "Deleted with success" });
            }

        }
    )

});

// Busines logic : Edit Team 
app.put("/teams", (req, res) => {
    console.log("Here BL : Edit Team");
});




// *************************************BL Weather ************************//////////
// BL : search weather by city
app.post("/weather/search", (req, res) => {

    console.log("this is BL of searching weather :", req.body);

    const country = req.body.city;
    const apiKey = "62ee756a34835483299877a61961cafb";
    const apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        country +
        "&appid=" +
        apiKey + "&units=metric";
    axios
        .get(apiUrl)
        .then((response) => {
            console.log('Here response', response);
            const weather = response.data.main;
            const weatherDescription = response.data.weather[0];
            console.log(weatherDescription);
            const windInfo = response.data.wind;
            const sysInfo = response.data.sys;
            console.log('Here weather main', weather);
            const result = {
                name: response.data.name,
                temp: weather.temp,
                pressure: weather.pressure,
                humidity: weather.humidity,
                icon: weatherDescription.icon,
                weatherDescr: weatherDescription.description,
                windSpeed: windInfo.speed,
                sunriseTime: sysInfo.sunrise,
                sunsetTime: sysInfo.sunset
            };
            res.status(200).json({
                result: result
            })
        });
});


// make app importable from another files
module.exports = app;


