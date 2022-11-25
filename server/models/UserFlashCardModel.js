const mongoose = require('mongoose');

const userFlashCardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    word: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Word'
    },
    traditional: {
        type: String
    },
    simplified: {
        type: String
    },
    pinyin: {
        type: String
    },
    definition: {
        type: String
    },
    scoreinfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ScoreInfo'
    }
})
module.exports = mongoose.model('UserFlashCard', userFlashCardSchema)