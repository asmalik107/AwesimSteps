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

const tintColor = "#fe751f";
const backgroundColor = "#d2d2d2";
const rotation = 360;
const summaryDim = {
    size:40,
    width:5
};
const dayDim = {
    size:270,
    width: 20,
    iconSize:40
};

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
                        size={summaryDim.size}
                        width={summaryDim.width}
                        fill={this.props.fill}
                        tintColor={tintColor}
                        backgroundColor={backgroundColor}
                        rotation={rotation}
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
                size={dayDim.size}
                width={dayDim.width}
                fill={this.props.fill}
                tintColor={tintColor}
                backgroundColor={backgroundColor}
                rotation={rotation}
            >
                {
                    (fill) => (
                        <View style={styles.dayFill}>
                            <Icon name='android-walk' size={dayDim.iconSize} color='#e74c3c'/>
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