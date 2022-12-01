'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MaintainerResources', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      maintainer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete : 'CASCADE',
        references:{
          model : 'Maintainers',
          key : 'id'
        }
      },
      resource_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete : 'CASCADE',
        references:{
          model : 'Resources',
          key : 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MaintainerResources');
  }
};