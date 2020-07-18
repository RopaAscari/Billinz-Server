const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const moongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = moongoose.model('User');
const db = require('../database/mongoose/ASB_DB');
const Service = require('../services/UserServices');

const certainPath = path.join(__dirname, '../files/jwt-key.txt');
var privateKey = fs.readFileSync(certainPath, {encoding:'utf8', flag:'r'});


router.post('/', (req,res) => {
    var services = new Service();
    services.insertRecord(req,res);
});


router.post('/login',(req,res) => {

const USER = req.body;
const username = USER.username;
const password = USER.password;

User.find({username,password}, function(err,result) {
  if(result == ''){
    console.log("User not found")
    //res.json(message);
  }
  else {
    console.log("User found",result)
    jwt.sign({USER}, privateKey,{ expiresIn: 10  }, (err,token) => {
    if(token!=null){
      res.json({token});
      } else {
          res.status(400).send('Invalid');
      }
    });
   }
 })
});


router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.render("register/users", {
                users: docs
            });
        }
        else {
            console.log('Error in retrieving users list :' + err);
        }
    });
});



router.get('/users',Verification, (req,res) => {
  jwt.verify(req.token, privateKey,(err,Data)=>{
    if(err){
      res.sendStatus(403);
      console.log("Failed ",err)
    }
    else {
      //const USER =  req.body
      const username = Data.USER.username;
      //console.log(USER)
      if(!Data.USER.username) {
        res.sendStatus(403)
        console.log("Invalid USER");
      } else {
          console.log("Success");
         User.find({username},async function(err,user) {
          if(err){ throw err; }
          res.json(user[0])
         })
        }
       }
    });
  });

router.get('/session',Verification,(req,res)=> {

  //console.log(new Date())
  jwt.verify(req.token, privateKey,(err,Data)=> {
    if(err)
    {
      console.log("Token expired")
      res.send(false)
    } else {
        console.log("ok")
      }
   })
})


router.put('/UpdateAccount',Verification,(req,res)=> {
    jwt.verify(req.token, privateKey,(err,Data)=> {
      if(err){
        res.sendStatus(403);
          console.log("Failed",err)
      }
      else {
        const USER = req.body
        const email = USER.email
        User.update({email},{$set:USER},(err,data) => {
        if(err){throw err}
        if(data.nModified >= 1)
        {
            res.sendStatus(200);
            console.log("Success")
        }
         else {
            res.sendStatus(402);
            console.log("Failed")
         }
       })
      }
    })
  })


  router.delete('/deleteAccount',Verification,(req,res) => {
  jwt.verify(req.token, privateKey,(err,Data)=> {
    if(err){
      res.sendStatus(403);
      console.log("Failed",err)
    }
    else {
    const USER = req.body
    const password = USER.password
    console.log("User: ",USER.password)
    User.remove({password},(err,data)=>{
      if(err){console.log("Error in removing user",err)}
      if(data.n == 0)
      {
          console.log("Incorrect password",data);
          res.sendStatus(404);
      }
  else {
        console.log("User removed")
        res.sendStatus(200);
        //res.send(true)
       }
     })
   }
 })
})



function Verification(req, res, next) {
const bearerH = req.headers.authorization;
if(typeof bearerH !== 'undefined') {
const bearer = bearerH.split(' ');
const bearerToken = bearer[1];
req.token = bearerToken;
next();
} else {
  res.sendStatus(403);
 }
}

module.exports = router;
