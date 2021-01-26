const operationStore = require("./operationStore");

const getAllOperations = () => {

    return new Promise( async( resolve, reject ) => {
       
        try {
            
            const allOperations = await operationStore.list();

            if( allOperations.length === 0 )
                resolve( 'Empty operations' );
            
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


            const { dataValues } = operationById;
            resolve( dataValues );

        } catch ( error ) {
            
            reject( { message: error } );
            
        }
        
    });

};

const addOperation = ( id_user, operation ) => {

    return new Promise( async( resolve, reject ) => {
        
        try {

            if( !id_user && !operation ) 
                reject( { message: `Invalid data: id_user or operation is undefined.` } );
            
            
            const bodyOperation = {
                id_user,
                concept: operation.concept,
                amount: operation.amount,
                date: new Date(),
                type: operation.type
            };
        
            const newOperation = await operationStore.add( bodyOperation );

            !newOperation
                ? reject( { message: `Couldn't create.` } )
                : resolve( newOperation )

        } catch (error) {
            
            reject( { message: error } );

        }
        
    });

};

// const updateOperation = ( id_user, operation ) // Un usuario tiene muchas operaciones.
const updateOperation = ( idOperation, id_user, operation ) => {

    return new Promise( async( resolve, reject ) => {
        
        try {

            if ( !idOperation && id_user && operation )
                reject( { message: `Invalid data: id, id_user or operation is undefined.` } );
                

            const bodyOperation = {
                id: idOperation,
                id_user,
                concept: operation.concept,
                amount: operation.amount,
                date: new Date(),
                type: operation.type
            };
            
            
            const [ result ] = await operationStore.update( idOperation, bodyOperation );

            result !== 0 && result
                ? resolve( 'updated successfully' )
                : reject( `Couldn't update - id doesn't exists.` )
            

        } catch (error) {

            reject( { message: error } );
            
        }
        
    });

};

const deleteOperation = ( id ) => {

    return new Promise( async( resolve, reject ) => {
    
        try {
            
            if( !id )
                reject( { message: `Invalid data: id is undefined.` } );

            const result = await operationStore.delete( id );

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