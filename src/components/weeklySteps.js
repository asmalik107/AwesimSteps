'use strict';

import React, {
    Component,
    StyleSheet,
    View
} from 'react-native';


import DailySteps from './dailySteps';

class WeeklySummary extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        var dailySummary = this.props.week.map((day, index) => {
            return (
                <DailySteps
                    {...day}
                    key={day.name}
                    isSummary={false}
                    onSelectDay={this.props.onSelectDay}/>
            );
        });


        return (
            <View style={this.props.weeklyStyle}>
                {dailySummary}
            </View>
        )
    }
}


export default WeeklySummary;