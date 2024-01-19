const userModel  = require('../Models/userModel')

const bcrypt = require("bcryptjs")
const jwt =  require('jsonwebtoken')

const validator = require("validator")



const createtoken = (_id) =>
{

    const jwtKey = process.env.JWT_SECRET_KEY

    return jwt.sign({_id},jwtKey,{expiresIn : "5d"})

}


const registerUser = async (req,res) =>
{

    try
    {
        const {name, email ,password} =req.body

        let user = await userModel.findOne({email});
    
        if(user) return res.status(400).json("Email already exit in database.....")
    
    
        if(!name || !email || !password)
        {
            return  res.status(400).json("All Field are required....")
        }
        if(!validator.isEmail(email))
        {
            return res.status(400).json("invalid Email Addresss.....")
        }
    
        if(!validator.isStrongPassword(password))
        {
            return res.status(400).json("Please write strong password....")
        }
        
         user = new userModel({name,email, password})
         const salt = await bcrypt.genSalt(10)
         user.password = await bcrypt.hash(user.password,salt)
         await user.save()
    
         const token  = createtoken(user._id)
         res.status(200).json({_id:user._id,name,email,token})
    }catch(error)
    {
        console.log(`Registration Error ${error}`);
        res.status(500).json("Registration Error");
    }
 

};


const loginUser = async(req,res)=>
{

    const {email,password} = req.body

    let user = await userModel.findOne({email});

    try{

        if(!user)  return res.status(400).json("Email address not found....")

        const validPassword = await bcrypt.compare(password,user.password)

        if(!validPassword) return res.status(400).json("Wrong password")

         //sending the db details after validating the credintial (email,password)
        const token  = createtoken(user._id)
        res.status(200).json({_id:user._id,name:user.name,email:user.email,token})

    }catch(error)
    {
        console.log(`Login Error ${error}`);
        res.status(500).json("Login Error");
    }
}


const findUser = async(req,res)=>
{
    const userId = req.params.userId;
    try
    {
        const user  = await userModel.findById(userId)
        res.status(200).json(user);

    }catch(error)
    {
        console.log(`${error}`);
        res.status(500).json(`${error}`);

    }
}


const getUser = async(req,res)=>
{
    try
    {
        const user  = await userModel.find()
        res.status(200).json(user);

    }catch(error)
    {
        console.log(`${error}`);
        res.status(500).json(`${error}`);

    }
}



module.exports = {registerUser,loginUser,findUser,getUser}