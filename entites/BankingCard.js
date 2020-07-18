const mongoose = require('mongoose');
const Schema = require('entity-schema');

var BankingCardSchema = new mongoose.Schema({

    USER_ID: {
      type: Number
    },

    cardnumber: {
      type: Number
    },

    expiration_date: {
      type:Number
    },

    CVC: {
      type:Number
    },
})
mongoose.model('BankingCard',BankingCardSchema);
