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
        return (
            <View style={this.props.weeklyStyle}>
                <DailySummary day="S" fill={100}/>
                <DailySummary day="M" fill={60}/>
                <DailySummary day="T" fill={10}/>
                <DailySummary day="W" fill={0}/>
                <DailySummary day="T" fill={0}/>
                <DailySummary day="F" fill={0}/>
                <DailySummary day="S" fill={120}/>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {

    }
});

module.exports = WeeklySummary;