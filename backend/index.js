const express = require("express");
const dotenv = require("dotenv");
const app = express();
const { DBConnection } = require("./database/db.js");
const User = require('./models/Users.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

DBConnection();
//calling db connection to check whether the MONGODB_URI in .env file works or not 

app.use(express.json());

//"http://localhost:8000/" if we write this down on our browser the statement below will get displayed 
app.get("/", (req, res) => {
    res.send("Welcome to today's class!");
});

//"http://localhost:8000/home" if we write this down on our browser the statement below will get displayed 
// app.get("/home", (req, res) => {
//     res.send("Welcome to home!");
// });

//we will need to restart the server to get the above written lines printed on the browser 
//"get","post" all these are http methods which r used according to the type of request we should be handling 
//get - GET is used to request data from a specified resource.
//post - POST is used to send data to a server to create/update a resource.

app.post("/register", async (req, res) => {
    console.log(req);
    try {
        //get all the data from the request body(body is a part of the request)
        const {firstname, lastname, email, password} = req.body;

        //check that all data should exist 
        if(!(firstname && lastname && email && password)){
            return res.status(400).send("Please enter all the required fields!");
            //these status numbers specify different states - 404(error) etc.
        }

        //check if user already exists 
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send("User already exists");
        }
        //if the email already exists then the user already exists 

        //encrypt the password 
        //bcryptjs is used to encrypt details 
        const hashPassword = bcrypt.hashSync(password, 10);
        console.log(hashPassword);

        //save the user to the data base 
        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
        });


        //generate a token for the user and send it 
        const token = jwt.sign({id:user._id, email}, process.env.SECRET_KEY,{
            //as we have already saved the user details above, the userid would be automatically generated
            expiresIn: "1h"
            //means the user would be logged out in 1h
        });
        user.token = token;
        user.password = undefined;
        //as sending password with the data to the frontend is not required 

        res.status(201).json({
            message: "You have successfully registered!",
            success: true,
            user,
            token
        });
    }catch(error){
        console.log(error);
    }
})

app.listen(8000, ()=>{
    console.log(`Server is listening on port 8000`);
});