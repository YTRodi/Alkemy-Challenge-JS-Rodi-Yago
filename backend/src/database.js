const { Sequelize } = require( 'sequelize' );
const { database } = require( './config' );
const chalk = require( 'chalk' );

// Models
const userModel = require( './components/user/userModel' );
const operationModel = require( './components/operation/operationModel' );


const sequelize = new Sequelize( database.database, database.user, database.password, {
    host: database.host,
    dialect: 'mysql'
});


// Throw anfc
const User = userModel( sequelize );
const Operation = operationModel( sequelize );


// Sync with the database
const connectDB = async() => {

    try {
        
        await sequelize.sync( { force: false } );
        console.log( chalk.magenta( 'DB Connected successfully !' ) );

    } catch (error) {
        
        console.log( chalk.red( `Error connecting to database.` ) )
        console.log( chalk.yellow( error ) );

    }

}


module.exports = {
    connectDB,
    models: {
        User,
        Operation
    }
}