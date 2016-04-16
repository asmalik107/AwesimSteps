'use strict';

import * as types from './actionTypes';
import HealthKit from '../services/healthKit';
import {Actions} from 'react-native-router-flux';

function authSuccess(authorized) {
    return {
        type: types.AUTHORIZE_SUCCESS,
        authorized: authorized
    }
}

function authFailed(authorized) {
    return {
        type: types.AUTHORIZE_FAILED,
        authorized: authorized
    }
}

export function authorize() {
    return  (dispatch) => {
        HealthKit.authorize((err, result) => {
            if (err || !result) {
                dispatch(authFailed(false));
                //handle and display error here
            } else {
                dispatch(authSuccess(result));
                Actions.tabbar();
            }
        })
    }
}