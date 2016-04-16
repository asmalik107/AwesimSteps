'use strict';

import * as types from '../actions/actionTypes';

export default function goal(state={goal:10000}, action) {
    switch(action.type) {
        case types.RECEIVE_UPDATED_GOALS:
            return Object.assign({}, state, action.accessToken);
        default:
            return state;
    }
}