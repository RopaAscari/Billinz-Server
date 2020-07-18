const mongoose = require('mongoose');

const USER_DB_URI = 'mongodb://localhost:27017/BILLINZ_DB';

try{
    mongoose.connect(USER_DB_URI,{ useNewUrlParser: true },function(err)
    {
        if(!err)
        console.log('Succesfully connected');
    })
}catch(err){
    console.log('Database connection failed', err)
}
require('../../entites/User');
