'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';


import {AnimatedCircularProgress} from 'react-native-circular-progress';
import moment from 'moment';
import {NativeModules} from 'react-native';
const RNHealthKit = NativeModules.RNHealthKit;

var weekStart = moment().startOf('week');
var todayStart = moment().startOf('day');
var isSameDay = moment().isSame(todayStart, 'day');
var diff = moment().diff(weekStart, 'days');


console.log(RNHealthKit, weekStart, todayStart, isSameDay, diff);


function cb(err, result) {

    if (err) {
        console.error(err)
    } else {
        console.log(result);
    }
}

RNHealthKit.authorize(cb);


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
    }

    componentDidMount() {

        RNHealthKit.getSteps(todayStart.toDate().getTime(), moment().toDate().getTime(), (err, result) => {

            if (err) {
                console.error(err)
            } else {
                console.log(result);
                this.setState({today: result});
            }
        });


    }


    getFill() {
        return this.state.today / this.state.goal * 100;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.today}>
                    <AnimatedCircularProgress
                        size={200}
                        width={10}
                        fill={this.getFill()}
                        tintColor="#00e0ff"
                        backgroundColor="#3d5875"
                        rotation={360}
                    >
                        {
                            (fill) => (
                                <Text style={styles.points}>
                                    { this.state.today } Steps
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>

                </View>
                <View style={styles.weekly}>
                    <View style={styles.day}>
                        <Text>
                            M
                        </Text>
                        <TouchableOpacity onPress={this._onPressButton}>
                            <View>
                                <AnimatedCircularProgress
                                    size={30}
                                    width={5}
                                    fill={90}
                                    tintColor="#00e0ff"
                                    backgroundColor="#3d5875"
                                    rotation={360}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.day}>
                        <Text>
                            T
                        </Text>
                        <AnimatedCircularProgress
                            size={30}
                            width={5}
                            fill={90}
                            tintColor="#00e0ff"
                            backgroundColor="#3d5875"
                            rotation={360}
                        />
                    </View>

                </View>
            </View>
        );
    }

}


var styles = StyleSheet.create({
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
    points: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 70,
        left: 60,
        width: 90,
        fontSize: 30,
        textAlign: 'center',
        color: '#7591af',
        fontWeight: "100"
    },
    day: {
        flex: 1
    },
    dayPoints: {}
});

export default StepPage;