const { Comment } = require('../models');

const commentData = [
  {
    blog_id: 1, 
    content: 'I just learned about this in my class!',
    dateposted: Date.now(),    
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
