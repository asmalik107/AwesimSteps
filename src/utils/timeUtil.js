import moment from 'moment';


class TimeUtil {
    constructor() {
        this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }

    getStartOfWeek() {
        return moment().startOf('week');
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
        var day =  moment().format('ddd');
        return this.getDayNumber(day);

    }

    getDayNumber(day) {
        return this.days.indexOf(day);

    }

}

export default new TimeUtil();