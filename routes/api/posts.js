const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// @route   POST api/posts
// @desc    create a post route
// @access  private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
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
        user: req.user.id,
      });

      const post = await newPost.save();

      res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/posts
// @desc    get all posts route
// @access  private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// @route   GET api/posts/:id
// @desc    get single post by id route
// @access  private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ msg: 'there is no post with this id' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'there is no post with this id' });
    }
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/posts/:id
// @desc    delete single post by id route
// @access  private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'user not authorized' });
    }

    if (!post) {
      return res.status(400).send('There is no post with this id');
    }

    await post.remove();
    res.status(200).json({ msg: 'Post is deleted' });
  } catch (error) {
    console.log(error);
    if (error.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'there is no post with this id' });
    }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/likes/:id
// @desc    like a post route
// @access  private
router.put('/likes/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    console.log(error);
    // if (error.kind == 'ObjectId') {
    //   return res.status(400).json({ msg: 'there is no post with this id' });
    // }
    res.status(500).send('Server error');
  }
});

// @route   PUT api/posts/unlikes/:id
// @desc    like a post route
// @access  private
router.put('/unlikes/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not yet been liked' });
    }

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
    res.status(200).json(post.likes);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// @route   POST api/posts/comment/:id
// @desc    comment on a post route
// @access  private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.status(200).json(post.comments);
    } catch (error) {
      console.log(error);
      res.status(500).send('Server error');
    }
  }
);

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    delete comment from a post route
// @access  private
router.delete('/comment/:post_id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    const comment = await post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'There is no comment on this post' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User is not authorized' });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();
    res.status(200).json(post.comments);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
