
const Sequelize = require('sequelize')

// Creating new Object of Sequelize
const sequelize = new Sequelize(
	'qcrs_database',
	'doadmin',
	'PDcxHhjc8uINv7vS', {

		// Explicitly specifying
		// mysql database
		dialect: 'mysql',

		// By default host is 'localhost'		
		host: 'db-mysql-blr1-86273-do-user-10018666-0.b.db.ondigitalocean.com',
		port: 25060
	}
);

// Exporting the sequelize object.
// We can use it in another file
// for creating models
module.exports = sequelize

