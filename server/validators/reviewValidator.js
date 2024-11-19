const { body } = require('express-validator');

const reviewValidator = {
    createReview: [
        body('rating').notEmpty().isNumeric().withMessage('Rating is required'),
        body('comment').notEmpty().isString().withMessage('Comment is required'),
    ],
    updateReview: [
        body('rating').optional().isNumeric().withMessage('Rating is required'),
        body('comment').optional().isString().withMessage('Comment is required'),
    ],
}

module.exports = reviewValidator;