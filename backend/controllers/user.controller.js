const { json } = require('express');
const userModel = require('../models/user.model')
const userService = require('../services/user.service');
const { validationResult } = ('express-validator');
const cookie = require('cookie-parser');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {fullName,  email ,password} = req.body;
 
    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstName:fullName.firstName,
        lastName:lastName.firstName,
        email,
        password
    });

    return res.status(201).json({
        success:true,
        user

    })

}

module.exports.loginUser = async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}.select('+password'))

    if(!user){
        return res.status(404).json({message:"Invalid email or password"})
    }

   const isMatch = await user.comparePassword(password);

   if(!isMatch){
    return res.status(401).json({message:"invalid password or email"})
   }

   const token = await user.generateAuthToken();

   res.cookie('token',token);

   return res.status(201).json({
    success:true,
    token,user

})
}

module.exports.getUserProfile = async(req,res)=>{
   
    const {user} = req.body

    const userDetails = await userModel.findOne({
        user,
    })
    
    if(!userDetails){
        return res.status(401)>json({success:false, message:"Details not found"})
    }

    return res.status(200).json({
        success:true,
        userDetails,
        message:"User details fetch successfully"
    });
}


module.exports.logout = async(req ,res)=>{

    res.clearCookie('token');
    const token = req.cokkies.token || header.authorization?.split(" ")[1];

    await blacklistTokenModel.create({token});

    res.status(200).json({message:"logout successfully"})

}
