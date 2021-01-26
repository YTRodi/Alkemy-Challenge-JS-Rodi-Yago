const { models: { Operation } } = require( '../../database' );

const getAllOperations = async () => { 
    return await Operation.findAll();
};

const getOperationById = async ( idOperation ) => {

    return await Operation.findOne( {
        where: { id: idOperation }
    });

};

const addOperation = async ( bodyOperation ) => {

    const { dataValues } = await Operation.create( bodyOperation );
    return dataValues;

};

const updateOperation = async( idOperation, bodyOperation ) => {
    
    return await Operation.update( bodyOperation, {
        where: { id: idOperation }
    });

}

const deleteOperation = async( idOperation ) => {

    return await Operation.destroy({
        where: { id: idOperation }
    });

}


module.exports = {
    list: getAllOperations,
    operationById : getOperationById,
    add: addOperation,
    update: updateOperation,
    delete: deleteOperation
}