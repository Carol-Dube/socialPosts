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


// ***************************************************************
const jwt = require('jsonwebtoken')
const router = express.Router()
const config = require('./config')
const tokenList = {};

// ***************************************************************

// INSTANTIATE THE CLASS 
var app = express();


app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));







// ***************************************************************

router.get('/', (req,res) => {
    res.send('Ok');
})

router.post('/login', (req,res) => {
    const postData = req.body;
    const user = {
        "email": postData.email,
        "name": postData.name
    }
    // do the database authentication here, with user name and password combination.
    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
    const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
    
    const response = {
        "status": "Logged in",
        "token": token,
        "refreshToken": refreshToken,
    }

    tokenList[refreshToken] = response
    res.status(200).json(response);
})

router.post('/token', (req,res) => {
    // refresh the damn token
    const postData = req.body
    // if refresh token exists
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "email": postData.email,
            "name": postData.name
        }
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }
})
router.use(require('./tokenChecker'))

router.get('/secure', (req,res) => {
    // all secured routes goes here
    res.send('I am secured...')
})

app.use('/api', router)

// ***************************************************************

app.listen(3000, ()=> console.log('server started at port : 3000'));
app.use('/posts',postsController);
app.use('/users',userController);


