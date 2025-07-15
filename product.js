const Produk = require('../models/produk');
const asyncErrorWrapper = require('../middlewares/asyncErrorWrapper');
const CustomError = require('../helpers/CustomError');
const mongoose = require('mongoose');

// ADD Product
const addProduct = asyncErrorWrapper(async (req, res, next) => {
    const newProduct = await Produk.create(req.body);
    res.status(201).json({
        success: true,
        message: 'The product has been successfully added.',
        newProduct,
    });
});

// EDIT Product
const editProduct = async (req, res) => {
    try {
        const product = await Produk.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        Object.assign(product, req.body);
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get by id
const getProductById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await Produk.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Product ID" });
        }

        // Find user by ID
        const product = await Produk.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Remove user
        await product.deleteOne(); // `deleteOne` is safer than `remove` (deprecated in Mongoose)
        res.status(200).json({ message: "Produk deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//get all produk
const getAllproducts = async (req, res) => {
    try {
        const products = await Produk.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    addProduct,
    getAllproducts,
    editProduct,
    deleteProduct,
    getProductById,
};