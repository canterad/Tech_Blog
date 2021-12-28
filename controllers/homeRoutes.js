const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Call the findAll method of the Blog model to get all of the rows from the Blog table. 
    // Include the User model.
    const blogData = await Blog.findAll({
      include: [{ model: User }],
    });

    const blogs = blogData.map((project) => project.get({ plain: true }));

    // Need to set this up to get value from session variable.
    //res.render('homepage', {blogs, loggedIn: true, });
    res.render('homepage', {blogs, loggedIn: false });
  
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
