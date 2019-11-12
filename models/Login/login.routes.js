const express=require('express');
 const logincontrollers=require('./logincontrollers');

 var loginRouting=express.Router();

 loginRouting.route('/dump').get(logincontrollers.getUsers);
 loginRouting.route('/login').post(logincontrollers.addUsers);
 loginRouting.route('/get-admin/:id').get(logincontrollers.getId);


module.exports=loginRouting;