'use strict';

import React, {
    Component,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {AnimatedCircularProgress} from 'react-native-circular-progress';
var Icon = require('react-native-vector-icons/Ionicons');

class DailySteps extends Component {
    constructor(props) {
        super(props);

        this._onPressButton = this._onPressButton.bind(this);
    }

    renderSummary() {
        return (
            <TouchableOpacity disabled={this.props.fill===0} onPress={this._onPressButton}>
                <View>
                    <AnimatedCircularProgress
                        size={40}
                        width={5}
                        fill={this.props.fill}
                        tintColor="#fe751f"
                        backgroundColor="#d2d2d2"
                        rotation={360}
                    >
                        {
                            (fill) => (

                                <Text style={styles.fill}>
                                    {this.props.day}
                                </Text>

                            )
                        }
                    </AnimatedCircularProgress>
                </View>
            </TouchableOpacity>
        )
    }


    renderDay() {
        return (
            <AnimatedCircularProgress
                size={270}
                width={20}
                fill={this.props.fill}
                tintColor="#fe751f"
                backgroundColor="#d2d2d2"
                rotation={360}
            >
                {
                    (fill) => (
                        <View style={styles.dayFill}>
                            <Icon name='android-walk' size={40} color='#e74c3c'/>
                            <Text style={styles.steps}>
                                { this.props.steps } Steps
                            </Text>
                        </View>
                    )
                }
            </AnimatedCircularProgress>
        )
    }

    render() {

        if (this.props.isSummary) {
            return (<View style={styles.container}>
                    {this.renderDay()}
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    {this.renderSummary()}
                </View>
            )
        }
    }

    _onPressButton() {
        this.props.onSelectDay(this.props.name);
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    fill: {
        position: 'absolute',
        top: 12,
        left: 15
    },
    dayFill: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 90,
        left: 80,
        alignItems: 'center',
        justifyContent: 'center',
    },
    steps: {
        backgroundColor: 'transparent',
        fontSize: 30,
        textAlign: 'center',
        color: '#e74c3c',
        fontWeight: '100'
    }
});

export default DailySteps;