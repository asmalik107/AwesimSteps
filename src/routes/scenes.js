'use strict';
import React, {StyleSheet} from 'react-native';
import {Scene, Actions} from 'react-native-router-flux';

import TabIcon from '../components/tabIcon';
import Colors from '../utils/colors';


import main from '../containers/mainContainer';
import settings from '../containers/settingsContainer';
import step from '../containers/stepContainer';
import policy from '../components/policy';
import goal from '../components/goal';

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: Colors.navbar,
        borderBottomColor: 'transparent',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        elevation: 5
    },
    navbarTitle: {
        color: Colors.navbar_title
    },
    tabbar: {
        backgroundColor: Colors.tabbar,
        borderTopColor: '#e5e5e5',
        height: 60,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        },
        elevation: 5
    }
});


const scenes = Actions.create(
    <Scene key='root' hideNavBar={true}>
        <Scene key='app' title='App' component={main} initial={true}/>
        <Scene key='tabbar' tabs={true} default='stepTab' initial={false}
               tabBarStyle={styles.tabbar} type='replace'>
            <Scene key='stepTab' title='Steps' icon={TabIcon} iconName='stats-bars'
                   navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle}>
                <Scene key='Steps' title='Pedometer' component={step}/>
            </Scene>
            <Scene key='settingsTab' title='Settings' icon={TabIcon}
                   navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} iconName='ios-gear-outline'>
                <Scene key='settings' title='Settings' component={settings}/>
                <Scene key='goal' title='Daily Goal' component={goal}/>
                <Scene key='terms' title='Terms And Conditions' component={policy}/>
                <Scene key='privacy' title='Privacy Policy' component={policy}/>
            </Scene>
        </Scene>
    </Scene>
);


export default scenes;