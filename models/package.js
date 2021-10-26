const Sequelize = require("sequelize");
const sequelize = require('../database');

const Package = sequelize.define('package', {

	packageId:{
		type:Sequelize.STRING,
		primaryKey:true
	},

	name: Sequelize.STRING,
	price:Sequelize.STRING,
	bed_count:Sequelize.INTEGER,
	
}
,{
    timestamps: false,
})

module.exports = Package
