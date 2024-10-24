const mongoose=require('mongoose')
const {Schema}=mongoose
const NotesSchema=new Schema({
    title:{
        type:String,
        required:[true,"title is required"],
    },
    description:{
        type:String,
        required:true,
    },
    tag:{
        type:String,
        default:"General"
    }
},{timestamps:true})
module.exports=mongoose.model("notes",NotesSchema)