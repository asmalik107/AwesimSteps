'use strict';
import React, {StyleSheet} from 'react-native';
import {Scene, Actions} from 'react-native-router-flux';

import TabIcon from '../components/tabIcon';


import main from '../containers/mainPage';
import settings from '../containers/settingsPage';
import step from '../containers/stepPage';


const styles = StyleSheet.create({
    navbar:{
        backgroundColor: '#3d5875'
    },
    navbarTitle : {
        color:'#dfe0e6'
    },
    tabbar:{
        backgroundColor: '#3d5875',
        height :60
    }
});




const scenes = Actions.create(
    <Scene key='root' hideNavBar={true} >
        <Scene key='app' title='App' component={main} initial={true} />
        <Scene key='tabbar' tabs={true} default='stepTab' initial={false}
               tabBarStyle={styles.tabbar} type='replace'>
            <Scene key='stepTab' title='Steps' icon={TabIcon} iconName='stats-bars'
                   navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} >
                <Scene key='Steps' title='Steps' component={step} />
            </Scene>
            <Scene key='settings' title='Settings' icon={TabIcon} component={settings}
                   navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} iconName='ios-gear-outline'>
            </Scene>
        </Scene>
    </Scene>
);




export default scenes;