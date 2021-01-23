const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const router = require( './src/network/routes' );
require('dotenv').config( { path: __dirname + '\\.env' } );

const app = express();
const response = require( './src/network/response' );


// Content-type
app.use( bodyParser.json() );


// Routes
router( app ); // Main Routes
app.use( (req, res) =>  response.error( req, res, '404 Not Found', 404, 'Invalid route' ) ); // 404 Route


// Port listening
app.listen( process.env.PORT, () => {
    console.log( `Listening http://localhost:${ process.env.PORT }` );
});