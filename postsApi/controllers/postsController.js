const express = require("express");

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

// IMPORT MODEL 
var { Posts } = require('../models/Posts');

// => localhost:3000/posts
router.get('/',(req,res) =>{

    Posts.find((err,docs) => {
            if(!err){res.send(docs);}
            else { console.log("error in retriveing Posts:" + JSON.stringify(err,undefined,2));}
    });

})
//ROUTER :  SHOW DATA BY ID 
router.get('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no records with given Id:" + ${req.params.id}`);

        Posts.findById(req.params.id,(err,doc) => {
            if(!err){res.send(doc);}
            else { console.log("error in retriveing Posts:" + JSON.stringify(err,undefined,2));}
        });
        
});

//ROUTER:  INSRT POST INTO DB
router.post('/',(req,res) => {
        var psts = new Posts({
            Postname:req.body.Postname,
            Comments:[{}],
            Dateposted: req.body.Dateposted,
            Likes:req.body.Likes
        });
   
        psts.save((err,doc) => {
            if(!err){res.send(doc);}
            else { console.log('Error in Posts save:' + JSON.stringify(err,undefined,2));}
        });
});


// ROUTER : UPDATE USING AN ID 
router.put('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`no records with given Id:" + ${req.params.id}`);

    var psts = {
        Postname:req.body.Postname,
        Comments:[{}],
        Dateposted: req.body.Dateposted,
        Likes:req.body.Likes
    };

    Posts.findByIdAndUpdate(req.params.id,{$set:psts},{ new:true}, (err,doc) => {
        if(!err){res.send(doc);}
        else { console.log('Error in Posts Update:' + JSON.stringify(err,undefined,2));}
    } );
    
});

//ROUTER :  DELETE USING AN ID ROUTER
router.delete('/:id',(req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send(`no records with given Id:" + ${req.params.id}`);

    Posts.findByIdAndRemove(req.params.id,(err,doc) => {
        if(!err){res.send(doc);}
        else { console.log('Error in Posts Delete:' + JSON.stringify(err,undefined,2));}
    });
});

// EXPORT THE CONTROLLER 
module.exports = router;