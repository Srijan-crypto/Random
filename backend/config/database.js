const mongoose = require("mongoose");

const connectDatabase = ()=>{
    // console.log(process.env.DB_URL);
    mongoose.connect(process.env.DB_URL)
        .then((data)=>{
            console.log(`mongoDB connected with server : ${data.connection.host}`);
        })
        .catch((e)=>{
            console.log(e);
        })
}

module.exports = connectDatabase;