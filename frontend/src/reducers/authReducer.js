import { types } from "../types/types";

const initialState = {
    checking: true, // Cuando la app se carga, tengo que verificar si el usuario está autenticado (si lo esta ? lo mando a la app : lo mando al login)
    // uid: null,
    // name: null
}

export const authReducer = ( state = initialState, action ) => {
    
    switch ( action.type ) {

        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false // Ya lo autentiqué
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            return {
                checking: false
            }
    
        default:
            return state;
    }

};