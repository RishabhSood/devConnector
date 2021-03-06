const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');
const User = require('../../Models/User');
const Post = require('../../Models/Post');

// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post('/', [auth, [
    check('text', 'Text is required!').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        await newPost.save();

        res.json(newPost);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

// @route  GET api/posts
// @desc   Get all posts
// @access Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  GET api/posts/:post_id
// @desc   Get post by id
// @access Private
router.get('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        if (!post) return res.status(400).json({ msg: "Post not found!" });
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(400).json({ msg: "Post not found!" });
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/posts/:post_id
// @desc   Delete post by id
// @access Private
router.delete('/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post)
            return res.status(400).json({ msg: "Post not found!" });

        if (post.user.toString() !== req.user.id)
            return res.status(400).json({ msg: 'Invalid request!' });

        await post.remove();
        res.json({ msg: 'Post successfully deleted!' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') return res.status(400).json({ msg: "Post not found!" });
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/posts/like/:post_id
// @desc   Like post by id
// @access Private
router.put('/like/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post)
            res.status(400).json({ msg: 'Post does not exist!' });

        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked!' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId')
            return res.status(400).json({ msg: 'Post does not exist!' });
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/posts/unlike/:post_id
// @desc   Unlike post by id
// @access Private
router.delete('/unlike/:post_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post)
            res.status(400).json({ msg: 'Post does not exist!' });

        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'You have not liked this post!' });
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId')
            return res.status(400).json({ msg: 'Post does not exist!' });
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/comments/:post_id
// @desc   Comment on post by id
// @access Private
router.put('/comment/:post_id', [auth, [
    check('text', 'Comment cannot be blank!').not().isEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });

    const user = await User.findById(req.user.id).select('-password');

    const comment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
    };

    try {
        const post = await Post.findById(req.params.post_id);

        if (!post)
            res.status(400).json({ msg: 'Post does not exist!' });

        post.comments.unshift(comment);

        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId')
            return res.status(400).json({ msg: 'Post does not exist!' });
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/comment/:post_id/:comment_id
// @desc   Delete comment on post by id
// @access Private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if (!post)
            return res.status(400).json({ msg: 'Post does not exist!' });

        const comment = post.comments.find(
            comment => comment.id === req.params.comment_id
        );

        if (!comment)
            return res.status(400).json({ msg: 'Comment does not exist!' });

        if (comment.user.toString() !== req.user.id)
            return res.status(400).json({ msg: 'Invalid request!' });

        const removeIndex = post.comments.map(comment => comment.id).indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId')
            return res.status(400).json({ msg: 'Post does not exist!' });
        res.status(500).send('Server Error');
    }
});
module.exports = router;