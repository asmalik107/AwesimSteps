'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';


class SettingsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Settings
                </Text>
            </View>
        );
    }

}


var styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
});


export default SettingsPage;