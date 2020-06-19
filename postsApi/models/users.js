const mongoose = require("mongoose");
// DECLARING HOW DATA SHOULD BE 
var Users = mongoose.model('Users', {
    FirsName:{type: String},
    LastName:{type: String},
    Email:{type: String},
    DateReg: {type: Date},
});

module.exports = { Users };
