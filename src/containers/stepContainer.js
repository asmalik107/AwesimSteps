'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import WeeklySteps from '../components/weeklySteps';
import DailySteps from '../components/dailySteps';
import {observeSteps, unobserveSteps, retrieveWeeklySteps, selectDay} from '../actions';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Colors from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';


class StepContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onWeeklySteps();
        this.props.onObserveSteps();
    }

    componentWillUnmount() {
        this.props.onUnobserveSteps();
    }

    render() {
        return (
            <View style={styles.container}>
                <LinearGradient colors={['#237A82', '#366185', '#5D467A']}
                                start={[0.0, 0.5]} end={[1.0, 0.5]} locations={[0.0, 1.0]}
                                style={styles.gradient}>
                    <WeeklySteps
                        week={this.props.weekly}
                        onSelectDay={this.props.onSelectDay}
                        weeklyStyle={styles.weekly}
                    />
                    <View style={styles.day}>
                        <View style={styles.label}>
                            <Text style={styles.labelText}> {this.props.weekly[this.props.selected].date || 'Today'}  </Text>
                        </View>
                        <DailySteps {...this.props.weekly[this.props.selected]} isSummary={true}/>
                    </View>
                </LinearGradient>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    day: {
        flex: .80,
        alignItems: 'center'
    },
    weekly: {
        flex: .20,
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginBottom: 30

    },
    gradient: {
        flex: 1
    },
    label: {
        marginBottom: 30,
        borderRadius: 20,
        borderWidth: 4,
        borderColor: '#375A7F',
        paddingHorizontal: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    labelText: {
        color: '#ffffff',//Colors.text_color,
        fontSize: 15,
        fontWeight: 'bold'

    }
});

function mapStateToProps(state) {
    return {
        goal: state.weeklySteps.goal,
        selected: state.weeklySteps.selected,
        weekly: state.weeklySteps.days
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onWeeklySteps: retrieveWeeklySteps,
        onObserveSteps: observeSteps,
        onUnobserveSteps: unobserveSteps,
        onSelectDay: selectDay
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StepContainer);
