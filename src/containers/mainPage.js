'use strict';

import React, {
    Component,
    Text,
    View
} from 'react-native';

import {Actions} from 'react-native-router-flux';


class main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
       //Actions.tabbar();
    }

    render() {
        return (
            <View>
                <Text>
                    App Startup
                </Text>
            </View>
        );
    }
}

export default main;