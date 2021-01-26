const express = require( 'express' );
const response = require( '../../network/response' );
const controller = require( './userController' );
const router = express.Router();

router.get( '/all', ( req, res ) => {

    controller.getAllUsers()
        .then( ( list ) => {

            response.success( req, res, list, 'List of users' );

        })
        .catch( ( err ) => {

            response.error( req, res, err, 500, 'Internal error' );

        });

});

router.get( '/:id', ( req, res ) => {

    const { id } = req.params;

    controller.getUserById( id )
        .then( ( data ) => {

            response.success( req, res, data, 'Get operation by id' );

        })
        .catch( ( err ) => {

            response.error( req, res, err, 400, 'Controller error');

        });

});

router.post( '/add', ( req, res ) => {

    controller.addUser( req.body )
        .then( ( newUser ) => {
            
            response.success( req, res, newUser, 'created', 201 );

        })
        .catch( ( err ) => {
            console.log(err)
            response.error( req, res, err, 400, 'Controller error' );

        });

});

router.put( '/update/:id', ( req, res ) => {

    const { id } = req.params;
    console.log(req.body);

    controller.updateUser( id, req.body)
        .then( ( updatedUser ) => {
            
            response.success( req, res, updatedUser, 'updated', 200 );

        })
        .catch( ( err ) => {
            
            response.error( req, res, err, 400, 'Controller error' );

        });
    
});

router.delete( '/delete/:id', ( req, res ) => {

    const { id } = req.params;
    
    controller.deleteUser( id )
        .then( ( deletedUser ) => {
            
            response.success( req, res, deletedUser, 'updated', 200 );

        })
        .catch( ( err ) => {
            
            response.error( req, res, err, 400, 'Controller error' );

        });
    
});

module.exports = router;