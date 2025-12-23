const express = require("express");
const router = express.Router();

const { createFood } = require("../controllers/food.controller");
const authFoodPartnerMiddleware = require("../middlewares/auth.middleware");


// http:localhost:9090/api/food/create
router.post('/create' , authFoodPartnerMiddleware, createFood)


module.exports = router ;