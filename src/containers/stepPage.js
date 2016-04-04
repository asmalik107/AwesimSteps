'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';


class StepPage extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.today}>
                    <Text>
                        Step
                    </Text>
                </View>
                <View style={styles.weekly}>
                    <Text>
                        Step
                    </Text>
                </View>
            </View>
        );
    }

}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, today: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    weekly:{
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default StepPage;