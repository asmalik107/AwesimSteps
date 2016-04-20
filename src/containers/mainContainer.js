'use strict';

import React, {
    Component,
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authorize} from '../actions';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');

class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onAuthorize();
    }

    render() {
        return (
            <LinearGradient colors={['#237A82', '#366185', '#5D467A']}
                            start={[0.0, 0.5]} end={[1.0, 0.5]} locations={[0.0, 1.0]}
                            style={styles.gradient}>
                <View style={styles.container}>
                    <Text style={styles.text}>
                        Respect, Walk
                    </Text>
                </View>
            </LinearGradient>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: width
    },
    text: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

function mapStateToProps(state) {
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
