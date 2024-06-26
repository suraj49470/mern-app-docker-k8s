require("dotenv").config();
const mongoose = require('mongoose');
let db = null;
const options = {
   useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
console.log(process.env);
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const connectDB = async () => {
    try{
        db = await mongoose.connect(process.env.MONGO_URL , options);
        console.log('connected to database');
    }catch(e){
        if(!db){
            await sleep(5000);
            connectDB();
        }
        console.log(e);    
    }
}
connectDB();
module.exports = db;