const moment = require( 'moment' );
const jwt = require( 'jwt-simple' );
const response = require( '../network/response' );

const createToken = ( user ) => {

    const payload = {
        userId: user.id,
        createdAt: moment().unix()
    }

    return jwt.encode( payload, process.env.SECRET_PASS );

};

// middleware
const checkToken = ( req, res, next ) => {

    if ( !req.headers[ 'user_token' ] ) {
        return response.error( req, res, 'The token is required in the header.', 500, 'No Token' );
    }

    const userToken = req.headers[ 'user_token' ];
    let payload = {};

    try {
        
        payload = jwt.decode( userToken, process.env.SECRET_PASS );

        // El objeto 'req' vamos a ir delegandolo en todos los enrutadores, acorde a la regla de negocio de la app.
        // Es decir, guardo el id del usuario logeado así puedo tomar una referencia a sus operaciones de una manera más sencilla.
        req.userId = payload.userId;

        next();

    } catch (error) {
        
        return response.error( req, res, 'Wrong token', 401, 'Unauthorized' );

    }

};

module.exports = {
    createToken,
    checkToken
}