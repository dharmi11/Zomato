// Connetion  for database 
const mongoose = require("mongoose");

function connectDB (){
mongoose.connect("mongodb://localhost:27017/zomato")
.then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})

}

module.exports = connectDB;