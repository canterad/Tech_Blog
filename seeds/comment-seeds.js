const { Comment } = require('../models');

const commentData = [
  {
    blog_id: 1, 
    user_id: 1,
    content: 'I just learned about this in my class!',
    dateposted: new Date().toLocaleDateString(),    
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
