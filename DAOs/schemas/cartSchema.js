const mongoose = require('mongoose');

const {Schema} = mongoose;


const cartSchemaName = 'cart';

const cartSchema = new Schema({
    timeStamp: {type: String, required: true, max: 12},
    username: {type: String, required: true, max: 300},
    products: {type: Array, required: true, max:10000},
    totalPrice: {type: Number, required: true, max:10000000},
});

const Cart = mongoose.model(cartSchemaName,cartSchema);

module.exports = Cart;