'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anomaly extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Anomaly.belongsTo(models.Resource,{
        foreignKey:"resource_id",
        as:'resource'
      });
      Anomaly.belongsTo(models.Location,{
        foreignKey:"location_id",
        as:"location"
      });

    }
  }
  Anomaly.init({
    resource_id:{
      type: DataTypes.INTEGER,
      allowNull : false,
      onDelete : 'CASCADE',
      references:{
        model : sequelize.models.Resource,
        key :'id'
      }
    } ,
    location_id: {
      type: DataTypes.INTEGER,
      allowNull : false,
      onDelete : 'CASCADE',
      references:{
        model : sequelize.models.Location,
        key :'id'
      }
    },
    message: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          args:true,
          msg:"le champs commantaire ne doit pas être vide"
        }
      }
    },
    resolved: {
      type :DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Anomaly',
    updatedAt:false
  });
  return Anomaly;
};