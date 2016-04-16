'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authorize} from '../actions';

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onAuthorize();
      // Actions.tabbar();
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

function mapStateToProps(state)  {
    return {
        ...state
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        onAuthorize: authorize
    }, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
