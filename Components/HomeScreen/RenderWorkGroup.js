import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList
} from 'react-native';

import RenderJob from 'MolisaApp/Components/HomeScreen/RenderJob';
import {db} from 'MolisaApp/App';

export default class RenderWorkGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            WorkGroupID: -1,
            searchedJobWorkGroup: [],
        }
    }

    searchJobWorkGroup = (WorkGroupID) => {
        db.transaction((tx) => {
            var arrs = [];
            db.transaction((tx) => {
                tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE  WorkGroupID = ? AND Status = 1 ORDER BY Name', [WorkGroupID], (tx, results) => {
                    for (var i = 0; i < results.rows.length; i++) {
                        var row = results.rows.item(i);
                        arrs.push(row);
                    }
                    this.setState({ searchedJobWorkGroup: arrs });
                });
            });
        })
    }
    
    _onPressItem = (jb) => {
        this.props.onPressItem(jb);
    }

    render() {
        if (this.state.WorkGroupID == this.props.item.WorkGroupID) {
            return (
                <View>
                    <TouchableOpacity
                        style={{ marginTop: 10, marginBottom: 3, borderColor: 'rbg(203, 203, 203)', marginLeft: 15, marginRight: 15 }}
                        onPress={() => { this.setState({ WorkGroupID: -1 }) }}>
                        <View style={{ backgroundColor: 'rgb(229, 229, 229)', flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingBottom: 5 }}>
                            <Image
                                source={{ uri: this.props.item.Image }}
                                style={{ height: 20, width: 20, marginTop: 0, marginLeft: 5 }} />
                            <Text style={{ fontSize: 14, color: 'rgb(13, 157, 186)', marginTop: 0, flex: 10 }}> {this.props.item.Name}</Text>
                            <Image
                                source={require('MolisaApp/Image/muiTenNgang.png')}
                                style={{ height: 13, marginTop: 0, marginRight: 5 }} />
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.searchedJobWorkGroup}
                        renderItem={({ item, index }) => {
                            return (
                                <RenderJob item={item} index={index} onPressItem={this._onPressItem}>
                                </RenderJob>
                            );
                        }}
                    />
                </View>
            );
        }
        else {
            return (
                <TouchableOpacity
                    style={{ marginTop: 10, marginBottom: 3, borderColor: 'rbg(203, 203, 203)', borderBottomWidth: 1, marginLeft: 15, marginRight: 15 }}
                    onPress={() => { this.setState({ WorkGroupID: this.props.item.WorkGroupID }), this.searchJobWorkGroup(this.props.item.WorkGroupID) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 5, paddingBottom: 5 }}>
                        <Image
                            source={{ uri: this.props.item.Image }}
                            style={{ height: 20, width: 20, marginTop: 0, marginLeft: 5 }} />

                        <Text style={{ fontSize: 14, color: 'rgb(13, 157, 186)', marginTop: 0, flex: 10 }}> {this.props.item.Name}</Text>
                        <Image
                            source={require('MolisaApp/Image/muiTenDoc.png')}
                            style={{ height: 9, marginTop: 0, marginRight: 5 }} />
                    </View>
                </TouchableOpacity>
            );
        };
    }
}