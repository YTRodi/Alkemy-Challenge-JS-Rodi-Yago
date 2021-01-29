const BASE_URL = process.env.REACT_APP_API_URL;

const fetchWithoutToken = ( endpoint, data, method = 'GET' ) => {

    // endpoint = '/user/all', '/user/login' etc etc
    const url = `${ BASE_URL }/${ endpoint }`;

    if ( method === 'GET' ) 
        return fetch( url );


    return fetch( url, {
        method,
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify( data )
    })

};

const fetchWithToken = ( endpoint, data, method = 'GET' ) => {

    // endpoint = '/user/all', '/user/login' etc etc
    const url = `${ BASE_URL }/${ endpoint }`;
    const token = localStorage.getItem( 'user_token' ) || '';

    if ( method === 'GET' ) 
        return fetch( url , {
            method,
            headers: {
                'user_token': token
            }
        });

    
    return fetch( url, {
        method,
        headers: {
            'Content-type': 'application/json',
            'user_token': token
        },
        body: JSON.stringify( data )
    })

};

export {
    fetchWithoutToken,
    fetchWithToken
}