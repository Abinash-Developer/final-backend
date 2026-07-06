const express = require('express');
const router = express.Router();
const USER = require('../model/userModel');
const {getBycryptpassword} = require('../utils/auth');

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;
        const existUser = await USER.findOne({$or:[{email:email},{phone:phone}]});
        const hashpassword = await getBycryptpassword(password);
        console.log('Hashed password:', hashpassword);
        return;
        if(existUser){
            res.status(400).json({
                success:false,
                message:"User already exist"
            });
        }
        const user = await USER.create(req.body);
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user
        });
    }catch(err){
        next(err);
    }
})
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const existUser = await USER.findOne({$or:[{email:email},{phone:email}]});
        if(!existUser){
            res.status(400).json({
                success:false,
                message:"Invalid credentials"
            });
        }

    }catch(err){
        next(err);
    }
})
module.exports = router;