const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
       
        username: String,
        email: String,
        password: String
    },
    {
        timestamps: true,
    }
);

userSchema.methods.encryptPass = (password) => {
    // bcrypt.genSaltSync(10) para que lo encripte 10 veces
    return bcrypt.hashSync(password , bcrypt.genSaltSync(10));
}

userSchema.methods.comparePassword = function (password) {
    // return true or false
    return bcrypt.compareSync(password , this.password);
}

// model of database , collection and Schema
module.exports = mongoose.model('users', userSchema);