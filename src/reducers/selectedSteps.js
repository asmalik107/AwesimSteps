'use strict';

import * as types from '../actions/actionTypes';

export default function selectedSteps(state={steps:0, fill:0}, action) {
    switch(action.type) {
        case types.RECEIVE_SELECTED_STEPS:
            return Object.assign({}, state, action.accessToken);
        default:
            return state;
    }
}