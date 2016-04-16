'use strict';

import * as types from '../actions/actionTypes';

export default function auth(state = {}, action){
    switch(action.type){
        case types.AUTHORIZE_SUCCESS:
            return Object.assign({}, state, {authorized: action.authorized});
        default:
            return state;
    }
}