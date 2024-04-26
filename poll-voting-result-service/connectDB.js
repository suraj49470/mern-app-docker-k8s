require("dotenv").config();
const mongoose = require('mongoose');
let db = null;
const connectDB = async () => {
    try{
        db = await mongoose.connect(process.env.MONGO_URL);
        console.log('connected to database');
    }catch(e){
        console.log(e);
    }
}
connectDB();
module.exports = db;