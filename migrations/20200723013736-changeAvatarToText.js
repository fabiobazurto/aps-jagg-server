'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      queryInterface.changeColumn(
	  'Users',
	  'avatar',
	  {
	      type: Sequelize.TEXT,
	      allowNull: true,
	  }
      )

  },

  down: async (queryInterface, Sequelize) => {
      queryInterface.changeColumn(
	  'Users',
	  'avatar',
	  {
	      type: Sequelize.BLOB,
	      allowNull: true,
	  }
      )

  }
};
