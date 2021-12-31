const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const withAuth = require('../utils/auth');


/////////////////////////////////////////////////////////////////////////////////////////////////////
// This is the get call to get all of the blogs for the homepage.
/////////////////////////////////////////////////////////////////////////////////////////////////////
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
    res.render('homepage', {blogs, loggedIn: req.session.logged_in,
                                   dashboardPage: false});
  
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This is the route for the log out operation.
////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/logout', (req, res) => {
  if (req.session.logged_in) 
  {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } 
  else 
  {
    res.status(404).end();
  }
});

////////////////////////////////////////////////////////////////////////////
// Route to get, display the login page.
// This is rendering the login page, no data model is used.
///////////////////////////////////////////////////////////////////////////
router.get('/login', async (req, res) => {
  try
  {
    res.render('login', { loggedIn: req.session.logged_in,
                          dashboardPage: false,
                          loginPage: true });
  }
  catch (err)
  {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////////////
// Route to get, display the dashboard page.
// This route does a findAll based on the user_id value. All post for this user
// will be displayed on the dashboard page. 
////////////////////////////////////////////////////////////////////////////////////////
router.get('/dashboard',  withAuth, async (req, res) => {
  try
  {
    // Call the findAll method of the Blog model to get all of the rows from the Blog table that contain a match
    // on the user_id value. Include the User model.
    const blogData = await Blog.findAll({
      include: [{ model: User }], where: { user_id: req.session.user_id }
    });

    const blogs = blogData.map((project) => project.get({ plain: true }));

    res.render('dashboard', {blogs, loggedIn: req.session.logged_in,
                             dashboardPage: true });
  }
  catch (err)
  {
    res.status(500).json(err);
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// This route will bring up the Comment page if adding a new one or displaying one that exists.
// If we are creating a new comment the id value is zero and we use the blog_id instead to get the blog
// and include the user.
//
// If we are diplaying an existing comment then use the id parameter value and get the comment
// and include the blog and user.
///////////////////////////////////////////////////////////////////////////////////////////////////////////
router.get('/comment/:id/:blog_id', async (req, res) => {
  try 
  {
    let bAddComment = false;
    let blogData = null;

    // If the id parameter value is zero then use the blog id and get the blog record and do not
    // include the Comment model.
    if (req.params.id == "0")
    {
      // Set the boolean value to true because we are adding a new comment.
      bAddComment = true;

        blogData = await Blog.findByPk(req.params.blog_id, {
        include: [{ model: User }],
      });
    }    
    // Otherwise get the comment record and include the blog and user models.
    else
    {
        blogData = await Comment.findByPk(req.params.id, {
        include: 
        [
          {
            model: Blog,
          },
          {
            model: User, 
          }
        ],
      });
    }

    // If the Blog id not found tell the user.
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with that id!' });
      return;
    }

    // Get the data for just the one item.
    const blogItem = blogData.get({ plain: true });
    
    console.log(blogItem);

    // Render the comment view pass in the blogItem model and other values that the page tests.
    res.render('comment', {blogItem, loggedIn: req.session.logged_in,
      dashboardPage: false, commentPage: true, addComment: bAddComment,});
  } 
  catch (err) 
  {
    // Return the status code of 500 - the error object.
    res.status(500).json(err);
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////
// Route to bring up page to add or edit a blog post.
// This routine is tesing the id value passed in.  If the id value is zero then we just
// render the page because we are creating a new blog.  Otherwise we get the blog and
// render it on the page for the update or delete operation.
/////////////////////////////////////////////////////////////////////////////////////////////
router.get('/blog/:id', async (req, res) => {
  try
  {
    let userId = req.session.user_id;
    let blogId = req.params.id;

    if (req.params.id != "0")
    {
        const blogData = await Blog.findByPk(req.params.id, {
          include: [{ model: User }],
         });

        // Get the data for just the one item.
        const blogItem = blogData.get({ plain: true });

       

        res.render('blog', {blogItem, loggedIn: req.session.logged_in,
                                      dashboardPage: true,
                                      newPost: false,
                                      blogPage: true,
                                      userIdValue: userId,
                                      blogIdValue: blogId, });        
    }
    else
    {
        res.render('blog', { loggedIn: req.session.logged_in,
                         dashboardPage: true,
                         newPost: true,
                         blogPage: true,
                         userIdValue: userId,
                         blogIdValue: blogId,});
    }
  }
  catch (err)
  {
    res.status(500).json(err);
  }
});

module.exports = router;
