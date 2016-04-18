import {NativeModules} from 'react-native';
const googleFit = NativeModules.RNGoogleFit;

import {DeviceEventEmitter} from 'react-native';

import moment from 'moment';


class GoogleFit {
    constructor() {
    }

    authorize() {
        googleFit.authorize();
    }

    getWeeklySteps(startDate) {
        //googleFit.getWeeklySteps(startDate.toDate().getTime(), moment().toDate().getTime(), anchorDate.toDate().getTime(), callback);
        googleFit.getWeeklySteps(startDate.toDate().getTime(), moment().toDate().getTime());
    }

    observeSteps(callback) {
        DeviceEventEmitter.addListener(
            'StepChangedEvent',
            (steps) => callback(steps)
            //(steps) => console.log('StepChangedEvent', steps)
        );

        googleFit.observeSteps();
    }

    observeHistory(callback) {
        DeviceEventEmitter.addListener(
            'StepHistoryChangedEvent',
            (steps) => callback(steps)
            //(steps) => console.log('StepChangedEvent', steps)
        );
    }

    onAuthorize(callback) {
        DeviceEventEmitter.addListener(
            'AuthorizeEvent',
            (authorized) => callback(authorized)
            //(steps) => console.log('StepChangedEvent', steps)
        );
    }


    usubscribeListeners() {
        DeviceEventEmitter.removeAllListeners();
    }

}

export default new GoogleFit();

