const express = require('express');
const { registerUser, loginUser, getUsers, logoutUser, LoginFoodPartner,  registerFoodPartner,  logoutFoodPartner, getFoodPartners } = require('../controllers/auth.controller');

const router = express.Router();

// User Auth Routes APIs /


router.post('/user/register' , registerUser) ;
router.post('/user/login' , loginUser) ;
router.get('/user/get' , getUsers) ;
router.get('/user/logout' , logoutUser) ;

// FoodPartner Auth Routes APIs 

router.post('/FoodPartner/register' , registerFoodPartner)
router.post('/FoodPartner/login' , LoginFoodPartner) ;
router.get('/FoodPartner/logout' , logoutFoodPartner) ;
router.get('/FoodPartner/get' , getFoodPartners);

module.exports = router ;