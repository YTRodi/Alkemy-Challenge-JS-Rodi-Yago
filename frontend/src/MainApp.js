import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRouter } from './router/AppRouter';

export const MainApp = () => {
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
