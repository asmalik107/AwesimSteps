import moment from 'moment';


class TimeUtil {

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

}

export default new TimeUtil();