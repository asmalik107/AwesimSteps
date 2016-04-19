'use strict';

import * as types from '../actions/actionTypes';
import TimeUtils from '../utils/timeUtil';


const today = TimeUtils.getToday();

const initialWeeklySteps = {
    today: today,
    selected: today,
    goal: 10000,
    days: TimeUtils.getDatesOfWeek()
};


function getWeeklySteps(state, action) {
    const weekly = action.weekly;
    
    return state.days.map((day, index) => {
        const weekDay = weekly[index];

        if (!weekDay) {
            return {...day};
        }

        const steps = weekDay.steps || 0;
        const date = TimeUtils.format(day.startDate);
        return {...day, steps: steps, fill: Math.ceil(steps / state.goal * 100), date: date}
    });
}

function getDailySteps(state, action) {
    return state.days.map((day, index) => {
        if (index === action.today) {
            return {...day, steps: action.steps, fill: Math.ceil(action.steps / state.goal * 100)}
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
        case types.SELECT_DAY:
            return {
                ...state,
                selected: action.selected
            };
        default:
            return state;
    }
}