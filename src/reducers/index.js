'use strict';

import * as types from '../actions/actionTypes';

import {combineReducers} from 'redux';
import auth from './auth';
//import goal from './goal';
import weeklySteps from './weeklySteps';
//import selectedSteps from './selectedSteps';
import settings from './settings';


const rootReducer = combineReducers({
    auth,
    //goal,
    weeklySteps,
    //selectedSteps,
    settings
});

export default rootReducer;