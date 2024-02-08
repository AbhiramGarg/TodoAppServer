import mongoose from "mongoose";
import Router  from "express";
import { User } from "../models/user.js";
const router  = Router()

router.put('/:id',async(req,res) => {
    const uid = req.params.id
    const data = req.body
    try {
        await User.findByIdAndUpdate(uid,{$push:{tasks:data.task}})
        const result = await User.findById(uid)
        res.status(201).send({message:"Task Added!"})
        console.log("added task",result)
    } catch (error) {
        console.log("Error adding the task",error)
    }
})
export default router