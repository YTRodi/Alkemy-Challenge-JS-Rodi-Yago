import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const getAllOperations = () => {

    return new Promise( async( resolve, reject ) => {
        
        const resp = await fetchWithToken( 'operation/all' );
        const body = await resp.json();

        if ( !resp.ok ) {
            reject( null );
        } else {
            resolve( body.body );            
        }

    });

};

export const operationGetAll = () => {

    return async( dispatch ) => {

        const resp = await fetchWithToken( 'operation/all' );
        const body = await resp.json();

        if ( !resp.ok ) {
            
            // dispatch( checkingFinish() ); // checking = false

        } else { 
            
            dispatch( { type: types.operationGetAll, payload: body.body } ) 

        }

    }

};

export const getFullUser = ( uid ) => {

    return async( dispatch ) =>{

        const resp = await fetchWithToken( `user/${ uid }` );
        const body = await resp.json();

        if ( !resp.ok ) {
            
            // dispatch( checkingFinish() ); // checking = false

        } else {
            dispatch( { type: types.getFullUser, payload: body.body } ) 

        }

    }

};
