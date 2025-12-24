const foodModel = require("../models/food.model");
const StorageService = require("../services/storage.service");
const { v4: uuid } = require("uuid");

const createFood = async (req, res) => {
  try {
      const fileploadResult = await StorageService.uploadImage(
      req.file.buffer,
      uuid()
    );

    const foodItem = await foodModel.create({
      name:req.body.name ,
      description:req.body.description ,
      video:fileploadResult.url,
      foodPartner: req.foodPartner._id
    });

    return res.status(201).json({
      success: true,
      message: "Food created successfully",
      data: foodItem,
    });


  } catch (error) {
    console.error("Create Food Error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { createFood };
