const userModel=require('../models/User')
const JWT=require('jsonwebtoken');
const {hashPassword,comparePassword}=require('../helpers/authHelper')

const registerController=async(req,res)=>{
    try{
        const { name, email, password, phone, address } = req.body;
       
    if (!name) {
        return res.send({ error: "Name is Required" });
      }
      if (!email) {
        return res.send({ message: "Email is Required" });
      }
      if (!password) {
        return res.send({ message: "Password is Required" });
      }
      if (!phone) {
        return res.send({ message: "Phone no is Required" });
      }
      if (!address) {
        return res.send({ message: "Address is Required" });
      }
   
      const exisitingUser = await userModel.findOne({ email });
    
      if (exisitingUser) {
        return res.status(200).send({
          success: false,
          message: "Already Register please login",
        });
      }

      const hashedPassword = await hashPassword(password);
  
      const user = await new userModel({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
  
      }).save();

      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
  
    }catch(err){
        console.log(err);
        res.status(500).send({
          success: false,
          message: "Error in Registeration",
          err,
        });
    }
}

const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body
        if (!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
              });
        }

        const user =await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
              });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
          return res.status(200).send({
            success: false,
            message: "Invalid Password",
          });
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

          res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              phone: user.phone,
              address: user.address,
              role: user.role,
            },
            token,
          });
    }catch(err){
        console.log(err)
        res.status(500).send({
        success: false,
        message: "Error in login",
        err,
    });
    }
} 

const getAllVendors=async(req,res)=>{
    try{
      const vendors=await userModel.find({role:1})
      res.send(vendors)
    }catch(err){
      res.status(500).send(err);
      console.log(err)
    }
  }
const getUser=async(req,res)=>{
  const {id}=req.params
  try{
    const user=await userModel.find({_id:id})
    res.send(user)
  }catch(err){
    res.status(500).send(err);
    console.log(err)
  }
}

module.exports={registerController,loginController,getAllVendors,getUser}