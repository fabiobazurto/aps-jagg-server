'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.addColumn(
	  'Users',
	  'avatar',
	  {
	      type: Sequelize.BLOB,
	      allowNull: true,
	  }
      );
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.removeColumn(
	  'Users',
	  'avatar'
      );
  }
};
