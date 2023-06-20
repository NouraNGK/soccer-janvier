// import express module
const express = require("express");

// import body-parser module
const bodyParser = require("body-parser");

// import bcrypt module
const bcrypt = require("bcrypt");

// import multer module
const multer = require("multer");

// import path module
const path = require("path");

// import axios module
const axios = require("axios");

// import mongoose module
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/chawkiBroDB');

// creates express application
const app = express();

// Models importation
const Match = require("./models/match");
const Team = require("./models/team");
const User = require("./models/user");
const Player = require("./models/player");

// application config: configuration standard du body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Security configuration avec les instructions ci-dessous ou bien on installe le package "cors"
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});

// Shortcut Path
app.use('/myFiles', express.static(path.join('backend/images')))

// Media Types
const MIME_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  // "application/pdf" : "pdf"
};

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


// *****Matches*****
// DB simulation//matches
// let matchesTab = [
//   { id: 1, scoreOne: 1, scoreTwo: 3, teamOne: "CA", teamTwo: "EST" },
//   { id: 2, scoreOne: 0, scoreTwo: 2, teamOne: "JUV", teamTwo: "CSS" },
//   { id: 3, scoreOne: 4, scoreTwo: 4, teamOne: "INT", teamTwo: "ROM" },
//   { id: 4, scoreOne: 5, scoreTwo: 0, teamOne: "LIV", teamTwo: "SEV" },
// ];

// function generateId(T) {
//   let max;
//   if (T.length == 0) {
//     max = 0;
//   } else {
//     max = T[0].id;
//     for (let i = 1; i < T.length; i++) {
//       if (T[i].id > max) {
//         max = T[i].id;
//       }
//     }
//   }
//   return max + 1;
// }

// Business Logic : Get All Matches
app.get("/api/matches", (req, res) => {
  console.log("Here into BL: get all matches");
  Match.find().then((docs) => {
    res.status(200).json({ matches: docs, message: "OK" });
  });
});

// Business Logic : Get match by id
app.get("/api/matches/:x", (req, res) => {
  console.log("Here into BL: get match by ID");
  let id = req.params.x;
  Match.findOne({ _id: id }).then((doc) => {
    res.json({ match: doc });
  });
  // let findedMatch = matchesTab.find((elt) => {
  //   return elt.id == id;
  // });
});

// Business Logic : Delete match by id
app.delete("/api/matches/:id", (req, res) => {
  console.log("Here into BL: delete match by ID");
  let id = req.params.id;
  Match.deleteOne({ _id: id }).then((result) => {
    console.log("Here response after delete", result);
    result.deletedCount == 1
      ? res.json({ msg: "Deleted With Success" })
      : res.json({ msg: "Not deleted" });
  });
  // let isFounded = false;
  // for (let i = 0; i < matchesTab.length; i++) {
  //   if (matchesTab[i].id == id) {
  //     isFounded = true;
  //     matchesTab.splice(i, 1);
  //     break;
  //   }
  // }
  // isFounded
  //   ? res.json({ message: "Success" })
  //   : res.json({ message: "ID NOT FOUND" });
});

// Business Logic : Add Match
app.post("/api/matches", (req, res) => {
  console.log("Here into BL: Add match");
  let obj = new Match(req.body);
  obj.save();
  res.status(200).json({ message: "Added with success" });
});

// Business Logic : Edit Match
app.put("/api/matches", (req, res) => {
  console.log("Here into BL: Edit match", req.body);
  let newMatch = req.body;
  Match.updateOne({ _id: newMatch._id }, newMatch).then((result) => {
    console.log("Here result after update", result);
    result.nModified == 1
      ? res.json({ message: "Edited With Success" })
      : res.json({ message: "Echec" });
  });
});

// Business Logic : Search Matches by scoreOne or scoreTwo
app.post("/api/matches/searchMatches", (req, res) => {
  console.log("Here into BL: Search ALL Matches", req.body);
  Match.find({
    $or: [
      { scoreOne: req.body.s1 },
      { scoreTwo: req.body.s2 }
      // scoreOne et scoreTwo proviennent de la DB => ils sont des attributs d'une collection ds la DB
    ]
  }).then((docs) => {
    res.json({ matches: docs, msg: "Done" });
  });
});

// Business Logic : Search Weather From API
app.get("/api/weather/:city", (req, res) => {
  console.log("Here into BL: Search weather by city", req.params.city);
  let key = "62ee756a34835483299877a61961cafb";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${key}&units=metric`;
  axios.get(apiURL).then((weatherResponse) => {
    console.log("here response for API", weatherResponse.data);
    let data = weatherResponse.data;
    let description = data.weather[0].description;
    let icon = data.weather[0].icon;
    let weather = {
      temperature: data.main.temp,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
      icone: `https://openweathermap.org/img/wn/${icon}@4x.png`, 
      description: description
    };
    res.json({ cityWeather: weather });
  });
});


// *****Teams*****
let teamsTab = [
  { id: 1, name: "x", owner: "xx", stadium: "xxx" },
  { id: 2, name: "y", owner: "yy", stadium: "yyy" },
  { id: 3, name: "z", owner: "zz", stadium: "zzz" }
];

