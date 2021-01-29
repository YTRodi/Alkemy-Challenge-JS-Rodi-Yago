import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

// Función encargada de empezar el proceso de autentitcación (tarea asíncrona)
export const startLogin = ( email, password ) => {

    // Por el thunk, esta función se va a volver a disparar
    // El thunk me dispone como primer argumento el dispatch.
    return async( dispatch ) =>{

        const resp = await fetchWithoutToken( 'user/login', { email, password }, 'POST' );
        const body = await resp.json();

        if ( !resp.ok ) 
            Swal.fire( 'Error', body.error.message, 'error' );

        localStorage.setItem( 'user_token', body.body.token );

        dispatch( login( {
            uid: body.body.id,
            username: body.body.username
        }) )

    }

};

export const startRegister = ( username, email, password ) => {

    return async( dispatch ) => {

        const resp = await fetchWithoutToken( 'user/add', { username, email, password }, 'POST' );
        const body = await resp.json();
        
        if ( !resp.ok ) 
            Swal.fire( 'Error', body.error.message, 'error' );
        
        localStorage.setItem( 'user_token', body.body.token );

        dispatch( login( {
            uid: body.body.id,
            username: body.body.username
        }) )

    }

};

// Verificación el token para poder acceder a la app
export const startChecking = () => {

    return async( dispatch ) => {
         
        const resp = await fetchWithToken( 'user/login/renew' );
        const body = await resp.json();


        if ( !resp.ok ) {
            
            dispatch( checkingFinish() ); // checking = false

        } else {

            localStorage.setItem( 'user_token', body.body.token );

            dispatch( login( {
                uid: body.body.id.toString(), // Lo paso a string así en el AppRouter verifico si puede pasar a la siguientes rutas o no
                username: body.body.username
            }) )
        }

    }

};

const checkingFinish = () => ( { type: types.authCheckingFinish } );

// Action sincrona
const login = ( user ) => ({

    // Retorno el nuevo estado del authReducer
    type: types.authLogin,
    payload: user    

});


// === LOGOUT ===
// Proceso sincrono para destruir el token ( esto no puede hacerse en el reducer, ya que va en contra de sus requirimientos )
export const startLogout = () => {

    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );

    }
         
};

const logout = () => ({ type: types.authLogout });