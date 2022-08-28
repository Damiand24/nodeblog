const { check, validationResult } = require('express-validator');

postLogin = [
    
    check('username')
    .not().isEmpty().withMessage('Please enter username')
    .trim()
    .escape(),

    check('pass')
    .not().isEmpty().withMessage('Please enter password')
    .trim()
    .escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ response: errors.array()[0].msg })
        }
        else next();
    }
];

postRegister = [
    
    check('username')
    .not().isEmpty().withMessage('Please enter username')
    .isAlphanumeric().withMessage('Please use only letters and numbers')
    .isLength({ min: 3, max: 14 }).withMessage('Username must be between 3 and 14 characters long')
    .trim()
    .escape(),

    check('pass')
    .not().isEmpty().withMessage('Please enter password')
    .isLength({ min: 4, max: 14 }).withMessage('Password must be between 4 and 14 characters long')
    .trim()
    .escape(),

    check('rPass', 'Passwords do not match')
    .trim()
    .escape()
    .custom((value, {req}) => (value === req.body.pass)).withMessage('Passwords do not match'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ response: errors.array()[0].msg })
        }
        else next();
    }
];

module.exports = {
    postLogin,
    postRegister
}