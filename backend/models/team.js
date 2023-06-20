// import mongoose module
const mongoose = require("mongoose");

// create team schema
const teamSchema = mongoose.Schema({
    teamName: String,
    teamStadium: String,
    teamOwner: String
});

// create Model Name "Team"
const team = mongoose.model("Team", teamSchema);

// make team exportable
module.exports = team;