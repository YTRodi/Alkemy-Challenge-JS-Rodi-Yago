const { models: { User } } = require( '../../database' );

const login = async ( email ) => {

    return await User.findOne( {
        where: { email }
    });

};

const getAllUsers = async() => {
    return await User.findAll();
};

const getUserById = async ( userId ) => {

    return await User.findOne( {
        where: { id: userId }
    });

};

const getUserByEmail = async ( userEmail ) => {
    
    return await User.findOne( {
        where: { email: userEmail }
    });

};



const addUser = async ( bodyUser ) => {

    const { dataValues } = await User.create( bodyUser );
    return dataValues;

};

const updateUser = async( userId, bodyUser ) => {
    
    return await User.update( bodyUser, {
        where: { id: userId }
    });

};

const deleteUser = async( userId ) => {

    return await User.destroy({
        where: { id: userId }
    });

};

module.exports = {
    login,
    list: getAllUsers,
    getUserById: getUserById,
    getUserByEmail: getUserByEmail,
    add: addUser,
    update: updateUser,
    delete: deleteUser
};