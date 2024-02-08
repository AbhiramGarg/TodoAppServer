import mongoose from "mongoose";
import Router from "express"
import { User } from "../models/user.js";
const router = Router()

router.get('/',async(req,res) => {
    const uid = req.params.id
    try {
        const result = await User.findById(uid)
        res.status(200).json({tasks:result.tasks})
    } catch (error) {
        
    }
})
export default router