'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MaintainerResource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MaintainerResource.belongsTo(models.Resource,{
        foreignKey:"resource_id",
        as:'resource'
      });
      MaintainerResource.belongsTo(models.Maintainer,{
        foreignKey:"maintainer_id",
        as:'maintainer'
      });
    }
  };
  MaintainerResource.init({
    maintainer_id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete : 'CASCADE',
      references:{
        model:sequelize.models.Maintainer,
        key:'id'
      }
    },
    resource_id: {
      type:DataTypes.INTEGER,
      allowNull:false,
      onDelete : 'CASCADE',
      references:{
        model:sequelize.models.Resource,
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'MaintainerResource',
    timestamps:false
  });
  return MaintainerResource;
};