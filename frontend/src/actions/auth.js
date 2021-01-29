import Swal from "sweetalert2";
import { fetchWithoutToken } from "../helpers/fetch";
import { types } from "../types/types";

// Función encargada de empezar el proceso de autentitcación (tarea asíncrona)
export const startLogin = ( email, password ) => {

    // Por el thunk, esta función se va a volver a disparar
    // El thunk me dispone como primer argumento el dispatch.
    return async( dispatch ) =>{

        const resp = await fetchWithoutToken( 'user/login', { email, password }, 'POST' );
        const body = await resp.json();
        // console.log(body)

        if ( !resp.ok ) {

            const { error } = body;
            Swal.fire( 'Error', error.message, 'error' );

        }
        
        localStorage.setItem( 'user_token', body.token );

        dispatch( login( {
            uid: body.uid,
            username: body.username
        }) )

    }

};

// Action sincrona
const login = ( user ) => ({

    // Retorno el nuevo estado del authReducer
    type: types.authLogin,
    payload: user    

});