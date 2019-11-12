const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orderSchema = new Schema({
    username:{
        type:String
    },
    productName: {
        type: String
    },
    weight: {
        type: String
    },
    price: {
        type: Number
    }
}, {
    collection: 'Orders'
})

module.exports = mongoose.model('OrderSchema', orderSchema)