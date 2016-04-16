'use strict';

import * as types from '../actions/actionTypes';
import TimeUtils from '../utils/timeUtil';


const today = TimeUtils.getToday();

const initialWeeklySteps = {
    today: today,
    selected: today,
    goal: 10000,
    days: [
        {day: 'S', date: null, steps: 0, fill: 0},
        {day: 'M', date: null, steps: 0, fill: 0},
        {day: 'T', date: null, steps: 0, fill: 0},
        {day: 'W', date: null, steps: 0, fill: 0},
        {day: 'T', date: null, steps: 0, fill: 0},
        {day: 'F', date: null, steps: 0, fill: 0},
        {day: 'S', date: null, steps: 0, fill: 0}
    ]
};


function getWeeklySteps(state, action) {
    const weekly = action.weekly;
    return state.days.map((day, index) => {
        const steps = weekly[index] || 0;
        return {...day, steps: steps, fill: steps / state.goal * 100}
    });
}

function getDailySteps(state, action) {
    return state.days.map((day, index) => {
        if (index === action.today) {
            return {...day, steps: action.steps, fill: action.steps / state.goal * 100}
        } else {
            return {...day};
        }
    });

}


export default function weeklySteps(state = initialWeeklySteps, action) {
    switch (action.type) {
        case types.RECEIVE_WEEKLY_STEPS:
            return {...state, days: getWeeklySteps(state, action)};
        case types.RECEIVE_TODAY_STEPS:
            return {
                ...state,
                today: action.today,
                days: getDailySteps(state, action)
            };
        default:
            return state;
    }
}