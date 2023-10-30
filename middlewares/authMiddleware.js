const jwt=require('jsonwebtoken');
const Users=require('../models/User')

const requireSignIn = async (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];

if (!authHeader) {
  return res.status(401).json({
    success: false,
    message: "JWT token is missing"
  });
}

const token = authHeader.split(' ')[1];

// Rest of your code for token verification and setting req.user

     
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "JWT token is missing"
        });
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; 
  
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        success: false,
        message: "Invalid JWT token"
      });
    }
  }
  


// vendor access
const isVendor = async (req, res, next) => {
    try {
      const user = await Users.findOne({ _id: req.user._id });
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access"
        });
      } else {
        next();
      }
    } catch (err) {
      console.log(err);
    }
  };
  

module.exports={requireSignIn,isVendor}