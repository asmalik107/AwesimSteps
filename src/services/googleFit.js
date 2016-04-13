import {NativeModules} from 'react-native';
const googleFit = NativeModules.RNGoogleFit;

import { DeviceEventEmitter } from 'react-native';

import moment from 'moment';

console.log('googleFit', NativeModules, googleFit);


class GoogleFit{
    constructor() {
        this.subscriptions = [];
    }

    authorize() {
        googleFit.authorize();
    }

    getWeeklySteps(startDate, anchorDate, callback){
        //googleFit.getWeeklySteps(startDate.toDate().getTime(), moment().toDate().getTime(), anchorDate.toDate().getTime(), callback);
        googleFit.getWeeklySteps(startDate.toDate().getTime(), moment().toDate().getTime());
    }

    observeSteps(callback) {
        this.subscriptions.push(DeviceEventEmitter.addListener(
            'StepSensorChangedEvent',
            (steps) => callback(steps)
            //(steps) => console.log('StepChangedEvent', steps)
        ));
    }

    usubscribeListeners() {
        if(!this.subscriptions.isEmpty()){
         /*   subscriptions.forEach(function(subscription){
                subscription.remove();
            });*/
            DeviceEventEmitter.removeAllListeners();
        }

    }

}

export default new GoogleFit();

