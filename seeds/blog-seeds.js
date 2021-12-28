const { Blog } = require('../models');

const blogData = [
  {
    user_id: 1, 
    title: 'Why MVC is so important',
    content: 'MVC allows developers to maintain a true separation of concerns, devising their code between the Model layer for data, the View layer for design, and the Controller layer for application logic.',
    dateposted: Date.now(),
  },
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;
