const operationNetwork = require( '../components/operation/operationNetwork' );

const routes = ( server ) => {

    server.get( '/', ( req, res ) => res.send( 'Home' ) );
    server.use( '/operation', operationNetwork );

};

module.exports = routes;