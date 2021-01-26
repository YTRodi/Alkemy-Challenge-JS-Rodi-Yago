const operationNetwork = require( '../components/operation/operationNetwork' );
const userNetwork = require( '../components/user/userNetwork' );

// Jwt
const { checkToken } = require( '../auth/jwt' );

const routes = ( server ) => {

    server.get( '/', ( req, res ) => res.send( 'Home' ) );
    server.use( '/user', userNetwork );
    server.use( '/operation', checkToken, operationNetwork );

};

module.exports = routes;