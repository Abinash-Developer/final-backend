const express = require('express');
const router = express.Router();
const PRODUCT = require('../model/productModel');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post('/add', upload.single('image'), async (req, res, next) => {
    try {
        const { name, description, price } = req.body;
        const image = req.file ? req.file.path : undefined;
        const existProduct = await PRODUCT.findOne({ name: name });
        if (existProduct) {
            res.status(400).json({ "success": false, "message": "Product already exists" });
            return;
        }
        const product = new PRODUCT({
            name,
            description,
            price,
            image
        });
        const savedProduct = await product.save();
        res.status(201).json({
            success:true,
            message:"Product added successfully",
            product: savedProduct
        });
    } catch (err) {
        next(err);
    }
});
router.get('/list', async (req, res, next) => {
    try {
        const products = await PRODUCT.find();
        res.status(200).json({
            success:true,
            message:"Product list fetched successfully",
            products: products
        });
    } catch (err) {
        next(err);
    } 
});

module.exports = router;