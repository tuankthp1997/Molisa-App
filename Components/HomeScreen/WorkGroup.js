import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';

import WorkGroupScreen from 'MolisaApp/Components/HomeScreen/WorkGroupScreen';
import JobScreen from 'MolisaApp/Components/HomeScreen/JobScreen';

var TruongDangXem  = -1;
var NganhDangXem = -1;
import {db} from 'MolisaApp/App';
export default class WorkGroup extends Component {
    static navigationOptions = {
        title: 'Chọn nghề',
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('MolisaApp/Image/chonNghe.png')}
                style={{ height: 20, width: 25 }}
            />
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static getTdx() {
        return TruongDangXem;
    }
    static setTdx(x) {
        TruongDangXem = x;
    }
    static getNdx() {
        return NganhDangXem;
    }
    static setNdx(x) {
        NganhDangXem = x;
    }
    _onPressItem = (jb) => {
        // updater functions are preferred for transactional updates
        NganhDangXem = jb.JobID;   // ID cua nganh dang xem.. SchoolID la do luoi ko edit lai
        this.props.navigation.navigate('Screen3', {
            Income: jb.Income,
            Cost: jb.Cost,
            Prospects: jb.Prospects,
        });
    };

    _onChangeText = (text) => {
        this.props.navigation.push('Screen6', { text });
    }

    _onPress = (onOff) => {
        this.props.navigation.navigate('Screen7', {
            onAZs: onOff.onAZ,
            onICs: onOff.onIC,
            onCTs: onOff.onCT,
            onPRs: onOff.onPR,
        });
    }
    _onInfor = () => {
        this.props.navigation.navigate('Introduce');
    }



    render() {
        return (
            <WorkGroupScreen onInfor = {this._onInfor} onPressItem={this._onPressItem} onChangeText={this._onChangeText} onPress={this._onPress}/>
        );
    }
}