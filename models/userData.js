const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userDataSchema = mongoose.Schema({
    fullName: {type: String},
    email:{type:String, required:true},
    hash_password:{type:String, required:true}
})

userDataSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password)
}

const userData = mongoose.model('userData', userDataSchema)
module.exports = userData