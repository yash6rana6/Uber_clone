const userModel = require('../models/user.model');

module.exports.createUser = async({firstName,password,email})=>{
   
    if(!firstName || !email || !password){
        throw new Error("All feilds is required")
    }

    const user = userModel.create({
        fullName:{
            firstName,
            lastName,
        },
        email,
        password
    })

    return user
}