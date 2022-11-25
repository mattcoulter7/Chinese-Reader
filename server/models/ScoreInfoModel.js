const mongoose = require('mongoose');

const scoreInfoSchema = new mongoose.Schema({
    scorefile:{
        type: String
    },
    score:{
        type: String
    },
    difficulty:{
        type: String
    },
    history:{
        type: String
    },
    correct:{
        type: String
    },
    incorrect:{
        type: String
    },
    reviewed:{
        type: String
    },
    sincelast:{
        type: String
    },
    firstreviewedtime:{
        type: String
    },
    lastreviewedtime:{
        type: String
    }
})
module.exports = mongoose.model('ScoreInfo', scoreInfoSchema)