import {NativeModules} from 'react-native';
const googleFit = NativeModules.RNGoogleFit;

import { DeviceEventEmitter } from 'react-native';

import moment from 'moment';



class GoogleFit{
    constructor() {
        this.subscriptions = [];
    }

    authorize() {
        googleFit.authorize();
    }

    getWeeklySteps(startDate){
        //googleFit.getWeeklySteps(startDate.toDate().getTime(), moment().toDate().getTime(), anchorDate.toDate().getTime(), callback);
        googleFit.getWeeklySteps(startDate.toDate().getTime(), moment().toDate().getTime());
    }

    observeSteps(callback) {
        this.subscriptions.push(DeviceEventEmitter.addListener(
            'StepChangedEvent',
            (steps) => callback(steps)
            //(steps) => console.log('StepChangedEvent', steps)
        ));

        googleFit.observeSteps();
    }

    observeHistory(callback) {
        this.subscriptions.push(DeviceEventEmitter.addListener(
            'StepHistoryChangedEvent',
            (steps) => callback(steps)
            //(steps) => console.log('StepChangedEvent', steps)
        ));
    }

    onAuthorize(callback) {
        this.subscriptions.push(DeviceEventEmitter.addListener(
            'AuthorizeEvent',
            (authorized) => callback(authorized)
            //(steps) => console.log('StepChangedEvent', steps)
        ));
    }


    usubscribeListeners() {
        if(!this.subscriptions.isEmpty()){
         /*   subscriptions.forEach(function(subscription){
                subscription.remove();
            });*/
            DeviceEventEmitter.removeAllListeners();
            this.subscriptions = [];
        }

    }

}

export default new GoogleFit();

