import {NativeModules} from 'react-native';
const RNHealthKit = NativeModules.RNHealthKit;
import moment from 'moment';

class HealthKit {
    constructor() {

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

}


export default new HealthKit();
