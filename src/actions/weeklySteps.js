'use strict';

import * as types from './actionTypes';
import HealthKit from '../services/healthKit';
import TimeUtil from '../utils/timeUtil';


function receiveWeeklySteps(steps) {
    return {
        type: types.RECEIVE_WEEKLY_STEPS,
        weekly: steps
    }
}


export function retrieveWeeklySteps() {
    return (dispatch) => {
        var weekStart = TimeUtil.getStartOfWeek();
        var todayStart = TimeUtil.getStartOfToday();
        //var diff = TimeUtil.getDiffInDays(weekStart);

        HealthKit.getWeeklySteps(weekStart, todayStart, (err, result) => {

            if (err) {
                // console.error(err)
            } else {
                //console.log(result);
                //this.setState({today: result});
                dispatch(receiveWeeklySteps(result));
            }
        });
    }
}
