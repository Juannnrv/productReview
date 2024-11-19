const Product = require("../models/productModel");
const { validationResult } = require("express-validator");

class ProductController {
  static async createProduct(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation errors",
        data: errors.array(),
      });
    }

    const { name, description, category } = req.body;

    try {
      const product = new Product({
        name,
        description,
        category,
      });

      await product.save();

      res.status(201).json({
        status: 201,
        message: "Product created",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error creating product",
        error: error.message,
      });
    }
  }

  static async getProducts(req, res) {
    try {
      const products = await Product.find();

      if (products.length < 1) {
        return res.status(404).json({
          status: 404,
          message: "No products found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Products found",
        data: products,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error getting products",
        error: error.message,
      });
    }
  }

  static async getProductById(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: "Product not found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Product found",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error getting product",
        error: error.message,
      });
    }
  }

  static async updateProduct(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation errors",
        data: errors.array(),
      });
    }

    const { name, description, category } = req.body;

    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: "Product not found",
        });
      }

      product.name = name;
      product.description = description;
      product.category = category;

      await product.save();

      res.status(200).json({
        status: 200,
        message: "Product updated",
        data: product,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error updating product",
        error: error.message,
      });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: "Product not found",
        });
      }

      await product.remove();

      res.status(200).json({
        status: 200,
        message: "Product deleted",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error deleting product",
        error: error.message,
      });
    }
  }

  static async getAverageRating(req, res) {
    const { productId } = req.params;

    console.log(productId);

    try {
      const product = await Product.findById(productId).populate("reviews");

      if (!product) {
        return res.status(404).json({
          status: 404,
          message: "Product not found",
        });
      }

      let totalRating = 0;

      product.reviews.forEach((review) => {
        totalRating += review.rating;
      });

      const averageRating = totalRating / product.reviews.length;

      res.status(200).json({
        status: 200,
        message: "Average rating",
        data: averageRating,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error getting average rating",
        error: error.message,
      });
    }
  }
  
  static async searchProducts(req, res) {
    try {
      const { query } = req.query;

      if (!query) {
        return res.status(400).json({
          status: 400,
          message: "Query parameter is required",
        });
      }

      const products = await Product.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
        ],
      });

      if (products.length === 0) {
        return res.status(404).json({
          status: 404,
          message: "No products found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Products found",
        data: products,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error searching products",
        error: error.message,
      });
    }
  }
}

module.exports = ProductController;
