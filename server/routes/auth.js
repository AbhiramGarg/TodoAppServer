import Router from "express"
import { User } from "../models/user.js"
import joi from "joi"
import bcrypt from "bcrypt"
const router = Router()

router.post('/',async(req,res) => {
    try {
        const {error} = validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message});
        const user = await User.findOne({email:req.body.email}).then(console.log("User found!"))

        if(!user)
            return res.status(401).send({message:"Invalied Email or Password!"})
        const validatePassword = await bcrypt.compare(req.body.password,user.password)
        if(!validatePassword)
            return res.status(401).send({message:"Invalied Email or password!"})
        const token = user.genAuthtoken();
        res.status(200).send({data:token,message:"Logged in successfully ",id:user._id,tasks:user.tasks,fn:user.Firstname})
    } catch (error) {
        res.status(500).send({message:"Internal server Error"});
        console.log(error)
    }
})
router.put('/:id',async(req,res) => {
    const uid = req.params.id
    const data = req.body.data
    try {
        const result = await User.findByIdAndUpdate(uid,{$push:{tasks:data}})
        const user = await User.findById(uid)
        res.status(201).send({message:"Task Added!",tasks:user.tasks})
        console.log("added task",data,result)
    } catch (error) {
        console.log("Error adding the task",error)
    }
})
router.post('/:id/:tid',async(req,res) => {
    const uid = req.params.id
    const tid = req.params.tid
    const data = req.body
    console.log("from the api",tid,data)
    try{
        await User.findByIdAndUpdate(
            uid,
            { $set: { [`tasks.${tid}`]: data.utask } },
            
        );
        const user = await User.findById(uid)
        res.status(201).send({message:"Task Updated!",tasks:user.tasks})
    }
    catch(error){
        console.log("Error adding the task",error)
    }
})
router.put('/:id/:tid',async(req,res) => {
    const uid = req.params.id
    const tid = req.params.tid
    try{
        await User.findByIdAndUpdate(
            uid,
            { $unset: { [`tasks.${tid}`]: 1 } }
        );
        const updatedUser = await User.findByIdAndUpdate(
            uid,
            { $pull: { tasks: null } },
            { new: true }
        );
        const tasks = updatedUser.tasks.filter(task => task !== null && task !== undefined);
        res.status(201).send({message:"Task Updated!",tasks})
    }
    catch (error) {
        console.error("Error updating the task", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
})
router.get('/:id',async(req,res) => {
    const uid = req.params.id
    try {
        const result = await User.findById(uid)
        res.status(200).json({tasks:result.tasks})
    } catch (error) {
        
    }
})

const validate = (data) => {
    const schema = joi.object({
        email:joi.string().email().required().label("email"),
        password:joi.string().required().label("Password")
    })
    return schema.validate(data)
}

export default router