// Business Logic : Get all teams
app.get("/api/teams", (req, res) => {
  res.status(200).json({ teams: teamsTab, message: "ok" })
});

// Business Logic : Get team by ID
app.get("/api/teams/:x", (req, res) => {
  let id = req.params.x;
  let findedTeam = teamsTab.find((elt) => {
    return elt.id == id;
  });
  res.json({ team: findedTeam });
});

// Business Logic : Delete team by ID
app.delete("/api/teams/:id", (req, res) => {
  let id = req.params.id;
  let isFounded = false;
  for (let i = 0; i < teamsTab.length; i++) {
    if (teamsTab[i].id == id) {
      isFounded = true;
      teamsTab.splice(i, 1);
      break;
    }
  }
  isFounded
    ? res.json({ message: "Success" })
    : res.json({ message: "ID NOT FOUND" });
});

// Business Logic: Add team
app.post("/api/teams", (req, res) => {
  console.log("Here into BL: Add Team", req.body);
  let teamObj = new Team({
    teamName: req.body.name,
    teamStadium: req.body.stadium,
    teamOwner: req.body.owner
  });
  teamObj.save((err, doc) => {
    console.log("Here error", err);
    console.log("Here doc", doc);
    err ? res.json({ msg: "Error" }) : res.json({ msg: "Added with success" });
  });
});

// *****Users*****
// Business Logic: Signup (ou add user)
app.post("/api/users/signup", multer({ storage: storageConfig }).single('img'), (req, res) => {
  console.log("Here into signup", req.body);
  bcrypt.hash(req.body.pwd, 8).then((cryptedPwd) => {
    console.log("Here crypted Pwd", cryptedPwd);
    req.body.pwd = cryptedPwd;
    req.body.avatar = `${req.protocol}://${req.get("host")}/myFiles/${req.file.filename}`
    let user = new User(req.body);
    user.save((err, doc) => {
      err ? res.json({ msg: "Error" }) : res.json({ msg: "Added with success" });
    });
  });
});

// Business Logic: Login
// response : 0 => Email Error
// response : 1 => Pwd Error
// response : 2 => Success
app.post("/api/users/login", (req, res) => {
  console.log("Here Into BL: Login", req.body);
  let user;
  // Check if email exists
  User.findOne({ email: req.body.email })
    .then((doc) => {
      console.log("Here doc", doc);
      user = doc;
      // Send email error msg
      if (!doc) {
        res.json({ msg: "0" });
      } else {
        // Check PWD
        return bcrypt.compare(req.body.pwd, doc.pwd);
      }
    })
    .then((isEqual) => {
      console.log("Here isEqual", isEqual);
      // Send Pwd Error Msg
      if (!isEqual) {
        res.json({ msg: "1" });
      } else {
        let userToSend = {
          userId: user._id,
          email: user.email,
          fName: user.firstName,
          lName: user.lastName
        };
        res.json({ user: userToSend, msg: `2` });
      }
    });
});

// Business Logic : Get User By Email
app.get("/api/users/:email", (req,res) => {
console.log("Here Into BL: Get Profile", req.params.email);
User.findOne({email: req.params.email}).then(
  (doc) => {
  res.json({user: doc});
});
});

// Business Logic : Edit Profile
app.put("/api/users", (req, res) => {
  console.log("Here into BL: Edit Profile", req.body);
  User.updateOne({_id: req.body._id}, req.body).then(
    (response) => {
if (response.nModified == "1") {
  res.json({msg: "Updated with success"})
} else {
  res.json({msg: "Error"})
}
    });
});


// *****Players*****
// Business Logic: Add Player
app.post("/api/players", (req, res) => {
  console.log("Here into BL: Add Player", req.body);
  let p = new Player(req.body);
  p.save((err, doc) => {
    console.log("Here error", err);
    console.log("Here doc", doc);
    err ? res.json({ msg: "Error" }) : res.json({ msg: "Added with success" });
  });
});

// Business Logic: Get All Players
app.get("/api/players", (req, res) => {
  console.log("Here into BL: Get all players");
  Player.find().then((docs) => {
    res.json({ playersTab: docs });
  });
});

// Business Logic: Get Player by Id
app.get("/api/players/:id", (req, res) => {
  console.log("Here into BL: get player by id", req.params.id);
  Player.findOne({_id: req.params.id}).then((doc) => {
    res.json({ player: doc });
  });
});

// Business Logic: Update Player
app.put("/api/players", (req, res) => {
console.log("Here into BL: Update player", req.body);
Player.updateOne({ _id: req.body._id }, req.body).then(
  (response)=>{
    if (response.nModified == 1) {
      res.json({ msg: "Edited with success"});
    } else {
      res.json({ msg: "Error"});
    }
  });
});

// Business Logic: Delete Player By Id
app.delete("/api/players/:id", (req, res) => {
  console.log("Here into BL: delete player by id", req.params.id);
  Player.deleteOne({_id: req.params.id}).then((response) => {
    response.deletedCount == 1 
    ? res.json({idDeleted: true}) 
    : res.json({idDeleted: false})
  });
});


// make app exportable to be imported to other files
module.exports = app;