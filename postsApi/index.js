// IMPORT MODULES YOU WILL USE IN THE MAIN APP
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// INCLUDE DATABASE CONNECT FILE
const { mongoose } = require("./Db.js");

// ***************************************************************
//Controllers
var postsController = require('./controllers/postsController.js');
var userController = require('./controllers/usersController.js');
// ***************************************************************

// INSTANTIATE THE CLASS 
var app = express();


app.use(bodyParser.json());
// app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, ()=> console.log('server started at port : 3000'));

app.use('/posts',postsController);
app.use('/users',userController);


