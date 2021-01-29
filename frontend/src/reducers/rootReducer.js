import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { operationReducer } from "./operationReducer";

export const rootReducer = combineReducers( {
    auth: authReducer,
    operation: operationReducer
});