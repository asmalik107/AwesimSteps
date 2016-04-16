'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';





//const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore(initialState) {
   // return createStoreWithMiddleware(rootReducer, initialState);

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );

}