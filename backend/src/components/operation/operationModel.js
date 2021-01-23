const { Sequelize, DataTypes } = require('sequelize');

// Exporto el modelo
module.exports = ( sequelize, type ) => {

    // #1 Nombre de la tabla que vamos a generar en singular.
    // #2 Obj con los campos a generar.
    return sequelize.define( 'operation', {

        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_user: type.INTEGER,
        concept: type.STRING,
        amount: type.INTEGER,
        date: type.DATE
        
    });

}