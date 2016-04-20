'use strict';
import _ from 'lodash';
import {Platform} from 'react-native';
import * as types from './actionTypes';
import FitService from '../services/fitService';
import TimeUtil from '../utils/timeUtil';


function receiveWeeklySteps(steps) {

    const stepsMap = _.keyBy(steps, 'day');

    return {
        type: types.RECEIVE_WEEKLY_STEPS,
        weekly: stepsMap
    }
}


function receiveTodaysSteps(today, steps) {
    return {
        type: types.RECEIVE_TODAY_STEPS,
        today,
        steps
    }
}

export function selectDay(day) {
    return {
        type: types.SELECT_DAY,
        selected: TimeUtil.getDayNumber(day)
    }
}

export function observeSteps() {
    if (Platform.OS === 'ios') {
        return (dispatch, state) => {
            FitService.observeSteps((steps) => {
                dispatch(receiveTodaysSteps(TimeUtil.getToday(), steps));
            });
        }
    } else if (Platform.OS === 'android') {
        return (dispatch) =>{
            FitService.observeSteps((result) => {
                dispatch(receiveTodaysSteps(TimeUtil.getToday(), result.steps));
            });
        }
    }
}


export function unobserveSteps() {
    return (dispatch) => {
        FitService.usubscribeListeners();
    }
}


export function retrieveWeeklySteps() {
    if (Platform.OS === 'ios') {
        return (dispatch) => {

            var weekStart = TimeUtil.getStartOfWeek();
            var todayStart = TimeUtil.getStartOfToday();
            //var diff = TimeUtil.getDiffInDays(weekStart);

            FitService.getWeeklySteps(weekStart, todayStart, (err, results) => {

                if (err) {
                    // console.error(err)
                } else {
                    //console.log(result);
                    //this.setState({today: result});
                    if(results.length > 0) {
                        dispatch(receiveWeeklySteps(results));
                    }
                }
            });
        }
    } else if (Platform.OS === 'android') {
        return (dispatch) => {
            FitService.observeHistory((results) => {
                //var steps = results.map((result)=> {return result.steps});
                if(results.length > 0) {
                    dispatch(receiveWeeklySteps(results));
                }
            });

            var weekStart = TimeUtil.getStartOfWeek();

            FitService.getWeeklySteps(weekStart);
        }
    }
}

