const express = require( 'express' );
const response = require( '../../network/response' );
const controller = require( './operationController' );
const router = express.Router();


router.get( '/', ( req, res ) => {

    controller.getAllOperations()
        .then( ( list ) => {

            response.success( req, res, list, 'Empty operations' );
            
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

    const { id_user, operation } = req.body;

    controller.addOperation( id_user, operation )
        .then( ( newOperation ) => {
            
            response.success( req, res, newOperation, 'created', 201 );

        })
        .catch( ( err ) => {
            
            response.error( req, res, err, 400, 'Controller error' );

        });

});

router.put( '/update/:id', ( req, res ) => {

    const { id_user, operation } = req.body;
    const { id } = req.params;

    controller.updateOperation( id, id_user, operation)
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