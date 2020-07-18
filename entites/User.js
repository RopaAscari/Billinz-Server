const mongoose = require('mongoose');
const Schema = require('entity-schema');

var UserSchema = new mongoose.Schema({

    firstname: {
        type: String,
    },

    lastname: {
        type: String,
    },

    username: {
        type: String,
    },

    password: {
        type: String,
    },

    email: {
        type: String,
    },

    balance: {
      type: Number
    },
})

mongoose.model('User',UserSchema);
