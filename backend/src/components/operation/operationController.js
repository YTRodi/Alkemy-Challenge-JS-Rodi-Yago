const operationStore = require("./operationStore");
const { models: { User } } = require( '../../database' );
const controllerUser = require( '../user/userController' );


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

            // PASAR A UNA FUNCIÓN - START
            let userById = await controllerUser.getUserById( userId );

            if ( userById.balance < 0 ) 
                reject( { message: 'Balance = 0 😨' } );


            if ( bodyOperation.amount > 0 ) {

                // RESTO EL BALANCE DEL USUARIO         
                switch ( bodyOperation.type ) {
                    
                    case 'ingreso':

                        userById = {
                            ...userById,
                            balance: userById.balance + bodyOperation.amount
                        }

                        break;

                    case 'egreso':

                        userById = {
                            ...userById,
                            balance: // Logic: when the amount is greater than the balance...
                                ( bodyOperation.amount > userById.balance )
                                    ? reject( { message: 'Not enough funds 😭' } )
                                    : userById.balance - bodyOperation.amount
                        }

                        break;
                
                }
                // PASAR A UNA FUNCIÓN - END



                // HAGO EL UPDATE DEL USUARIO Y EL ADD DE LA OPERACIÓN.
                const updateResult = await controllerUser.updateUser( userId, userById );
                
                const newOperation = await operationStore.add( bodyOperation );
                
                if( updateResult === `Couldn't update - id doesn't exists.` )
                    reject( { message: updateResult } );


                if( updateResult === `Updated successfully` )
                    resolve( newOperation )

            } else {

                reject( { message: `The amount cannot be ${ bodyOperation.amount }` } );

            }
            

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

            // VALIDACIÓN USER : OPERATION - START (match userId (user) with userId (operation))
            let operationById = await getOperationById( idOperation );

            if ( operationById.userId !== userId )
                reject( { message: "Cannot modify other user's operations." } );
            
            // VALIDACIÓN USER : OPERATION - END
            

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