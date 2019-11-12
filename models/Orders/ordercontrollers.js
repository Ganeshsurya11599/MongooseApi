const express = require('express');
var jwtDecode = require('jwt-decode');

let OrderSchema=require('./order.model');

var get=function (req, res){
    let token=req.headers.authorization;
   var decoded=jwtDecode(token)
    OrderSchema.find({username:decoded.username},(error, data) => {
        if (error) { 
            return next(error)
        } else {
            res.json(data)
        }
    })
};

var addOrder=function (req, res, next){
    OrderSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
};

var getToken=function (req, res){
    let token=req.headers.authorization;
    var decoded=jwtDecode(token)
    req.body.username = decoded.username;
    OrderSchema.create(req.body,(error, data) => {
         if (error) {
             return next(error)
         } else {
             res.json(data);
            console.log('Order Created' +data);
         }
     })
 };

 var getOrderid=function (req, res){
    OrderSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
};

var Update=function (req, res, next) {
    OrderSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Student successfully updated!')
        }
    })
};

var Remove=function (req, res, next) {
    OrderSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
};

module.exports={
    get:get,
    addOrder:addOrder,
    getToken:getToken,
    getOrderid:getOrderid,
    Update:Update,
    Remove:Remove
}