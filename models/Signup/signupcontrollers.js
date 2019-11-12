const Bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

let SignSchema=require('./signup.model');


var getUsers =function (request, response) {
    try {
        var result = SignSchema.find().exec();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
};

var addUsers =function (request, response){
    try {
        request.body.password = Bcrypt.hashSync(request.body.password, 10);
        var user = new SignSchema(request.body);
        var result = user.save();
        response.send(result);
    } catch (error) {
        response.status(500).send(error);
    }
};

var getId =function (req, res){
    SignSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
};

module.exports={
    getUsers:getUsers,
    addUsers:addUsers,
    getId:getId,
}