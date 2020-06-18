const mongoose = require('mongoose');

//Set up default mongoose connection
mongoose.connect('mongodb://localhost:27017/postsDB', (err) => {
    if(!err)
    console.log("MangoDB Connected to PostsDB...");
    else
    console.log("Error In DB Connection :" + JSON.stringyfy(err,undefined,2));

});


module.exports = mongoose;
