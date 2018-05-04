import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Image,
    ScrollView,
    ToastAndroid,
    Picker,
    WebView
} from 'react-native';
var key = '';
export default class Webview extends Component {
    render() {
        const { params } = this.props.navigation.state;
        key = params ? params.url : null;
        return (
            <View style = {{flex: 1}}>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.goBack(null) 
                    }}>
                    <Text>← Quay Lại</Text>
                </TouchableOpacity>
                <WebView
                    source={{ uri: key }}
                />
        </View>
        );
    }
}