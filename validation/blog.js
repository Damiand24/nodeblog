const { check, validationResult } = require('express-validator');

const postBlog = [
    
    check('title')
    .isLength({ max: 60 }).withMessage('Title is too long')
    .not().isEmpty().withMessage('Please enter title')
    .escape(),

    check('snippet')
    .isLength({ max: 144 }).withMessage('Snippet is too long')
    .not().isEmpty().withMessage('Please enter snippet')
    .escape(),

    check('body')
    .isLength({ max: 3000 }).withMessage('Body is too long')
    .not().isEmpty().withMessage('Please enter body')
    .escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ response: errors.array()[0].msg })
        }
        else next();
    }
]

const comment = [

    check('comment')
    .isLength({ max: 1000 }).withMessage('Comment is too long')
    .not().isEmpty().withMessage('Comment cannot be empty')
    .escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ response: errors.array()[0].msg })
        }
        else next();
    }
]

module.exports = {
    postBlog,
    comment
}