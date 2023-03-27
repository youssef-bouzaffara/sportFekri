// import mongoose module
const mongoose = require("mongoose");

// création de la structure match :
const matchSchema = mongoose.Schema({
    scoreOne : Number,
    scoreTwo : Number,
    teamOne : String,
    teamTwo : String
});

// création du model Match avec la structure matchSchema :
const match = mongoose.model("Match",matchSchema);

// permettre l'exportation de ce fichier
module.exports=match;