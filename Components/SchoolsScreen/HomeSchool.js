import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Infomation from './Infomation';
import Educate from './Educate';
import Contact from './Contact';
import Registration from './Registration';
import { TabNavigator } from 'react-navigation';

var HomeSchool = TabNavigator({
  Tab1: { screen: Infomation },
  Tab2: { screen: Educate },
  Tab3: { screen: Registration },
  Tab4: { screen: Contact },
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      style: {
        height: 53,
        backgroundColor: 'rgb(0, 161, 199)',
      },

      labelStyle: {
        fontSize: 7.5,
        marginTop: 0,
        // padding: 0
      }
    }
  }
);

export default HomeSchool;


