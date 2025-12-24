const express = require("express");
const router = express.Router();

const { createFood } = require("../controllers/food.controller");
const authFoodPartnerMiddleware = require("../middlewares/auth.middleware");
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
})

// http:localhost:9090/api/food/create
router.post('/create' , authFoodPartnerMiddleware,
    upload.single('video'),
    createFood)


module.exports = router ;