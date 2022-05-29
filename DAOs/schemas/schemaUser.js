const mongoose = require('mongoose');

const {Schema} = mongoose;


const userSchemaName = 'users';

const userSchema = new Schema({
    email: {type: String, required: true, max: 100},
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max:100},
    fullName: {type: String, required: true, max:100},
    address: {type: String, required: true, max:100},
    age: {type: Number, required: true, max:100},
    phone: {type: String, required: true, max:100},
    avatar: {type: String, required: true, max:100}

});

const Users = mongoose.model(userSchemaName,userSchema);

module.exports = Users;