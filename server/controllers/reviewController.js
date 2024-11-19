const Review = require("../models/reviewModel");
const { validationResult } = require("express-validator");
const Product = require("../models/productModel");

class ReviewController {
  static async getReviews(req, res) {
    try {
      const reviews = await Review.find();

      if (reviews.length < 1) {
        return res.status(404).json({
          status: 404,
          message: "No reviews found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Reviews found",
        data: reviews,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error getting reviews",
        error: error.message,
      });
    }
  }

  static async getReviewById(req, res) {
    const { reviewId } = req.params;

    try {
      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({
          status: 404,
          message: "Review not found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Review found",
        data: review,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error getting review",
        error: error.message,
      });
    }
  }

  static async createReview(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation errors",
        data: errors.array(),
      });
    }

    const { productId, rating, comment } = req.body;

    try {
      const review = new Review({
        productId: productId,
        rating,
        comment,
        date: new Date(),
      });

      await review.save();

      const product = await Product.findById(productId);

      product.reviews.push(review._id);

      await product.save();

      res.status(201).json({
        status: 201,
        message: "Review created",
        data: review,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error creating review",
        error: error.message,
      });
    }
  }

  static async updateReview(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        message: "Validation errors",
        data: errors.array(),
      });
    }

    const { rating, comment } = req.body;
    const { reviewId } = req.params;

    try {
      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({
          status: 404,
          message: "Review not found",
        });
      }

      review.rating = rating;
      review.comment = comment;

      await review.save();

      res.status(200).json({
        status: 200,
        message: "Review updated",
        data: review,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error updating review",
        error: error.message,
      });
    }
  }

  static async deleteReview(req, res) {
    const { reviewId } = req.params;

    try {
      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({
          status: 404,
          message: "Review not found",
        });
      }

      await review.remove();

      res.status(200).json({
        status: 200,
        message: "Review deleted",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error deleting review",
        error: error.message,
      });
    }
  }

  static async getSortedReviews(req, res) {
    const { sortBy } = req.query;
    let query = {};

    try {
      let reviews;

      if (sortBy === "rating") {
        reviews = await Review.find(query).sort({ rating: -1 });
      } else if (sortBy === "date") {
        reviews = await Review.find(query).sort({ date: -1 });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Invalid sortBy parameter",
        });
      }

      if (!reviews || reviews.length < 1) {
        return res.status(404).json({
          status: 404,
          message: "No reviews found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Reviews found",
        data: reviews,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Error getting reviews",
        error: error.message,
      });
    }
  }

  static async getReviewBySpecificRating(req, res) {
    const { rating } = req.params;

    try {
      const reviews = await Review.find({ rating: rating });

      if (reviews.length < 1) {
        return res.status(404).json({
          status: 404,
          message: "No reviews found",
        });
      }

      res.status(200).json({
        status: 200,
        message: "Reviews found",
        data: reviews,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error getting reviews",
        error: error.message,
      });
    }
  }

  static async getTopRatedProducts(req, res) {
    try {
      const topRatedProducts = await Product.aggregate([
        {
          $lookup: {
            from: "review",
            localField: "_id",
            foreignField: "productId",
            as: "reviews",
          },
        },
        {
          $unwind: "$reviews",
        },
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            averageRating: { $avg: "$reviews.rating" },
          },
        },
        {
          $sort: { averageRating: -1 },
        },
        {
          $limit: 10,
        },
      ]);

      res.status(200).json({
        status: 200,
        message: "Top rated products found",
        data: topRatedProducts,
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        message: "Error getting top rated products",
        error: error.message,
      });
    }
  }
}

module.exports = ReviewController;
