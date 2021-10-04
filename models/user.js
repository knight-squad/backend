const Sequelize = require("sequelize");
const sequelize = require('../database');

const User = sequelize.define('user', {

	userId:{
		// Sequelize module has INTEGER Data_Type.
		type:Sequelize.STRING,
		// To increment user_id automatically.
		// autoIncrement:true,
		// user_id can not be null.
		// allowNull:false,
		// For uniquely identify user.
		primaryKey:true
	},

	name: Sequelize.STRING,
	email:Sequelize.STRING,
	password:Sequelize.STRING,
	address:Sequelize.STRING,
	contact_no:Sequelize.STRING,
	
}
,{
    timestamps: false,
})

module.exports = User
