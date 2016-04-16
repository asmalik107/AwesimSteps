'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Settings from '../components/settingsList';
import {connect} from 'react-redux';

class SettingsPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Settings settings={this.props.settings}/>
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

function mapStateToProps(state)  {
    return {
        ...state
    };
}

export default connect(mapStateToProps)(SettingsPage);