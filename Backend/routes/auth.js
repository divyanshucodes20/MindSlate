const express=require('express')
const router=express.Router()
const User=require('../models/User.models.js')
const {body,validationResult}=require('express-validator')
const bcrypt=require("bcryptjs")
var jwt=require("jsonwebtoken")
const JWT_SECRET="Divyanshu"
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
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt)
    user=await User.create({
        username:req.body.username,
        password:secPass,
        email:req.body.email
    })
    const data={
        user:{
            id:user.id
        }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    res.status(200)
    res.json(authToken)
})
router.post('/login',[
    body('email','Enter valid Email').isEmail(),
    body('password','Password cannot be blank').exists(),
],async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
                 return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email})
        if(!user){
           return res.status(400).json({error:"sorry credentials is wrong"}) 
        }
        const passwordCompare= await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            return res.status(400).json({error:"sorry credentials is wrong"})  
        }
        const data={
            user:{
                id:user.id
            }
        }
    const authToken=jwt.sign(data,JWT_SECRET);
    res.status(200)
    res.json(authToken)
    } catch (error) {
        console.error(error.messgae)
        res.status(500).send("internal server error occured")
    }
})
module.exports=router