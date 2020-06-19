const express = require("express");

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

// IMPORT MODEL 
var { Users } = require('../models/Users');

// => localhost:3000/users
router.get('/',(req,res) =>{

    Users.find((err,docs) => {
            if(!err){res.send(docs);}
            else { console.log("error in retriveing Users:" + JSON.stringify(err,undefined,2));}
    });

})
//ROUTER :  SHOW DATA BY ID 
router.get('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no records with given Id:" + ${req.params.id}`);

        Users.findById(req.params.id,(err,doc) => {
            if(!err){res.send(doc);}
            else { console.log("error in retriveing Users:" + JSON.stringify(err,undefined,2));}
        });
        
});
//ROUTER:  INSRT POST INTO DB
router.post('/',(req,res) => {
        var usr = new Users({
            FirsName:req.body.FirsName,
            LastName:req.body.LastName,
            Email:req.body.Email,
            DateReg: req.body.DateReg,
        });

        
   
        usr.save((err,doc) => {
            if(!err){res.send(doc);}
            else { console.log('Error in Users save:' + JSON.stringify(err,undefined,2));}
        });
});


// ROUTER : UPDATE USING AN ID 
router.put('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`no records with given Id:" + ${req.params.id}`);

    var usr = {
        FirsName:req.body.FirsName,
        LastName:req.body.LastName,
        Email:req.body.Email,
        DateReg: req.body.DateReg,
    };

    Users.findByIdAndUpdate(req.params.id,{$set:usr},{ new:true}, (err,doc) => {
        if(!err){res.send(doc);}
        else { console.log('Error in Users Update:' + JSON.stringify(err,undefined,2));}
    } );
    
});

//ROUTER :  DELETE USING AN ID ROUTER
router.delete('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`no records with given Id:" + ${req.params.id}`);

    Users.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){res.send(doc);}
        else { console.log('Error in Users Delete:' + JSON.stringify(err,undefined,2));}
    });
});

// EXPORT THE CONTROLLER 
module.exports = router;