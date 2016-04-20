'use strict';

import React, {
    Component,
    ListView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import {Actions} from 'react-native-router-flux';

class SettingsList extends Component {
    constructor(props) {
        super(props);

        var dataSource = new ListView.DataSource(
            {
                rowHasChanged: (r1, r2) => r1.key !== r2.key,
                sectionHeaderHasChanged: (h1, h2) => h1 !== h2
            });
        this.state = {
            dataSource: dataSource.cloneWithRowsAndSections({
                goals: this.props.settings.goals,
                app: this.props.settings.app
            })
        };


        this.renderRow = this.renderRow.bind(this);
        this.renderSectionHeader = this.renderSectionHeader.bind(this);
        this.onPressRow = this.onPressRow.bind(this);

    }


    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderSectionHeader={this.renderSectionHeader}
                style={styles.container}
                renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
            />

        )
    }


    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight underlayColor='transparent' onPress={() => this.onPressRow(rowData, sectionID)}>
                <View style={styles.row}>
                    <Text style={styles.rowTitle}>{rowData.title} </Text>
                    <Text style={styles.rowInfo}>{rowData.info} </Text>
                    {rowData.hasNavArrow ?
                        <Text style={[styles.rightSideStyle, {fontSize:22, color: '#B1B1B1'}]}>></Text> : null}
                </View>
            </TouchableHighlight>
        );
    }


    renderSectionHeader(sectionData, sectionID) {
        return (
            <Text style={styles.section}>{sectionID.toUpperCase()}</Text>
        );
    }


    onPressRow(rowData, sectionID) {
        if(rowData.action) {
            Actions[rowData.action](rowData.params);
        }
    }
}


const styles = StyleSheet.create({
    container: {
        top: 60
    },
    section: {
        padding: 5,
        fontWeight: '500',
        fontSize: 11,
        marginTop: 15,
        marginLeft: 10
    },
    row: {
        backgroundColor: '#ffffff',
        height: 40,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    rowTitle: {
        flex: 1,
        marginLeft: 15,
        alignSelf: 'center',
        fontSize: 16,
        flexDirection: 'row'
    },
    rowInfo: {
        fontSize: 16,
        color: '#8e8e93',
        marginRight: 10,
        alignSelf: 'center'
    },
    rightSideStyle: {
        marginRight: 10,
        alignSelf: 'center'
    },
    separator: {
        height: 1
    }
});

export default SettingsList;