const mongoose=require('mongoose')
const {Schema}=mongoose;
const UserSchema=new Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    }
},{timestamps:true})
const User=mongoose.model("user",UserSchema)
User.createIndexes()
module.exports=User
