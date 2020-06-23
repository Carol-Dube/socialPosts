const mongoose = require("mongoose");
// DECLARING HOW DATA SHOULD BE 
var Users = mongoose.model('Users', {
    UserName:{type: String},
    Password:{type: String},
    Email:{type: String},
    DateReg: {type: Date},
});

module.exports = { Users };
