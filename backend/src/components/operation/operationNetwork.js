const express = require( 'express' );
const response = require( '../../network/response' );
const router = express.Router();

router.get( '/', ( req, res ) => {
    response.success( req, res, 'List of operations' );

    // response.error( req, res, 'Unexpected error', 500, 'Internal error (generic error)' );

});

router.get( '/:id', ( req, res ) => {
    // console.log(typeof parseInt( req.params.id ) )
    console.log( `The id passed by parameter is: ${ req.params.id }` );

    response.success( req, res, 'Get operation by id' );
    
});

router.post( '/add', ( req, res ) => {
    // console.log(req.body);
    response.success( req, res, 'Add operation', 201 );
    
    // response.error( req, res, 'Unexpected error', 400, 'Controller error' );

});

router.put( '/update/:id', ( req, res ) => {
    // console.log(typeof parseInt( req.params.id ) )
    response.success( req, res, 'Update operation', 200 );

    // response.error( req, res, 'Unexpected error', 500, 'Controller error' );
    
});

router.delete( '/delete/:id', ( req, res ) => {
    console.log( `The id passed by parameter is: ${ req.params.id }` );

    response.success( req, res, 'Delete operation', 200 );

    // response.error( req, res, 'Unexpected error', 500, 'Controller error' );
    
});


module.exports = router;