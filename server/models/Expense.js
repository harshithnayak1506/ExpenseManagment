const mongoose=require('mongoose')
const usersSchema = new mongoose.Schema( {
    username: String,
    email: String,
    password: String
})
const userModel=mongoose.model("users",usersSchema)
module.exports=userModel;