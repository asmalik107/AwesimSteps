'use strict';
import React, {StyleSheet} from 'react-native';
import {Scene, Actions} from 'react-native-router-flux';

import TabIcon from '../components/tabIcon';


import main from '../containers/mainPage';
import settings from '../containers/settingsPage';
import step from '../containers/stepPage';
import terms from '../components/terms';
import goal from '../components/goal';

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




/*const scenes = Actions.create(
    <Scene key='root' hideNavBar={true} >
        <Scene key='app' title='App' component={main} initial={false} />
        <Scene key='tabbar' tabs={true} default='stepTab' initial={true}
               tabBarStyle={styles.tabbar} type='replace'>
            <Scene key='stepTab' title='Steps' icon={TabIcon} iconName='stats-bars'
                   navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} >
                <Scene key='goal' title='Daily Goal' component={goal} />
            </Scene>
            <Scene key='settingsTab' title='Settings' icon={TabIcon}
                   navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} iconName='ios-gear-outline'>
                <Scene key='settings' title='Settings' component={settings}/>
                <Scene key='goal' title='Daily Goal' component={goal} />
                <Scene key='terms' title='Terms And Conditions' component={terms} />
                <Scene key='privacy' title='Privacy Policy' component={terms} />
            </Scene>
        </Scene>
    </Scene>
);*/



const scenes = Actions.create(
    <Scene key='root' hideNavBar={true} >
        <Scene key='app' title='App' component={main} initial={false} />
        <Scene key='tabbar' tabs={true} default='stepTab' initial={true}
               tabBarStyle={styles.tabbar} type='replace'>
            <Scene key='stepTab' title='Steps' icon={TabIcon} iconName='stats-bars'
                   navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} >
                <Scene key='Steps' title='Steps' component={step}  hideNavBar={true}/>
            </Scene>
            <Scene key='settingsTab' title='Settings' icon={TabIcon}
                   navigationBarStyle={styles.navbar} titleStyle={styles.navbarTitle} iconName='ios-gear-outline'>
                <Scene key='settings' title='Settings' component={settings}/>
                <Scene key='goal' title='Daily Goal' component={goal} />
                <Scene key='terms' title='Terms And Conditions' component={terms} />
                <Scene key='privacy' title='Privacy Policy' component={terms} />
            </Scene>
        </Scene>
    </Scene>
);




export default scenes;