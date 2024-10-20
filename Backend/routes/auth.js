const express=require('express')
const router=express.Router()
const User=require('../models/User.models.js')
const {body,validationResult}=require('express-validator')
router.post('/registerUser',[
    body('email','Enter valid Email').isEmail(),
    body('username','Enter valid name minimum length of 3').isLength({min:3}),
    body('password','Enter valid Password minimum length of 5').isLength({min:5})
],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
                 return res.status(400).json({errors:errors.array()})
    }
    let user=await User.findOne({email:req.body.email,username:req.body.username}) 
    if(user){
       return res.status(400).json({error:"User with this email or username already exists"}) 
    }
    user=await User.create({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    })
    res.status(200)
    res.json(user)
})
module.exports=router