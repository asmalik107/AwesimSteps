'use strict';

import React, {Component, View, Text, StyleSheet} from 'react-native';
var Icon = require('react-native-vector-icons/Ionicons');
import Colors from '../utils/colors';

class TabIcon extends Component {
    render() {
        let color = this.props.selected ? Colors.tabicon_selected : Colors.tabicon;
        return (
            <View style={styles.container}>
                <Icon name={this.props.iconName} size={30} color={color}/>
                <Text style={{color: color}}>{this.props.title}</Text>
            </View>
        );
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center'
    }
});

export default TabIcon;