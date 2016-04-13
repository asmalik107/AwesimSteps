'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';


import {AnimatedCircularProgress} from 'react-native-circular-progress';
var Icon = require('react-native-vector-icons/Ionicons');

import HealthKit from '../services/healthKit'
import WeeklySummary from '../components/weeklySummary';
import TimeUtil from '../utils/timeUtil';

function cb(err, result) {

    if (err) {
       // console.error(err)
    } else {
        //console.log(result);
    }
}

HealthKit.authorize(cb);


class StepPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            today: 0,
            fill: 'stuff',
            goal: 10000,
            week: {
                today: 3,
                days: [
                    {day: 'S', date: null, steps: 0, fill:100},
                    {day: 'M', date: null, steps: 0, fill:10},
                    {day: 'T', date: null, steps: 0, fill:20},
                    {day: 'W', date: null, steps: 0, fill:30},
                    {day: 'T', date: null, steps: 0, fill:0},
                    {day: 'F', date: null, steps: 0, fill:0},
                    {day: 'S', date: null, steps: 0, fill:0}
                ]
            }
        };

        this._onPressButton = this._onPressButton.bind(this);
    }


    _onPressButton() {


/*        HealthKit.getSteps(todayStart, (err, result) => {
            if (err) {
                //console.error(err)
            } else {
                //console.log(result);
                this.setState({today: result});
            }
        });*/
        var weekStart = TimeUtil.getStartOfWeek();
        var todayStart = TimeUtil.getStartOfToday();
        var diff = TimeUtil.getDiffInDays(weekStart);

        RNHealthKit.getWeeklySteps(weekStart, todayStart, (err, result) => {

            if (err) {
               // console.error(err)
            } else {
                //console.log(result);
                //this.setState({today: result});
            }
        });
    }

    componentDidMount() {
/*
        HealthKit.getSteps(todayStart, (err, result) => {

            if (err) {
                //console.error(err)
            } else {
                //console.log(result);
                this.setState({today: result});
            }
        });*/

        HealthKit.observeSteps((result) => {
                //console.log(result);
                this.setState({today: result});

        });


    }

    componentWillUnmount() {
        HealthKit.usubscribeListeners();
    }


    getFill() {

        //console.log(this.state.today / this.state.goal * 100)
        return this.state.today / this.state.goal * 100;

    }

    render() {
        return (
            <View style={styles.container}>
                <WeeklySummary week={this.state.week} weeklyStyle={styles.weekly}/>
                <View style={styles.today}>
                    <Text> Today </Text>
                    <AnimatedCircularProgress
                        size={270}
                        width={20}
                        fill={this.getFill()}
                        tintColor="#fe751f"
                        backgroundColor="#d2d2d2"
                        rotation={360}
                    >
                        {
                            (fill) => (
                                <View style={styles.fill}>
                                    <Icon name='android-walk' size={40} color='#e74c3c'/>
                                    <Text style={styles.points}>
                                        { this.state.today } Steps
                                    </Text>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>

                </View>


            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        //top: 60,
        flex: 1,
        //alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    today: {
        flex: .80,
        alignItems: 'center'
        //justifyContent: 'flex-start'
    },
    weekly: {
        flex: .20,
        //top:30,

        //alignItems: 'flex-start',
        alignItems: 'flex-end',
        //justifyContent: 'center',
        flexDirection: 'row',
       marginBottom:30,

    },
    fill: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 90,
        left: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    points: {
        backgroundColor: 'transparent',
        fontSize: 30,
        textAlign: 'center',
        color: '#e74c3c',
        fontWeight: '100'
    },
    day: {
        flex: 1
    },
    dayPoints: {}
});

export default StepPage;