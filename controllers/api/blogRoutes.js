const router = require('express').Router();
const { Blog } = require('../../models');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create a new Blog Post.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/', async (req, res) => {
  try
  {
    // Call the create method of the Blog model to add a new row to the Blog table.
    const newBlog = await Blog.create({
      user_id: req.body.user_id,
      title: req.body.title,
      content: req.body.content,
      dateposted: new Date().toLocaleDateString()
    });
    
    // Return the status of 200 and the success message.
    res.status(200).json({ message: 'Blog post was created successfully.' });
  }
  catch (err) 
  {
    // Return the status code of 500 and the error object.
    res.status(500).json({ message: 'Blog post create operation failed.' });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// Update a specific Blog Post.
/////////////////////////////////////////////////////////////////////////////////////////////////////////
router.put('/:id', async (req, res) => {
  try
  {
    // Calls the update method of the Blog model to update the row data based on the id
    // value passed in.
    const updatedBlog = await Blog.update(
      {
        // All the fields you can update and the data attached to the request body.
        user_id: req.body.user_id,
        title: req.body.title,
        content: req.body.content,
        dateposted: new Date().toLocaleDateString()        
      },
      {
        // Gets the blog based on the id given in the request parameters.
        where: 
        {
          id: req.params.id,
        },
      }
    )
 
    // Return the status code of 200 and tell the user that the Blog record was updated successfully.
    res.status(200).json({ message: "The Blog Post record was updated successfully." });    
  }
  catch (err)
  {
    // Return the status code of 500 and tell the user the update operation failed.    
    res.status(500).json({ message: 'Blog post update operation failed.' });    
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Delete a Blog Post by id.
//////////////////////////////////////////////////////////////////////////////////////////////////////
router.delete('/:id', async (req, res) => {
    try
    {
      // Call the destroy method of the Blog model to delete the Blog row in the table 
      // based on id given in the request parameters.
      const deletedBlog = Blog.destroy(
      {
        where: 
        {
          id: req.params.id,
        },
      })
  
      // Return the status code of 200 and tell the user that the Blog Post record was deleted successfully.
      res.status(200).json({ message: "The Blog Post record with the id value: " + req.params.id.toString() + " was deleted successfully." });
    }
    catch (err)
    {
      // Return a status code of 500 and tell the user that the Blog post delete operation failed. 
      res.status(500).json({ message: 'Blog post delete operation failed.' });           
    }
  });

module.exports = router;
