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
                <WeeklySteps
                    week={this.props.weekly}
                    onSelectDay={this.props.onSelectDay}
                    weeklyStyle={styles.weekly}
                />
                <View style={styles.today}>
                    <Text> Today </Text>
                    <DailySteps {...this.props.weekly[this.props.selected]} isSummary={true}/>
                </View>
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    today: {
        flex: .80,
        alignItems: 'center'
    },
    weekly: {
        flex: .20,
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginBottom: 30

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
