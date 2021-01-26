const { DataTypes } = require( 'sequelize' );

// Export the model
module.exports = ( sequelize ) => {

    // #1 Nombre de la tabla que vamos a generar en singular.
    // #2 Obj con los campos a generar.
    return sequelize.define( 'user', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING( 30 ),
            allowNull: false,
            validate: {
                len: [ 6, 20 ]
            }
        },
        email : {
            type: DataTypes.STRING( 40 ),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    });

}