const operationNetwork = require( '../components/operation/operationNetwork' );

const routes = ( server ) => {
    server.use( '/operation', operationNetwork );
};

module.exports = routes;