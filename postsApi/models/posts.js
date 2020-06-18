const mongoose = require("mongoose");

// DECLARING HOW DATA SHOULD BE 
var Posts = mongoose.model('Posts', {
    Postname:{type: String},
    Comments:[{_id: false}],
    Dateposted: {type: Date},
    Likes:{type: Number}
});

module.exports = { Posts };
