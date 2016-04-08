'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';



class Goal extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Text> Goal</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

module.exports = Goal;