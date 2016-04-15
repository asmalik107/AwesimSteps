'use strict';

import * as types from '../actions/actionTypes';

import {combineReducers} from 'redux';

function auth(state = {}, action){
    switch(action.type){
        case types.RECEIVE_ACCESS_TOKEN:
            return Object.assign({}, state, action.accessToken);
        default:
            return state;
    }
}


function goal(state={}, action) {
    switch(action.type) {
        case types.RECEIVE_ACCESS_TOKEN:
            return Object.assign({}, state, action.accessToken);
        default:
            return state;
    }
}

function weeklySteps(state={}, action) {
    switch(action.type) {
        case types.RECEIVE_ACCESS_TOKEN:
            return Object.assign({}, state, action.accessToken);
        default:
            return state;
    }
}

function selectedSteps(state={}, action) {
    switch(action.type) {
        case types.RECEIVE_ACCESS_TOKEN:
            return Object.assign({}, state, action.accessToken);
        default:
            return state;
    }
}

function todaySteps(state={}, action) {
    switch(action.type) {
        case types.RECEIVE_ACCESS_TOKEN:
            return Object.assign({}, state, action.accessToken);
        default:
            return state;
    }
}


const rootReducer = combineReducers({
    auth,
    goal,
    weeklySteps,
    selectedSteps,
    todaySteps
});

export default rootReducer;