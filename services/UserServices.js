const moongoose = require('mongoose');
const User = moongoose.model('User');

class Services {
    constructor(props){

    }

insertRecord = (req, res)=> {
    var employee = new User();
    employee.firstname = req.body.firstname;
    employee.lastname = req.body.lastname;
    employee.username = req.body.username;
    employee.password = req.body.password
    employee.email = req.body.email;
    employee.save((err, doc) => {
        if (!err)
            console.log('User sucessfully saved');
        else {
                console.log('Error during record insertion : ' + err);
        }
    });
  }
}

module.exports = Services;
