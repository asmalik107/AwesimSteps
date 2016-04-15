'use strict';


import * as types from './actionTypes';

function receiveToken(accessToken) {
    return {
        type: types.RECEIVE_ACCESS_TOKEN,
        accessToken
    }
}