//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This file contains the methods to create a new user, sign in operation and the login operation.
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const router = require('express').Router();
const { User } = require('../../models');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This function is the POST route to create a new user.
// Note: This creates the session variables: user_id, logged_in and user_name.
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/', async (req, res) => {
  try 
  {
      // Test if user already exists in the database.  IF so return message telling user to use different username.
      const userData = await User.findOne({ where: { name: req.body.szUsername } });

      if (userData) {
        res
          .status(400)
          .json({ message: 'Username already exits in the database.\r\nPlease use a different Username.'});
        return;
      }

      // Create the new user.
      const dbUserData = await User.create({
        name: req.body.szUsername,
        password: req.body.szPassword,
      });

      // Set the session variables and save the session.
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      req.session.user_name = dbUserData.name;
      req.session.save();

      res.status(200).json(dbUserData);
  } 
  catch (err) 
  {
    console.log(err);
    res.status(500).json(err);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This function is a POST route to perform the the login operation.
// Note: This creates the session variables: user_id, logged_in and user_name.
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/login', async (req, res) => {
  try {
    // Find the user who matches the posted name.
    const userData = await User.findOne({ where: { name: req.body.szUsername } });

    // If the user is not found then return the following message to the user.
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again.' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.szPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again.' });
      return;
    }

    req.session.user_id = userData.id;
    req.session.logged_in = true;
    req.session.user_name = userData.name;
    req.session.save();

    res
       .status(200)
       .json({ user: userData, message: 'You are now logged in!' });
  } 
  catch (err) 
  {
    res.status(500).json(err);
  }
});

module.exports = router;
