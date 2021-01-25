const { DataTypes } = require( 'sequelize' );

// Export the model
module.exports = ( sequelize ) => {

    // #1 Nombre de la tabla que vamos a generar en singular.
    // #2 Obj con los campos a generar.
    return sequelize.define( 'operation', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        concept: {
            type: DataTypes.STRING( 60 ),
            allowNull: false,
            validate: {
                len: [ 2, 60 ]
            }
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING( 10 ),
            allowNull: false
        }
        
    });

}