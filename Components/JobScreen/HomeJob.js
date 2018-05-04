import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import MoTa from './MoTa';
import DaoTao from './DaoTao';
import TrienVong from './TrienVong';
import Infomation from './Infomation';
import DangKy from './DangKy';
import { TabNavigator } from 'react-navigation';

var HomeJob = TabNavigator({
  Tab1: { screen: MoTa },
  Tab2: { screen: DaoTao },
  Tab3: { screen: TrienVong },
  Tab4: { screen: Infomation },
  Tab5: { screen: DangKy}
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showIcon: true,
      style: {
        height: 53,
        backgroundColor: 'rgb(0, 161, 199)',
      },

      labelStyle: {
        fontSize: 6,
        marginTop: 0,
        // padding: 0
      }
    }
  }
);

export default HomeJob;


