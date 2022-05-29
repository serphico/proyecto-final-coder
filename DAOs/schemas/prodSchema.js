const mongoose = require('mongoose');

const {Schema} = mongoose;


const productSchemaName = 'products';

const productsSchema = new Schema({
    title: {type: String, required: true, max: 200},
    price: {type: Number, required: true, max: 100000},
    description: {type: String, required: true, max:100},
    photo: {type: String, required: true, max:500},
    category:{type: String, required: true, max:100}   
});

const Products = mongoose.model(productSchemaName,productsSchema);
 
module.exports = Products;