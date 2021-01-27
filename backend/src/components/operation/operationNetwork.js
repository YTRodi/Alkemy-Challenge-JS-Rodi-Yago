const express = require( 'express' );
const response = require( '../../network/response' );
const controller = require( './operationController' );
const router = express.Router();

/**
 * EXAMPLE JSON ( userId == req.userId )
 * 
    {
        "concept": "smartv LG",
        "amount": 115000,
        "type": "egreso"
    }
 */

router.get( '/all', ( req, res ) => {

    controller.getAllOperations( req.userId )
        .then( ( list ) => {

            response.success( req, res, list, 'List of operations' );
            
        })
        .catch( ( err ) => {

            response.error( req, res, err, 500, 'Internal error' );

        });

});

router.get( '/:id', ( req, res ) => {

    const { id } = req.params;

    controller.getOperationById( id )
        .then( ( data ) => {

            response.success( req, res, data, 'Get operation by id' );

        })
        .catch( ( err ) => {

            response.error( req, res, err, 400, 'Controller error');

        });
    
});


router.post( '/add', ( req, res ) => {

    const userId = req.userId;
    const operation = req.body;

    controller.addOperation( userId, operation )
        .then( ( newOperation ) => {
            
            response.success( req, res, newOperation, 'created', 201 );

        })
        .catch( ( err ) => {
    
            response.error( req, res, err, 400, 'Controller error' );

        });

});


router.put( '/update/:id', ( req, res ) => {

    const { id } = req.params;
    const userId = req.userId;
    const operation = req.body;

    controller.updateOperation( id, userId, operation)
        .then( ( updatedOperation ) => {
            
            response.success( req, res, updatedOperation, 'updated', 200 );

        })
        .catch( ( err ) => {
            
            response.error( req, res, err, 400, 'Controller error' );

        });
    
});


router.delete( '/delete/:id', ( req, res ) => {

    const { id } = req.params;
    
    controller.deleteOperation( id )
        .then( ( deletedOperation ) => {
            
            response.success( req, res, deletedOperation, 'updated', 200 );

        })
        .catch( ( err ) => {
            
            response.error( req, res, err, 400, 'Controller error' );

        });
    
});


module.exports = router;