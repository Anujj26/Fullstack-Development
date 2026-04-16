const Product = require('../models/Product');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
    try {
        // Option to add filters based on query params
        const q = req.query.q;
        const category = req.query.category;
        const user = req.query.user;

        let query = {};
        if (q) {
            query.$or = [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ];
        }
        if (category) {
            query.category = category;
        }
        if (user) {
            query.seller = user;
        }

        const products = await Product.find(query).populate('seller', 'name email phone').sort({ createdAt: -1 });

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'name email phone');

        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private
const createProduct = async (req, res, next) => {
    try {
        const { title, price, category, description } = req.body;

        if (!title || !price || !category || !description) {
            res.status(400);
            throw new Error('Please provide all required fields');
        }

        if (!req.file) {
            res.status(400);
            throw new Error('Please upload an image');
        }

        const product = await Product.create({
            title,
            price,
            category,
            description,
            imageUrl: `/uploads/${req.file.filename}`,
            seller: req.user.id
        });

        res.status(201).json(product);
    } catch (error) {
        next(error);
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
const updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        // Make sure user owns product
        if (product.seller.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized to update this product');
        }

        // If a new image is uploaded, use it. Otherwise, keep the old one.
        let imageUrl = product.imageUrl;
        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        product = await Product.findByIdAndUpdate(
            req.params.id,
            { ...req.body, imageUrl },
            { new: true, runValidators: true }
        );

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        // Make sure user owns product
        if (product.seller.toString() !== req.user.id) {
            res.status(401);
            throw new Error('User not authorized to delete this product');
        }

        await product.deleteOne();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
