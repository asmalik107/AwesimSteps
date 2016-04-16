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
                <TouchableOpacity disabled={this.props.fill===0} onPress={this._onPressButton}>
                    <View>
                        <AnimatedCircularProgress
                            size={40}
                            width={5}
                            fill={this.props.fill}
                            tintColor="#fe751f"
                            backgroundColor="#d2d2d2"
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
        //top:30,
        // flexDirection: 'column',
        alignItems: 'center'
        //alignSelf: 'center',
        //justifyContent: 'space-around'
        //margin: 5
    },
    fill: {
        position: 'absolute',
        top: 12,
        left: 15
    }
});

module.exports = DailySummary;