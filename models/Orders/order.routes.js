const express = require('express');
var jwtDecode = require('jwt-decode');
var ordercontrollers=require('./ordercontrollers');

const orderRoute=express.Router();

orderRoute.route('/').get(ordercontrollers.get);
orderRoute.route('/create-order').post(ordercontrollers.addOrder);
orderRoute.route('/order').post(ordercontrollers.getToken);
orderRoute.route('/get-order/:id').get(ordercontrollers.getOrderid);
orderRoute.route('/update-order/:id').put(ordercontrollers.Update);
orderRoute.route('/remove-order/:id').delete(ordercontrollers.Remove);

module.exports=orderRoute;