const { request } = require('express');
const foodModel = require('../models/food.model');
const StorageService = require('../services/storage.service');



const createFood = async (req, res) => {
  
console.log("Food Partner Info:", req.foodPartner);

 
const fileUploadResult = await StorageService.uploadImage(
    req.file.buffer,
    req.file.originalname
  );
  console.log("Food Data:", req.body);
  console.log("Uploaded File:", req.file);
  res.status(201).json({
    success: true,
    message: "Food Created Successfully",
    foodPartner: {
      id: req.foodPartner._id,
      fullName: req.foodPartner.fullName,
      email: req.foodPartner.email
    },
    requestedFood: {
      name: req.body.name,
      description: req.body.description,
      video: req.file.originalname
    }
  });
};

module.exports = {
    createFood,
} ;