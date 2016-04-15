'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {Actions} from 'react-native-router-flux';


class main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       Actions.tabbar();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    App Startup
                </Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e74c3c'
    }
});

export default main;