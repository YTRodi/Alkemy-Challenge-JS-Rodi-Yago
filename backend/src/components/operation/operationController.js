const operationStore = require("./operationStore");
const { models: { User } } = require( '../../database' );
const controllerUser = require( '../user/userController' );
const userActions = require( '../../actions/userActions' );


const getAllOperations = ( userId ) => {

    return new Promise( async( resolve, reject ) => {
       
        try {
            
            const allOperations = await operationStore.list( userId );

            if( allOperations.length === 0 )
                resolve( 'Empty operations list' );
            
            resolve( allOperations );

        } catch (error) {
            
            reject( { message: 'Unexpected error', error } );

        }
        
    });
    
};


const getOperationById = ( idOperation ) => {

    return new Promise( async( resolve, reject ) => {
        
        try {
            
            if( !idOperation )
                reject( { message: `Invalid data: id = ${ idOperation }` } );

            const operationById = await operationStore.operationById( idOperation );
            
            if( !operationById ) 
                reject( { message: `Couldn't get - id doesn't exists.` } );

            resolve( operationById );

        } catch ( error ) {
            
            reject( { message: error } );
            
        }
        
    });

};


const addOperation = ( userId, operation ) => {

    return new Promise( async( resolve, reject ) => {
        
        try {

            if( !userId || !operation ) 
                reject( { message: `Invalid data: userId or operation is undefined.` } );
            
            
            const bodyOperation = {
                userId,
                concept: operation.concept,
                amount: operation.amount,
                date: new Date(),
                type: operation.type
            };

            const userById = await controllerUser.getUserById( userId );

            if ( userById.balance < 0 ) 
                reject( { message: 'Balance = 0' } );
            
            // check
            const result = userActions.checkBalanceAmount( userById, bodyOperation );

            if ( !result ) 
                reject( { message: `Amount cannot be less than or equal to 0` } );


            if ( result === 'Not enough funds' ) 
                reject( { message: result } );


            // update user and add operation
            const updateResult = await controllerUser.updateUser( userId, userById );
            
            const newOperation = await operationStore.add( bodyOperation );
            
            if( updateResult === `Couldn't update - id doesn't exists.` )
                reject( { message: updateResult } );


            if( updateResult === `Updated successfully` )
                resolve( newOperation )
                   

        } catch (error) {

            reject( { message: error } );
        }
        
    });

};


const updateOperation = ( idOperation, userId, operation ) => {

    return new Promise( async( resolve, reject ) => {
        
        try {

            if ( !idOperation || !userId || !operation )
                reject( { message: `Invalid data: id, userId or operation is undefined.` } );

            
            // VALIDACIÓN USER : OPERATION (match userId (user) with userId (operation))
            let operationById = await getOperationById( idOperation );

            if ( operationById.userId !== userId )
                reject( { message: "Cannot modify other user's operations." } );
            
                
            // Use of the spread operator
            const { dataValues } = operationById; 

            operationById = {
                ...dataValues,
                concept: operation.concept,
                date: new Date( operation.date )
            }

            const [ result ] = await operationStore.update( idOperation, operationById );

            result !== 0 && result
                ? resolve( 'updated successfully' )
                : reject( `Couldn't update - id doesn't exists.` )
            

        } catch (error) {

            reject( { message: error } );
            
        }
        
    });

};


const deleteOperation = ( idOperation, userId ) => {

    return new Promise( async( resolve, reject ) => {
    
        try {
            
            if( !idOperation )
                reject( { message: `Invalid data: idOperation = ${ idOperation }` } );


            // VALIDACIÓN USER : OPERATION - START (match userId (user) with userId (operation))
            let operationById = await getOperationById( idOperation );

            if ( operationById.userId !== userId )
                reject( { message: "Cannot modify other user's operations." } );
            // VALIDACIÓN USER : OPERATION - END
            
        
            const result = await operationStore.delete( idOperation );

            result !== 0 && result
                ? resolve( 'deleted successfully' )
                : reject( `Couldn't delete - id doesn't exists.` )


        } catch (error) {
            
            reject( { message: error } );
            
        }

    });
    
};

module.exports = {
    getAllOperations,
    getOperationById,
    addOperation,
    updateOperation,
    deleteOperation
}