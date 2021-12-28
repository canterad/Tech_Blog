const { Blog } = require('../models');

const sequelize = require('../config/connection.js');

const blogData = [
  {
    user_id: 1, 
    title: 'Why MVC is so important',
    content: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
    dateposted: new Date().toLocaleDateString(),
  },
  {
    user_id: 2, 
    title: 'Authentication vs. Authorization',
    content: 'There is a difference between authentication and authorization.  Authentication means confirming your own identity, whereas authorization means being allowed access to the system.',
    dateposted: new Date().toLocaleDateString(),
  },
  {
    user_id: 2, 
    title: 'Object-Relational Mapping',
    content: "I have really loved learning about ORMs.  It's really simplified the way I create queries in SQL!",
    dateposted: new Date().toLocaleDateString(),
  },    
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
