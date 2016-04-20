import moment from 'moment';
import range from 'moment-range';
import {Platform} from 'react-native';


class TimeUtil {
    constructor() {
        this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.getDatesOfWeek();
    }

    getStartOfWeek() {
        return moment().startOf('week');
    }

    getEndOfWeek() {
        return moment().endOf('week');
    }

    getStartOfToday() {
        return moment().startOf('day');
    }

    isSameDay(todayStart) {
        return moment().isSame(todayStart, 'day');
    }

    getDiffInDays(startDate) {
        return moment().diff(startDate, 'days');
    }


    getToday() {
        var day = moment().format('ddd');
        return this.getDayNumber(day);

    }

    getDayNumber(day) {
        return this.days.indexOf(day);

    }

    isToday(date) {
        return moment().diff(date, 'days') < 0;
    }

    format(date) {
        if (Platform.OS === 'ios') {
            return moment.unix(date).format('dddd, D MMMM YYYY');
        } else   if (Platform.OS === 'android') {
            return moment(date).format('dddd, D MMMM YYYY');
        }
    }

    getDatesOfWeek() {
        var range = moment.range(this.getStartOfWeek(), this.getEndOfWeek());

        let dates = [];


        range.by('days', (moment) => {
            dates.push({
                day: moment.format('dd'),
                name: moment.format('ddd'),
                date: moment.format('dddd, D MMMM  YYYY'),
                steps: 0,
                fill: 0
            });
        });

        return dates
    }

}

export default new TimeUtil();