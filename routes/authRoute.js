const express=require('express')
const router=express.Router()
const {requireSignIn,isVendor}=require('../middlewares/authMiddleware')
const {registerController,getAllVendors,loginController,getUser}=require('../controllers/authController')
router.post('/register',registerController)

router.post('/login',loginController)

router.get('/test',(req,res)=>{
    res.send('test')
})
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

router.get('/vendor-auth',requireSignIn,isVendor,(req,res)=>{
    res.status(200).send({ok:true})
})
router.get('/user/:id',getUser)

router.get('/vendors',requireSignIn,getAllVendors)
module.exports=router