const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true 
    },
    lastname: {
        type: String,
        required: true 
        //required means that we will have to input this data, or else it will throw error 
    },
    email: {
        type: String,
        unique: true,
        //email must be unique
        required: true 
    },
    password: {
        type: String,
        required: true 
    },
});

module.exports=mongoose.model('User',userSchema);