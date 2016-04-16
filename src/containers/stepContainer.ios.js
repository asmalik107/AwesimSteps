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

import WeeklySummary from '../components/weeklySummary';
import {observeSteps, unobserveSteps, retrieveWeeklySteps} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';


class StepContainer extends Component {
    constructor(props) {
        super(props);

        this._onPressButton = this._onPressButton.bind(this);
    }


    _onPressButton() {

    }

    componentDidMount() {
        this.props.onWeeklySteps();
        this.props.onObserveSteps();
    }

    componentWillUnmount() {
        this.props.onUnobserveSteps();
    }


    getFill() {
        //console.log(this.state.today / this.state.goal * 100)
        return this.state.current / this.state.goal * 100;

    }

    render() {
        return (
            <View style={styles.container}>
                <WeeklySummary week={this.props.weekly} weeklyStyle={styles.weekly}/>
                <View style={styles.today}>
                    <Text> Today </Text>
                    <AnimatedCircularProgress
                        size={270}
                        width={20}
                        fill={this.props.weekly[this.props.selected].fill}
                        tintColor="#fe751f"
                        backgroundColor="#d2d2d2"
                        rotation={360}
                    >
                        {
                            (fill) => (
                                <View style={styles.fill}>
                                    <Icon name='android-walk' size={40} color='#e74c3c'/>
                                    <Text style={styles.points}>
                                        { this.props.weekly[this.props.selected].steps } Steps
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

function mapStateToProps(state)  {
    return {
        goal:state.weeklySteps.goal,
        selected: state.weeklySteps.selected,
        weekly: state.weeklySteps.days
        //...state
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onWeeklySteps: retrieveWeeklySteps,
        onObserveSteps: observeSteps,
        onUnobserveSteps: unobserveSteps
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StepContainer);
