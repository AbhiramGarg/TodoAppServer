import mongoose from "mongoose";
import jwt  from "jsonwebtoken";
import joi from "joi";
import PasswordComplexity  from "joi-password-complexity";

const userSchema = new mongoose.Schema({
    Firstname:{type:String,required:true},
    Lastname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    tasks:[]
})

userSchema.methods.genAuthtoken = function() {
    const token = jwt.sign({_id:this._id},process.env.JWTPRTIVATEKEY,{expiresIn:"1h"})
    return token
}
export const validate = (data) => {
    const schema = joi.object({
        Firstname:joi.string().required().label("First name"),
        Lastname:joi.string().required().label("Last name"),
        email:joi.string().required().label("email"),
        password:PasswordComplexity().required().label("password")

    });
    return schema.validate(data)
}


export const User = mongoose.model('user',userSchema);