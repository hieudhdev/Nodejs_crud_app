const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema ({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})

const userDB = mongoose.model('user', User);

module.exports = userDB
