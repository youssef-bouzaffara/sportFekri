const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    playerName : String,
    age : Number,
    position : String,
    number : Number
})

const player = mongoose.model("Player",playerSchema);

module.exports=player;