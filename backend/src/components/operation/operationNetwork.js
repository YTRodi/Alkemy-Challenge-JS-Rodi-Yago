const express = require( 'express' );
const response = require( '../../network/response' );
const router = express.Router();

const { models } = require( '../../database' );
const { Operation } = models;


router.get( '/', async( req, res ) => {

    try {
        
        const operations = await Operation.findAll();

        ( operations.length === 0 )
            ? response.success( req, res, operations, 'Empty operations' )
            : response.success( req, res, operations, 'List all operations' )

    } catch ( error ) {
        
        response.error( req, res, 'Unexpected error', 500, 'Internal error' );

    }

});

router.get( '/:id', async( req, res ) => {

    try {
        
        // returns an array!
        const OperationById = await Operation.findAll( {
            where: { id : req.params.id }
        });


        if ( OperationById.length === 0 ) 
            response.error( req, res, `Couldn't get - id doesn't exists.`, 400, 'Controller error')
        else {

            const [ operation ] = OperationById;
            const { dataValues } = operation;

            dataValues
                ? response.success( req, res, dataValues, 'Get operation by id' )
                : response.error( req, res, `Couldn't get - id doesn't exists.`, 400, 'Controller error')

        }
    

    } catch ( error ) {
        
        response.error( req, res, 'Unexpected error', 500, 'Internal error' );

    }
    
});

router.post( '/add', async( req, res ) => {

    try {

        const { id_user } = req.body;
        const { operation } = req.body;
        
        const bodyOperation = {
            id_user,
            concept: operation.concept,
            amount: operation.amount,
            date: new Date(),
            type: operation.type
        };
        
        const newOperation = await Operation.create( bodyOperation );

        newOperation
            ? response.success( req, res, newOperation, 'created', 201 )
            : response.error( req, res, `Couldn't create.` , 400, 'Controller error' )

    } catch ( error ) {

        response.error( req, res, error, 400, 'Controller error' );

    }

});

router.put( '/update/:id', async( req, res ) => {

    try {

        const { id_user } = req.body;
        const { operation } = req.body;

        const bodyOperation = {
            id_user,
            concept: operation.concept,
            amount: operation.amount,
            date: new Date(),
            type: operation.type
        };
        
        const updateOperation = await Operation.update( bodyOperation, {
            where: { id: req.params.id }
        });

        // [ 1 ] = exist
        // [ 0 ] = doesn't exist
        updateOperation.length !== 0 && updateOperation[0] !== 0 && updateOperation
            ? response.success( req, res, 'updated successfully', 'updated', 200 )
            : response.error( req, res, `Couldn't update - id doesn't exists.`, 500, 'Controller error' )
        

    } catch ( error ) {
        
        response.error( req, res, error, 500, 'Controller error' );

    }
    
});

router.delete( '/delete/:id', async( req, res ) => {

    try {
        
        const deleteOperation = await Operation.destroy( {
            where: { id: req.params.id }
        });

        deleteOperation !== 0 && deleteOperation
            ? response.success( req, res, 'deleted successfully', 'deleted', 200 )
            : response.error( req, res, `Couldn't delete - id doesn't exists.`, 500, 'Controller error' )

    } catch ( error ) {

        response.error( req, res, error, 500, 'Controller error' );
        
    }
    
});


module.exports = router;