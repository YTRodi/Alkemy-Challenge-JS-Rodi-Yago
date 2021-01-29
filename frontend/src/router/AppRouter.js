import React from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { OperationsScreen } from '../components/operations/OperationsScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={ LoginScreen } />
                    <Route exact path="/" component={ OperationsScreen } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
