const express = require("express");
const {
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
  getReviewBySpecificRating,
  getReviews,
  getSortedReviews,
  getTopRatedProducts
} = require("../controllers/reviewController");
const { limit } = require("../middleware/limit");
const { versioning } = require("../middleware/versioning");
const reviewValidator = require("../validators/reviewValidator");
const review = express.Router();

review.get(
  "/rating/:rating",
  limit("get"),
  versioning("1.0.0"),
  getReviewBySpecificRating
);
review.get("/average", limit("get"), versioning("1.0.0"), getTopRatedProducts);
review.get("/sorted", limit("get"), versioning("1.0.0"), getSortedReviews);
review.get("/:id", limit("get"), versioning("1.0.0"), getReviewById);
review.get("/", limit("get"), versioning("1.0.0"), getReviews);
review.post(
  "/",
  limit("post"),
  versioning("1.0.0"),
  reviewValidator.createReview,
  createReview
);
review.put(
  "/:id",
  limit("put"),
  versioning("1.0.0"),
  reviewValidator.updateReview,
  updateReview
);
review.delete("/:id", limit("delete"), versioning("1.0.0"), deleteReview);

module.exports = review;
