import {NativeModules} from 'react-native';
const googleFit = NativeModules.RNGoogleFit;

import moment from 'moment';

console.log('googleFit', NativeModules, googleFit);


class GoogleFit{
    constructor() {

    }

    authorize() {
        googleFit.authorize();
    }

    getWeeklySteps(startDate, anchorDate, callback){
        //googleFit.getWeeklySteps(startDate.toDate().getTime(), moment().toDate().getTime(), anchorDate.toDate().getTime(), callback);
        googleFit.getWeeklySteps(startDate.toDate().getTime(), moment().toDate().getTime());
    }

}

export default new GoogleFit();

