const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    teamName : String,
    stadium : String,
    owner : String,
    foundation : Number
});

const team = mongoose.model("Team", teamSchema);

module.exports=team;