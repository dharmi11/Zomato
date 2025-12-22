const mongoose = require("mongoose");

const foodPartnerSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true   
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }

});


const FoodPartnerModel = mongoose.model("FoodPartner" , foodPartnerSchema) ;

module.exports = FoodPartnerModel ;
