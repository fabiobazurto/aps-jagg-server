'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
	return queryInterface.bulkInsert('Users', [
	    {
		username: 'aps admin',
		email: 'admin@aps.com',
		password:'$2b$10$jpwodHmuHfzS0iywhR0wZ.dmY2azCB2x9Lj7CndFUTGnzB5uCvVmm'
	    },
	    {
		username: 'fabiobazurto',
		email: 'fbazurto@aps.com',
		password:'$2b$10$jpwodHmuHfzS0iywhR0wZ.dmY2azCB2x9Lj7CndFUTGnzB5uCvVmm'
	    }
	]
					);
    },
    
    down: async (queryInterface, Sequelize) => {
	return queryInterface.bulkDelete('Users', null, {});
    }
};
