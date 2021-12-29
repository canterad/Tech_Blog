const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

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
    res.render('homepage', {blogs, loggedIn: false,
                                   dashboardPage: false});
  
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////
// I need to add the following routes.
// Get all the dashboard items - Display the Dashboard page.
// login operation - Display the Login - Signup page.
// logout operation - Not needed? Get all the blogs and display the home page - Not sure?.
// Add a comment operation - Get a specific blog and display the comment page.
// Add, Edit, Delete a blog - Create New Post, Edit Post page displayed.
/////////////////////////////////////////////////////////////////////////////////////////////////

// Route to get, display the login page.
///////////////////////////////////////////////////////////////////////////
// THIS CODE WAS IN THIS FILE ORIGINALLY, NOT SURE IF I WILL USE IT.
///////////////////////////////////////////////////////////////////////////
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

////////////////////////////////////////////////////////////////////////////////////////
// Route to get, display the dashboard page.
// This just renders the page.  Not getting the data and passing in a model yet.
////////////////////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////////
// Route to bring up page to add a comment to a blog.
// This just renders the page.  Not getting the data and passing in a model yet.
// NOT SURE IF I WILL NEED THIS.
////////////////////////////////////////////////////////////////////////////////////
router.get('/comment', async (req, res) => {
  try
  {
    res.render('comment', { loggedIn: true,
                            dashboardPage: false,
                            commentPage: true, });
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
    res.render('comment', {blogItem, loggedIn: true,
      dashboardPage: false, commentPage: true, addComment: bAddComment,});
  } 
  catch (err) 
  {
    // Return the status code of 500 - the error object.
    res.status(500).json(err);
  }
});

///////////////////////////////////////////////////////////////////////
// Route to bring up page to add or edit a blog post.
// This routine is just displaying the blog page for now.
///////////////////////////////////////////////////////////////////////
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
