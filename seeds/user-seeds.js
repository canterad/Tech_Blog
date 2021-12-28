const { User } = require('../models');

const userData = [
  {
    name: 'name', 
    password: 'password',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
