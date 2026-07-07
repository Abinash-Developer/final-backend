const express = require('express');
const router = express.Router();
const USER = require('../model/userModel');
const {getBycryptpassword} = require('../utils/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;
        const existUser = await USER.findOne({$or:[{email:email},{phone:phone}]});
        const hashpassword = await getBycryptpassword(password);
        if(existUser){
            res.status(400).json({
                success:false,
                message:"User already exist"
            });
        }
        const user =  new USER({
            name:name,
            email:email,
            phone:phone,
            password:password
        })
        const savedUser = await user.save();
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user: savedUser
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
        const isMatch = await bcrypt.compare(password, existUser.password);
        if(!isMatch){
            res.status(400).json({
                success:false,
                message:"Invalid credentials"
            });
        }
        const token = jwt.sign({id:existUser._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
        res.status(200).json({
            success:true,
            message:"User logged in successfully",
            token: token
        });
    }catch(err){
        next(err);
    }
})
module.exports = router;