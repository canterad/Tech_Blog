////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This file contains the method to perform the Create operation for the Comment model.
////////////////////////////////////////////////////////////////////////////////////////////////////////////

const router = require('express').Router();
const { Comment, Blog, User } = require('../../models');

///////////////////////////////////////////////////////////////////////////////////////////////
// This is the POST operation for the Comment model.  It creates a Comment record and adds it
// to the database table.  It returns the id of the new record created.
///////////////////////////////////////////////////////////////////////////////////////////////
router.post('/', async (req, res) => {
    try 
    {
        // Call the create method of the Comment model to add a new row to the Comment table.
        const newComment = await Comment.create({
            blog_id: req.body.blogid_value,
            user_id: req.body.userid_value,
            content: req.body.comment,
            dateposted: new Date().toLocaleDateString()
        });

        res.status(200).json([{id: newComment.dataValues.id}]);
    }
    catch (err) 
    {
        res.status(400).json(err);
    }
});

module.exports = router;
