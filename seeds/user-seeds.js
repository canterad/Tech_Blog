const { User } = require('../models');

const userData = [
  {
    name: 'name', 
    password: 'password',
  },
  {
    name: 'canterad', 
    password: 'password',
  },  
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
