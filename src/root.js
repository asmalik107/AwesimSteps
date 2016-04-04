'use strict';

import React, {Component} from 'react-native';
import {Router} from 'react-native-router-flux';
import scenes from './routes/scenes';



export default class Root extends Component{
    render() {
        return (
            <Router scenes={scenes}/>
        )
    }
}