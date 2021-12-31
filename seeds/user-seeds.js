const { User } = require('../models');

// The password below is encrypted for the word "password".
const userData = [
  {
    name: 'name', 
    password: '$2b$10$qhwJbj0rYu6abwJyZm0spe0xf45CtB.5WfGiT9hmaNcfUunY.aAAy',
  },
  {
    name: 'canterad', 
    password: '$2b$10$qhwJbj0rYu6abwJyZm0spe0xf45CtB.5WfGiT9hmaNcfUunY.aAAy',
  },  
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
