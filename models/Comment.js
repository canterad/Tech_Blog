const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const User = require('./User');

const Blog = require('./Blog');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Blog,
        key: 'id',
        unique: false,
      },            
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,      
    },  
    dateposted: {
      type: DataTypes.DATEONLY,
      allowNull: false,
     },  
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment',
  }
);

module.exports = Comment;