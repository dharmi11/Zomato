const foodModel = require('../models/food.model');

const createFood = async(req,res) =>{
    console.log("Food Partner Info" , req.foodPartner) ;
    res.send("Food Created Successfully");
}

module.exports = {
    createFood,
} ;