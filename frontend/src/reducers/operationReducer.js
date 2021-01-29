import { types } from "../types/types";

const initialState = {
    data: [], // array de obj con todas las operaciones, operacion by id, etc
}

export const operationReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        
        case types.operationGetAll:
            
            return {
                ...state,
                data: action.payload
            }
        
        case types.getFullUser:
            return {
                ...state,
                data: action.payload
            }
    
        default:
            return state;
    }

};