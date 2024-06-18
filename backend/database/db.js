const mongoose = require('mongoose');
//A Mongoose connection is a Node. js module that establishes and manages connections between a Node. js 
//application and a MongoDB database.
//It optimizes resource utilization, handles connection pooling, and manages errors, facilitating efficient data operations.
require('dotenv').config();

const DBConnection = async () => {
    //yeh values .env file se aayengi 
    const MONGODB_URI = process.env.MONGODB_URI;
    try{
        // await mongoose.connect(MONGODB_URI, { useNewUrlParser:true });
        await mongoose.connect(MONGODB_URI);
        //useNewUrlParser: true ensures that Mongoose uses the newer connection string parser, 
        //which is more reliable and compliant with the latest MongoDB specifications.
        console.log("DB connection established");
    }catch(error){
        console.log("Error connecting to MONGODB: " + error);
    }
}

module.exports = { DBConnection };