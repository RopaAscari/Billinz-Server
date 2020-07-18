require('./database/mongoose/ASB_DB');

const path = require('path');
const app = require('express')();
const express = require('express');
const bodyparser = require('body-parser');
const exphbs = require('express-handlebars');
const UserController = require('./controllers/UserController');

module.exports = function()
{
    app.use(bodyparser.json());
    app.set('views', path.join(__dirname, '/views/'));
    app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'ASB', layoutsDir: __dirname + '/views/layouts/' }));
    app.set('view engine', 'hbs');

    app.get('/',(request, response) => {
    response.send('ASCARI BANKING SERIVICE');
    })

    app.listen('2020',()=>
    {
        console.log("Server is running...")
    })

    app.use('/register', UserController);
};
