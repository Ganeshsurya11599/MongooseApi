const Bcrypt = require('bcrypt');
const authorize = require("./auth");
const { check, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

let LoginSchema=require('./login.model');

var addUsers =function(req, res, next) {
    let getUser;  
    LoginSchema.findOne({
        username: req.body.username
    }).then(user => {
        if (!user) {    
            return res.status(401).json({
                message: "Username is does not exist"
            });
        }
        getUser = user;
        return Bcrypt.compare(req.body.password, user.password);
    }).then(response => {
        if (!response) {
            return res.status(401).json({
                message: "Authentication failed"
            });
        }
        let jwtToken = jwt.sign({
            username: getUser.username,
            userId: getUser._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getUser._id
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Invalid"
        });
    });
}

var getUsers = function(req, res){
    LoginSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
};

var getId =function (req, res){
    LoginSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
}


module.exports={
    addUsers:addUsers,
    getUsers:getUsers,
    getId:getId,
    
}