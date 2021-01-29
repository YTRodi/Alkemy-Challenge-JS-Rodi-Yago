import React, { useEffect } from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LoginScreen } from '../components/auth/LoginScreen';
import { OperationsScreen } from '../components/operations/OperationsScreen';
import { startChecking } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    // Voy a usar acá el dispatch para saber si está autenticado o no, para proteger las rutas.
    const dispatch = useDispatch();

    // Como necesito verificar algo que está en mi store uso useSelector
    const { checking, uid } = useSelector( state => state.auth );
    

    useEffect( () => {
        
        dispatch( startChecking() )
        
        // La dependecia va a ser el dispatch
    }, [dispatch]);
    
    if ( checking ) {

        // LOADING...
        return ( <h5>Espere...</h5> );
    }

    return (
        <Router>
            <div>
                <Switch>

                    
                    <PublicRoute
                        exact 
                        path="/login" 
                        component={ LoginScreen } 
                        isAuthenticated={ !!uid }
                        // Lógica:
                        // Si tengo info en uid, significa que estoy autenticado.
                        // Si fuera null, es false

                        // Como lo tengo que pasar a booleano, uso los dos signos de exclamación.
                        // Recordando...
                        /* 
                            !'hola' => false
                            !!'hola' => true

                            !null => true
                            !!null => false
                        */ 
                    />


                    <PrivateRoute
                        exact 
                        path="/" 
                        component={ OperationsScreen } 
                        isAuthenticated={ !!uid }
                    />


                    <Redirect to="/" />

                </Switch>
            </div>
        </Router>
    )
}
