const express=require('express')
const router=express.Router()
const User=require('../models/User.models.js')
const {body,validationResult}=require('express-validator')
router.post('/',[
    body('email','Enter valid Email').isEmail(),
    body('username','Enter valid name minimum length of 3').isLength({min:3}),
    body('password','Enter valid Password minimum length of 5').isLength({min:5})
],(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
                 return res.status(400).json({errors:errors.array()})
    }
    User.create({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    }).then(user=>res.json(user))
})
module.exports=router