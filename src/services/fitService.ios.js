import {NativeModules} from 'react-native';
const RNHealthKit = NativeModules.RNHealthKit;

import { NativeAppEventEmitter } from 'react-native';

import moment from 'moment';

class HealthKit {
    constructor() {
        this.subscription = null;
    }

    authorize(callback) {
        RNHealthKit.authorize(callback);
    }

    getSteps(forDate, callback){
        RNHealthKit.getSteps(forDate.toDate().getTime(), moment().toDate().getTime(), callback);
    }

    getWeeklySteps(startDate, anchorDate, callback){
        RNHealthKit.getWeeklySteps(startDate.toDate().getTime(), moment().toDate().getTime(), anchorDate.toDate().getTime(), callback);
    }

    observeSteps(callback) {
         this.subscription = NativeAppEventEmitter.addListener(
            'StepChangedEvent',
             (steps) => callback(steps)
        );


        RNHealthKit.observeSteps();
    }


    usubscribeListeners() {
        if(this.subscription){
            this.subscription.remove();
        }

    }

}


export default new HealthKit();
