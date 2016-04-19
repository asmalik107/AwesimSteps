'use strict';

import {Platform} from 'react-native';
import * as types from './actionTypes';
import FitService from '../services/fitService';
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
    if (Platform.OS === 'ios') {
        return (dispatch) => {
            FitService.authorize((err, result) => {
                if (err || !result) {
                    dispatch(authFailed(false));
                    //handle and display error here
                } else {
                    dispatch(authSuccess(result));
                    Actions.tabbar();
                }
            })
        }
    } else if (Platform.OS === 'android') {
        return (dispatch) => {
            FitService.onAuthorize((result) => {
                dispatch(authSuccess(result));
                Actions.tabbar();
            });

            FitService.authorize();
        }
    }

}