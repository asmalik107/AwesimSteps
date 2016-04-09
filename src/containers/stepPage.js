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


var weekStart = TimeUtil.getStartOfWeek();
var todayStart = TimeUtil.getStartOfToday();
var diff = TimeUtil.getDiffInDays(weekStart);


function cb(err, result) {

    if (err) {
        console.error(err)
    } else {
        console.log(result);
    }
}

HealthKit.authorize(cb);


class StepPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            today: 0,
            fill: 'stuff',
            goal: 10000
        };

        this._onPressButton = this._onPressButton.bind(this);
    }


    _onPressButton() {
        console.log('clicked');

        HealthKit.getSteps(todayStart, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                console.log(result);
                this.setState({today: result});
            }
        });

        RNHealthKit.getWeeklySteps(weekStart, todayStart, (err, result) => {

            if (err) {
                console.error(err)
            } else {
                console.log(result);
                //this.setState({today: result});
            }
        });
    }

    componentDidMount() {

        HealthKit.getSteps(todayStart, (err, result) => {

            if (err) {
                console.error(err)
            } else {
                console.log(result);
                this.setState({today: result});
            }
        });

        HealthKit.observeSteps();


    }

    componentWillUnmount() {
        HealthKit.usubscribeListeners();
    }


    getFill() {

        console.log(this.state.today / this.state.goal * 100)
        return this.state.today / this.state.goal * 100;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.today}>
                    <Text> Today </Text>
                    <AnimatedCircularProgress
                        size={250}
                        width={10}
                        fill={this.getFill()}
                        tintColor="#00e0ff"
                        backgroundColor="#3d5875"
                        rotation={360}
                    >
                        {
                            (fill) => (
                                <View style={styles.fill}>
                                    <Icon name='android-walk' size={40} color='#7591af'/>
                                    <Text style={styles.points}>
                                        { this.state.today } Steps
                                    </Text>
                                </View>
                            )
                        }
                    </AnimatedCircularProgress>

                </View>

                <WeeklySummary weeklyStyle={styles.weekly}/>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        top: 60,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    today: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    weekly: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    fill: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 90,
        left: 70
    },
    points: {
        backgroundColor: 'transparent',
        fontSize: 30,
        textAlign: 'center',
        color: '#7591af',
        fontWeight: '100'
    },
    day: {
        flex: 1
    },
    dayPoints: {}
});

export default StepPage;