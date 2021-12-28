const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  try 
  {
    // Call the findAll method of the Blog model to get all of the rows from the Blog table. 
    // Include the User model.
    const blogData = await Blog.findAll({
      include: [{ model: User }],
    });

    const blogs = blogData.map((project) => project.get({ plain: true }));

    // Need to set this up to get value from session variable.
    //res.render('homepage', {blogs, loggedIn: true, });
    res.render('homepage', {blogs, loggedIn: true,
                                   dashboardPage: false});
  
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

// I need to add the following routes.
// Get all the dashboard items - Display the Dashboard page.
// login operation - Display the Login - Signup page.
// logout operation - Not needed? Get all the blogs and display the home page - Not sure?.
// Add a comment operation - Get a specific blog and display the comment page.
// Add, Edit, Delete a blog - Create New Post, Edit Post page displayed.

// Route to get, display the login page.
router.get('/login', async (req, res) => {
  try
  {
    res.render('login', { loggedIn: false,
                          dashboardPage: false });
  }
  catch (err)
  {
    res.status(500).json(err);
  }
});

// Route to get, display the dashboard page.
router.get('/dashboard', async (req, res) => {
  try
  {
    res.render('dashboard', { loggedIn: true,
                              dashboardPage: true });
  }
  catch (err)
  {
    res.status(500).json(err);
  }
});

// Route to bring up page to add a comment to a blog.
router.get('/comment', async (req, res) => {
  try
  {
    res.render('comment', { loggedIn: true,
                            dashboardPage: false });
  }
  catch (err)
  {
    res.status(500).json(err);
  }
});

// Route to bring up page to add or edit a blog post.
router.get('/blog', async (req, res) => {
  try
  {
    res.render('blog', { loggedIn: true,
                         dashboardPage: true });
  }
  catch (err)
  {
    res.status(500).json(err);
  }
});


module.exports = router;
