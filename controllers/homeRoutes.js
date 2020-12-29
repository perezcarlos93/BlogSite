const router = require('express').Router();
const {Post, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const publicPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = publicPosts.map((posts) => posts.get({plain: true}));

    res.render('homepage', {
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
