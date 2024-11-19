const { body } = require("express-validator");

const productValidator = {
  createProduct: [
    body("name").notEmpty().isString().withMessage("Product name is required"),
    body("description")
      .notEmpty()
      .isString()
      .withMessage("Product description is required"),
    body("category")
      .notEmpty()
      .isString()
      .withMessage("Product category is required"),
  ],

  updateProduct: [
    body("name").optional().isString().withMessage("Product name is required"),
    body("description")
      .optional()
      .isString()
      .withMessage("Product description is required"),
    body("category")
      .optional()
      .isString()
      .withMessage("Product category is required"),
  ],
};

module.exports = productValidator;