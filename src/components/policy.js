'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    WebView
} from 'react-native';


class Terms extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const src = this.props.source;

        //Can't dynamically require static resources!!!
        if(src === 'privacy') {
            var req = require('./../../resources/privacy-policy.html');
        } else if(src === 'terms') {
            req = require('./../../resources/terms-conditions.html');
        }

        return (
            <View style={styles.container}>
                <WebView
                    source={req}
                    scalesPageToFit={true}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        top:60
    }
});

module.exports = Terms;