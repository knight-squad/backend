const Sequelize = require("sequelize");
const sequelize = require('../database');

const Center = sequelize.define('center', {

	centerId:{
		type:Sequelize.STRING,
		primaryKey:true
	},

	name: Sequelize.STRING,
	email:Sequelize.STRING,
	district:Sequelize.STRING,
	location:Sequelize.STRING,
	contact_no:Sequelize.STRING,
    image:Sequelize.STRING,
	
}
,{
    timestamps: false,
})

module.exports = Center
