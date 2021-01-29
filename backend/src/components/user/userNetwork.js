const express = require( 'express' );
const response = require( '../../network/response' );
const controller = require( './userController' );
const router = express.Router();

// check: Comprueba los diferentes datos que estoy insertando en la ruta que esto trabajando.
// validationResult: Va a validar los campos que yo ponga en el array de check's
const { check, validationResult } = require( 'express-validator' );
const { checkToken, createToken } = require('../../auth/jwt');
const { getUserByEmail } = require( './userStore' )

// LOGIN
router.post( '/login', ( req, res ) => {

    controller.loginUser( req.body )
        .then( ( jwt ) => {
            
            response.success( req, res, jwt, 'token created', 201 );

        })
        .catch( ( err ) => {
            
            response.error( req, res, err, 400, 'Controller error' );

        });

});

router.get( '/login/renew', checkToken, async( req, res ) => {
    
    try {
        
        // Recupero el username, para ponerlo en la response.success
        let user = await getUserByEmail( req.userEmail );

        const userToken = {
            userId: req.userId,
            email: req.userEmail
        }
        
        const token = createToken( userToken );
        
        const jwt = {
            id: req.userId,
            username: user.username,
            token: token
        }

        response.success( req, res, jwt, 'token created', 201  );

        
    } catch (error) {
        
        response.error( req, res, 'Internal error', '500', error );

    }
    
});


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


router.post( '/add', [

    check( 'username', 'username is required' ).not().isEmpty(),
    check( 'password', 'password is required' ).not().isEmpty(),
    check( 'email', 'email is required' ).isEmail()

], ( req, res ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        response.error( req, res, errors.array(), 422, 'Unprocessable Entity' )
    }

    controller.addUser( req.body )
        .then( ( newUser ) => {
            
            response.success( req, res, newUser, 'created', 201 );

        })
        .catch( ( err ) => {
            
            response.error( req, res, err, 400, 'Controller error' );

        });

});


router.put( '/update/:id', ( req, res ) => {

    const { id } = req.params;

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