'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Resource.init({
    name: {
      type : DataTypes.STRING,
      allowNull: false,
      unique:{
        args:true,
        msg : "Cette ressource existe déjà"
      },
      validate:{
        notEmpty:{
          args: true,
          msg: "le nom de la ressource ne peut pas être vide"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args: true,
          msg: "la description de la ressource ne peut pas être vide"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Resource',
    timestamps: false
  });
  return Resource;
};