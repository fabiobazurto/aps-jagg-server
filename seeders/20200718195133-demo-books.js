'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
	return queryInterface.bulkInsert('Books', [
	    {
		title: 'The book of John Doe',
		short_description: 'This is the description of John Does book',
	    },
	    {
		title: 'The book of Mary May',
		short_description: 'This is the description of Mary May book',						   }]);
    },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Books', null, {});

  }
};
