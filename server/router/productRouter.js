const express = require('express');
const { createProduct, updateProduct, deleteProduct, getProducts, getProductById, getAverageRating, searchProducts } = require('../controllers/productController');
const { limit } = require('../middleware/limit');
const { versioning } = require('../middleware/versioning');
const productValidator = require('../validators/productValidator');
const product = express.Router();

product.get('/search', limit('get'), versioning('1.0.0'), searchProducts);
product.get('/average/:productId', limit('get'), versioning('1.0.0'), getAverageRating);
product.get('/', limit('get'), versioning('1.0.0'), getProducts);
product.get('/:id', limit('get'), versioning('1.0.0'), getProductById);
product.post('/', limit('post'), versioning('1.0.0'), productValidator.createProduct, createProduct);
product.put('/:id', limit('put'), versioning('1.0.0'), productValidator.updateProduct, updateProduct);
product.delete('/:id', limit('delete'), versioning('1.0.0'), deleteProduct);

module.exports = product;