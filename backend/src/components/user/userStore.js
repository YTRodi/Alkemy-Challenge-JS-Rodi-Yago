const { models: { User } } = require( '../../database' );

const getAllUsers = async() => {
    return await User.findAll();
};

const getOperationById = async ( idUser ) => {

    return await User.findOne( {
        where: { id: idUser }
    });

};

const addUser = async ( bodyUser ) => {

    const { dataValues } = await User.create( bodyUser );
    return dataValues;

};

const updateUser = async( idUser, bodyUser ) => {
    
    return await User.update( bodyUser, {
        where: { id: idUser }
    });

};

const deleteUser = async( idUser ) => {

    return await User.destroy({
        where: { id: idUser }
    });

};

module.exports = {
    list: getAllUsers,
    userById: getOperationById,
    add: addUser,
    update: updateUser,
    delete: deleteUser
};