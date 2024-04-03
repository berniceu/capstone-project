const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
    fullName: {type: String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
})

const userData = mongoose.model('userData', userDataSchema)
module.exports = userData