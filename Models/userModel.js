

const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {type: String ,require :true, minlength:5 , maxlength:25},
    email : {type: String, require:true , minlength:5 , maxlength:256 , unique:true},
    password : {type:String , require:true , minlength:5 , maxlength:1024 },
},{
    timestamps :true,
}
);


const userModel = mongoose.model("User",userSchema)


module.exports = userModel
