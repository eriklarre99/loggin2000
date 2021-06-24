const mongoose = require('mongoose');
const { Schema } = mongoose;

const cmdSchema = new Schema(
    {
       
        cmd: String,
        description: String,
    },
    {
        timestamps: true,
    }
);



// model of database , collection and Schema
module.exports = mongoose.model('cmd', cmdSchema);