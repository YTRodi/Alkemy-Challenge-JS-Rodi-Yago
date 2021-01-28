const dotenv = require('dotenv');
dotenv.config( { path: __dirname + '\\.env' } );
const cors = require( 'cors' );

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const router = require( './src/network/routes' );
const db = require( './src/database' );

const app = express();
const response = require( './src/network/response' );
const morgan = require( 'morgan' );

// Cors
app.use( cors() );

// Content-type
app.use( bodyParser.json() );


// Middleware
app.use( morgan( 'dev' ) );


// Routes
router( app ); // Main Routes
app.use( (req, res) =>  response.error( req, res, '404 Not Found', 404, 'Invalid route' ) ); // 404 Route


// Port listening
app.listen( process.env.PORT, () => {

    console.log( `Listening http://localhost:${ process.env.PORT }` );
    db.connectDB();

});