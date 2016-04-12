'use strict';

import React, {
    Component,
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import {AnimatedCircularProgress} from 'react-native-circular-progress';

class DailySummary extends Component {
    constructor(props) {
        super(props);

        this._onPressButton = this._onPressButton.bind(this);
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPressButton}>
                    <View>
                        <AnimatedCircularProgress
                            size={40}
                            width={5}
                            fill={this.props.fill}
                            tintColor="#00e0ff"
                            backgroundColor="gray"
                            rotation={360}
                        >
                            {
                                (fill) => (

                                    <Text style={styles.fill}>
                                        {this.props.day}
                                    </Text>
      
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    _onPressButton() {
       // console.log('Click');
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 5
    },
    fill: {
        position: 'absolute',
        top: 12,
        left: 15
    }
});

module.exports = DailySummary;