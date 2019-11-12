const express=require('express');
 const signupcontrollers=require('./signupcontrollers');

 var signupRouting=express.Router();

 signupRouting.route('/dump').get(signupcontrollers.getUsers);
 signupRouting.route('/register').post(signupcontrollers.addUsers);
 signupRouting.route('/get-admin/:id').get(signupcontrollers.getId);

module.exports=signupRouting;