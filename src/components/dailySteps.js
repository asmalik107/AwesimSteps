'use strict';

import React, {
    Component,
    Dimensions,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {AnimatedCircularProgress} from 'react-native-circular-progress';
var Icon = require('react-native-vector-icons/Ionicons');
import Colors from '../utils/colors';

const tintColor = "#8BBF71";
const backgroundColor = "#717BA5";
const rotation = 360;

/*const {height, width} = Dimensions.get('window');

const size = Math.floor(width/1.5)
console.log(height, width, size);*/


const summaryDim = {
    size: 40,
    width: 5
};
const dayDim = {
    size: 270,
    width: 10,
    iconSize: 50
};

class DailySteps extends Component {
    constructor(props) {
        super(props);

        this._onPressButton = this._onPressButton.bind(this);
    }

    renderSummary() {
        return (
            <TouchableOpacity disabled={this.props.fill===0}  onPress={this._onPressButton}>
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
                                <View style={styles.weekFill}>
                                    <Text style={styles.day}>
                                        {this.props.day}
                                    </Text>
                                </View>
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
                            <Icon name='android-walk' size={dayDim.iconSize} color='#29b8e5'/>
                            <Text style={styles.steps}>
                                { this.props.steps } Steps
                            </Text>
                            <Text style={styles.goal}>
                                Goal: 10000
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
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    weekFill: {
        position: 'absolute',
        top: 5,
        left: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30
    },
    dayFill: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 10,
        left: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 250
    },
    day: {
        color: Colors.text_color,
        fontWeight: '800'
    },
    steps: {
        backgroundColor: 'transparent',
        fontSize: 30,
        textAlign: 'center',
        color: Colors.text_color
    },
    goal: {
        color: Colors.text_color
    }
});

export default DailySteps;