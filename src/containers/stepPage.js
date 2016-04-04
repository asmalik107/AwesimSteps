'use strict';

import React, {
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';


import {AnimatedCircularProgress} from 'react-native-circular-progress';

class StepPage extends Component {
    constructor() {
        super();

        this.state = {
            fill: 'stuff'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.today}>
                    <AnimatedCircularProgress
                        size={200}
                        width={10}
                        fill={90}
                        tintColor="#00e0ff"
                        backgroundColor="#3d5875"
                        rotation={360}
                    >
                        {
                            (fill) => (
                                <Text style={styles.points}>
                                    { this.state.fill }
                                </Text>
                            )
                        }
                    </AnimatedCircularProgress>


                    <Text>
                        Step
                    </Text>
                </View>
                <View style={styles.weekly}>
                    <View style={styles.day}>
                        <Text>
                            M
                        </Text>
                        <AnimatedCircularProgress
                            size={30}
                            width={5}
                            fill={90}
                            tintColor="#00e0ff"
                            backgroundColor="#3d5875"
                            rotation={360}
                        />
                    </View>
                    <View style={styles.day}>
                        <Text>
                            T
                        </Text>
                        <AnimatedCircularProgress
                            size={30}
                            width={5}
                            fill={90}
                            tintColor="#00e0ff"
                            backgroundColor="#3d5875"
                            rotation={360}
                        />
                    </View>

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
    },
    today: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    weekly: {
        flex: .5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    points: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 90,
        left: 50,
        width: 90,
        fontSize: 30,
        textAlign: 'center',
        color: '#7591af',
        fontWeight: "100"
    },
    day: {
        flex:1
    },
    dayPoints: {

    }
});

export default StepPage;