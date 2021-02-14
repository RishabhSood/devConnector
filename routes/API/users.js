const express = require('express');
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const router = express.Router();
const normalize = require('normalize-url');

const User = require('../../Models/User');

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
    '/',
    [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email!')
            .isEmail(),
        check('password', 'Please enter a password with 6 or more characters')
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });
            // See if the user exists
            if (user) {
                return res.status(400).json({ errors: [{ message: 'User already exists' }] });
            }
            // Get user's gravatar
            const avatar = normalize(
                gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                }),
                { forceHttps: true }
            );

            user = new User({
                name,
                email,
                avatar,
                password
            });

            // Encrypt password using bcrypt
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            // save user to database
            await user.save();
            res.send("User succesfully registered!");
            // Return jsonwebtoken (for logging in)
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;