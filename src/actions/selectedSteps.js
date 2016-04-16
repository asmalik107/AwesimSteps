'use strict';

import * as types from './actionTypes';
import HealthKit from '../services/healthKit';


function receiveSelectedSteps(steps) {
    return {
        type: types.RECEIVE_SELECTED_STEPS,
        selectedSteps: steps
    }
}


export function observeSteps() {
    return (dispatch) => {
        HealthKit.observeSteps((steps) => {
            dispatch(receiveSelectedSteps(steps));
        });
    }
}


export function unobserveSteps() {
    return (dispatch) => {
        HealthKit.usubscribeListeners();
    }
}


