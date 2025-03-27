const mongoose = require('mongoose');

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,
    })
    .then(console.log('Connect to db'))
    .catch(err =>console.log("error in db connect =",err))
    
};


module.exports = connectToDb;