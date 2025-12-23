const FoodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");

const authFoodPartnerMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, No token found" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await FoodPartnerModel.findById(decoded.id);

    if (!foodPartner) {
      return res.status(401).json({ message: "Unauthorized, Food Partner not found" });
    }

    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Invalid token" });
  }
};

module.exports = authFoodPartnerMiddleware;
