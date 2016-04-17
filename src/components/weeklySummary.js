'use strict';

import React, {
    Component,
    StyleSheet,
    View
} from 'react-native';


import DailySummary from './dailySummary';

class WeeklySummary extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        var dailySummary = this.props.week.map((day, index) => {
            return (
                <DailySummary {...day} key={day.name} onSelectDay={this.props.onSelectDay}/>
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