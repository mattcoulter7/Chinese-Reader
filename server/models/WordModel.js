const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
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
    }
})
module.exports = mongoose.model('Word', wordSchema)