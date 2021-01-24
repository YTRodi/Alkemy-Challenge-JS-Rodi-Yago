const chalk = require( 'chalk' );

exports.success = ( req, res, result, message, status ) => {

    console.log( chalk.cyan( `[response success]: '${ message }'` ) );

    res.status( status || 200 ).send({
        error: '',
        body: result
    });

};

exports.error = ( req, res, message, status, details ) => {

    console.log( chalk.red( `[response error]: ${ details }` ) );

    res.status( status || 500 ).send({
        error: message,
        body: ''
    });
    
};