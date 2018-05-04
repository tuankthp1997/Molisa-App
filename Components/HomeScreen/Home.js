import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';
import WorkGroup from '../HomeScreen/WorkGroup';
import School from '../HomeScreen/School';
import Introduce from '../HomeScreen/Introduce';
import { TabNavigator } from 'react-navigation';

var Home = TabNavigator({
    Tab1: { screen: WorkGroup },
    Tab2: { screen: School },
    Tab3: {screen: Introduce }
},
    {
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showIcon: true,
            
            //activeTintColor: 'rgb(255, 165, 30)',
            labelStyle: {
                fontSize: 10,
                marginTop: 0,
            },
            style: {
                backgroundColor: 'rgb(0, 161, 199)',
              //  color: 'white',
                height: 53,
            },
        }
    }
);

export default Home;


