
'use strict';

import React, {
    AppRegistry
} from 'react-native';

import Root from './src/root.js';
//import Root from './src/containers/stepPage';

AppRegistry.registerComponent('AwesimSteps', () => Root);


/*
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import TimeUtil from './src/utils/timeUtil';
import GFit from './src/services/googleFit';


class AwesimSteps extends Component {

    constructor(){
        super();
        this.onPressRow = this.onPressRow.bind(this);
    }

    componentDidMount() {
        GFit.authorize();
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Shake or press menu button for dev menu
                </Text>
                <TouchableOpacity onPress={() => this.onPressRow()}>
                    <Text style={styles.instructions}>
                        Get History
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }


    onPressRow() {

        var weekStart = TimeUtil.getStartOfWeek();
        var todayStart = TimeUtil.getStartOfToday();
        var diff = TimeUtil.getDiffInDays(weekStart);

        GFit.getWeeklySteps(weekStart);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('AwesimSteps', () => AwesimSteps);
*/
