'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Anomalies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resource_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        onDelete : 'CASCADE',
        references:{
          model : 'Resources',
          key :'id'
        }
      },
      location_id: {
        allowNull:false,
        type: Sequelize.INTEGER,
        onDelete : 'CASCADE',
        references:{
          model : 'Locations',
          key :'id'
        }
      },
      message: {
        allowNull:false,
        type: Sequelize.STRING
      },
      resolved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Anomalies');
  }
};