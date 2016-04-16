'use strict';

import React, {
    Component,
StyleSheet,
    View
} from 'react-native';


import DailySummary from './dailySummary';

class WeeklySummary extends Component{
    constructor(props) {
        super(props);
    }


    render() {
        var dailySummary = this.props.week.map(function(day, index) {
            return (
                <DailySummary {...day} key={index}/>
            );
        });


        return (
            <View style={this.props.weeklyStyle}>
                {dailySummary}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }
});

module.exports = WeeklySummary;