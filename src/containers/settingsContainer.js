'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Settings from '../components/settingsList';
import Models from '../utils/settings';

class SettingsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Settings settings={Models.Settings}/>
        );
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default SettingsPage;