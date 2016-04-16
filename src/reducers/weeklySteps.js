'use strict';

import * as types from '../actions/actionTypes';

const initialWeeklySteps = {
    today: 3,
    days: [
        {day: 'S', date: null, steps: 0, fill:0},
        {day: 'M', date: null, steps: 0, fill:0},
        {day: 'T', date: null, steps: 0, fill:0},
        {day: 'W', date: null, steps: 0, fill:0},
        {day: 'T', date: null, steps: 0, fill:0},
        {day: 'F', date: null, steps: 0, fill:0},
        {day: 'S', date: null, steps: 0, fill:0}
    ]
};

export default function weeklySteps(state=initialWeeklySteps, action) {
    switch(action.type) {
        case types.RECEIVE_WEEKLY_STEPS:
            return Object.assign({}, state, action.weeklySteps);
        default:
            return state;
    }
}