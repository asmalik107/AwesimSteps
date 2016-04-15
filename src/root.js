'use strict';

import React, {Component} from 'react-native';
import {Router} from 'react-native-router-flux';
import scenes from './routes/scenes';

import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
const store = configureStore();


export default class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router scenes={scenes}/>
            </Provider>
        )
    }
}