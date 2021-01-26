const operationNetwork = require( '../components/operation/operationNetwork' );
const userNetwork = require( '../components/user/userNetwork' );

const routes = ( server ) => {

    server.get( '/', ( req, res ) => res.send( 'Home' ) );
    server.use( '/user', userNetwork );
    server.use( '/operation', operationNetwork );

};

module.exports = routes;