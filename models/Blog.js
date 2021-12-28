const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

const User = require('./User');

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
        unique: false,
      },            
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,      
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
    modelName: 'blog',
  }
);

module.exports = Blog;