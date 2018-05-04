import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Image,
    ScrollView,
    ListView,
    TextInput,
    FlatList,
    Dimensions,
    ToastAndroid
} from 'react-native';

import JobScreen from 'MolisaApp/Components/HomeScreen/JobScreen';
import RenderJob from 'MolisaApp/Components/HomeScreen/RenderJob';
import RenderWorkGroup from 'MolisaApp/Components/HomeScreen/RenderWorkGroup';

// import { Button, Icon, Fab } from 'native-base';
import { Keyboard } from 'react-native';
import { db } from 'MolisaApp/App';

export default class WorkGroupScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedText: '',
            searchedWorkGroup: [],
            n: 0,
            onAZ: 0, offAZ: 0, onIC: 0, offIC: 0, onCT: 0, offCT: 0, onPR: 0, offPR: 0,
            Screen: 1,
            searchedJob: [],
        }
    }

    searchWorkGroup = () => {
        var arrs = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT WorkGroupID, Name , Image FROM Tbl_WorkGroup ORDER BY Pos', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    arrs.push(row);
                }
                this.setState({ searchedWorkGroup: arrs });
            });
           
        });
    }


    _onPressItem = (jb) => {
        this.props.onPressItem(jb);
    }

    // _onChangeText = (text) => {
    //     this.props.onChangeText(text);
    // }

    _onPress = (onOff) => {
        this.props.onPress(onOff);
    }

    _onInfor = () => {
        this.props.onInfor();
    }


    searchJob = (searchedText) => {
        var arrs = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT JobID,Name,Income,Cost,Prospects FROM Tbl_Job WHERE Name LIKE ? LIMIT 0, 10', [searchedText.trim() + "%"], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    arrs.push(row);
                }
            });
        });
        this.setState({ searchedJob: arrs, n: 10 });
    }

    loadMoreJob = (searchedText) => {
        var searchedJob = this.state.searchedJob.slice();
        db.transaction((tx) => {
            tx.executeSql('SELECT JobID,Name,Income,Cost,Prospects FROM Tbl_Job WHERE Name LIKE ? LIMIT ?, 10', [searchedText.trim() + "%", this.state.n], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    searchedJob.push(row);
                }
            });
        });
        var nplus = this.state.n + 10;
        this.setState({ searchedJob: searchedJob, n: nplus });
        // ToastAndroid.show(this.state.n.toString(), ToastAndroid.SHORT);
    }

    componentWillMount() {
        this.searchWorkGroup();
    }

    render() {
        if (this.state.searchedText == '') {
            return (
                <View style={{ flex: 1, backgroundColor: 'white'}}>
                    <ScrollView>
                        <View style={{ backgroundColor: 'white', flex:1 }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Image source={require('MolisaApp/Image/Logo.png')}
                                    style={[{ width: 65, height: 65 }]} />
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#a01313' }}>BỘ LAO ĐỘNG - THƯƠNG BINH VÀ XÃ HỘI</Text>
                                    <Text style={{ fontWeight: 'bold', color: 'rgb(0, 161, 199)', }}>TỔNG CỤC GIÁO DỤC NGHỀ NGHIỆP</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 8, color: '#151515' }}>DIRECTORATE OF VOCATIONAL EDUCATION AND TRAINING</Text>
                                </View>
                            </View>

                            <View style={{ borderBottomWidth: 7, borderColor: 'rgb(0, 158, 193)' }}>
                                <Text style={{ fontSize: 16, color: '#1299bb', fontWeight: 'bold', alignSelf: 'center' }}>CHỌN NGHỀ CHỌN TRƯỜNG{'\n'}</Text>
                            </View>

                            <View>
                                <Text style={{ color: 'rgb(0, 158, 193)', marginLeft: 20, fontWeight: 'bold', marginTop: 3 }}>CHỌN NGHỀ</Text>

                                <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => { this._onPress({ onAZ: 10, onIC: 0, onCT: 0, onPR: 0 }) }}
                                        style={{ flexDirection: 'row' }}>
                                        <Text>A-Z</Text>
                                        <View style={{ marginTop: 5 }}>
                                            <Image
                                                source={require('MolisaApp/Image/rankUp.png')}
                                                style={{ width: 10, height: this.state.onAZ, marginLeft: 4 }} />
                                            <Image
                                                source={require('MolisaApp/Image/rankDown.png')}
                                                style={{ width: 10, height: this.state.offAZ, marginLeft: 4 }} />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => { this._onPress({ onAZ: 0, onIC: 10, onCT: 0, onPR: 0 }) }}
                                        style={{ marginLeft: 20, flexDirection: 'row' }}>
                                        <Text>Thu nhập</Text>
                                        <View style={{ marginTop: 5 }}>
                                            <Image
                                                source={require('MolisaApp/Image/rankUp.png')}
                                                style={{ width: 10, height: this.state.offIC, marginLeft: 4 }} />
                                            <Image
                                                source={require('MolisaApp/Image/rankDown.png')}
                                                style={{ width: 10, height: this.state.onIC, marginLeft: 4 }} />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => { this._onPress({ onAZ: 0, onIC: 0, onCT: 10, onPR: 0 }) }}
                                        style={{ marginLeft: 20, flexDirection: 'row' }}>
                                        <Text>Học phí</Text>
                                        <View style={{ marginTop: 5 }}>
                                            <Image
                                                source={require('MolisaApp/Image/rankUp.png')}
                                                style={{ width: 10, height: this.state.offCT, marginLeft: 4 }} />
                                            <Image
                                                source={require('MolisaApp/Image/rankDown.png')}
                                                style={{ width: 10, height: this.state.onCT, marginLeft: 4 }} />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => { this._onPress({ onAZ: 0, onIC: 0, onCT: 0, onPR: 10 }) }}
                                        style={{ marginLeft: 20, flexDirection: 'row' }}>
                                        <Text>Cơ hội</Text>
                                        <View style={{ marginTop: 5 }}>
                                            <Image
                                                source={require('MolisaApp/Image/rankUp.png')}
                                                style={{ width: 10, height: this.state.offPR, marginLeft: 4 }} />
                                            <Image
                                                source={require('MolisaApp/Image/rankDown.png')}
                                                style={{ width: 10, height: this.state.onPR, marginLeft: 4 }} />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'gray', borderWidth: 1, marginRight: 20, marginLeft: 20, marginTop: 5 }}>
                                    <View style={{ flex: 1, borderColor: 'gray', borderRightWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            source={require('MolisaApp/Image/Search.png')}
                                            style={{ width: 27, height: 27, marginLeft: 4 }} />
                                    </View>
                                    <TextInput
                                        style={{ flex: 10, fontSize: 13 }}
                                        underlineColorAndroid='transparent'
                                        onChangeText={text => { this.setState({ searchedText: text }); this.searchJob(text) }}
                                        value={this.state.searchedText}
                                        placeholder="Tìm kiếm nghề nghiệp"
                                    />
                                </View>
                            </View>

                            {this.state.searchedWorkGroup.map(item => {
                                return (
                                    <RenderWorkGroup item={item} index={0} onPressItem={this._onPressItem} />
                                )
                            })}

                        </View>
                        </ScrollView>
                        {/* <Fab
                            active={this.state.active}
                            direction="up"
                            containerStyle={{}}
                            style={{ backgroundColor: 'rgb(0, 161, 199)', height: 40, width: 40 }}
                            position="bottomRight"
                            onPress={() => { this._onInfor() }}>
                            <Icon name="information" />
                        </Fab> */}
                    </View>
               
            );
        }
        else {
            var { width } = Dimensions.get('window');
            return (
                <View style={{ backgroundColor: 'white', flex:1}}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                                <Image source={require('MolisaApp/Image/Logo.png')}
                                    style={[{ width: 65, height: 65 }]} />
                                <View style={{ marginTop: 10 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#a01313' }}>BỘ LAO ĐỘNG - THƯƠNG BINH VÀ XÃ HỘI</Text>
                                    <Text style={{ fontWeight: 'bold', color: 'rgb(0, 161, 199)', }}>TỔNG CỤC GIÁO DỤC NGHỀ NGHIỆP</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 8, color: '#151515' }}>DIRECTORATE OF VOCATIONAL EDUCATION AND TRAINING</Text>
                                </View>
                            </View>

                            <View style={{ borderBottomWidth: 7, borderColor: 'rgb(0, 158, 193)' }}>
                                <Text style={{ fontSize: 16, color: '#1299bb', fontWeight: 'bold', alignSelf: 'center' }}>CHỌN NGHỀ CHỌN TRƯỜNG{'\n'}</Text>
                            </View>

                            <View>
                                <Text style={{ color: 'rgb(0, 158, 193)', marginLeft: 20, fontWeight: 'bold', marginTop: 3 }}>CHỌN NGHỀ</Text>

                                <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        onPress={() => { this._onPress({ onAZ: 10, onIC: 0, onCT: 0, onPR: 0 }) }}
                                        style={{ flexDirection: 'row' }}>
                                        <Text>A-Z</Text>
                                        <View style={{ marginTop: 5 }}>
                                            <Image
                                                source={require('MolisaApp/Image/rankUp.png')}
                                                style={{ width: 10, height: this.state.onAZ, marginLeft: 4 }} />
                                            <Image
                                                source={require('MolisaApp/Image/rankDown.png')}
                                                style={{ width: 10, height: this.state.offAZ, marginLeft: 4 }} />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => { this._onPress({ onAZ: 0, onIC: 10, onCT: 0, onPR: 0 }) }}
                                        style={{ marginLeft: 20, flexDirection: 'row' }}>
                                        <Text>Thu nhập</Text>
                                        <View style={{ marginTop: 5 }}>
                                            <Image
                                                source={require('MolisaApp/Image/rankUp.png')}
                                                style={{ width: 10, height: this.state.offIC, marginLeft: 4 }} />
                                            <Image
                                                source={require('MolisaApp/Image/rankDown.png')}
                                                style={{ width: 10, height: this.state.onIC, marginLeft: 4 }} />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => { this._onPress({ onAZ: 0, onIC: 0, onCT: 10, onPR: 0 }) }}
                                        style={{ marginLeft: 20, flexDirection: 'row' }}>
                                        <Text>Học phí</Text>
                                        <View style={{ marginTop: 5 }}>
                                            <Image
                                                source={require('MolisaApp/Image/rankUp.png')}
                                                style={{ width: 10, height: this.state.offCT, marginLeft: 4 }} />
                                            <Image
                                                source={require('MolisaApp/Image/rankDown.png')}
                                                style={{ width: 10, height: this.state.onCT, marginLeft: 4 }} />
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => { this._onPress({ onAZ: 0, onIC: 0, onCT: 0, onPR: 10 }) }}
                                        style={{ marginLeft: 20, flexDirection: 'row' }}>
                                        <Text>Cơ hội</Text>
                                        <View style={{ marginTop: 5 }}>
                                            <Image
                                                source={require('MolisaApp/Image/rankUp.png')}
                                                style={{ width: 10, height: this.state.offPR, marginLeft: 4 }} />
                                            <Image
                                                source={require('MolisaApp/Image/rankDown.png')}
                                                style={{ width: 10, height: this.state.onPR, marginLeft: 4 }} />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <View style={{ height: 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: 'gray', borderWidth: 1, marginRight: 20, marginLeft: 20, marginTop: 5 }}>
                                    <View style={{ flex: 1, borderColor: 'gray', borderRightWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            source={require('MolisaApp/Image/Search.png')}
                                            style={{ width: 27, height: 27, marginLeft: 4 }} />
                                    </View>
                                    <TextInput
                                        style={{ flex: 10, fontSize: 13 }}
                                        underlineColorAndroid='transparent'
                                        onChangeText={text => { this.setState({ searchedText: text });  this.searchJob(text)}}
                                        value={this.state.searchedText}
                                        placeholder="Tìm kiếm nghề nghiệp"
                                    />
                                </View>
                            </View>
                    <FlatList
                        style={{ marginTop: 5, marginBottom: 5 }}
                        data={this.state.searchedJob}
                        renderItem={({ item, index }) => {
                            return (
                                <RenderJob item={item} index={index} onPressItem={this._onPressItem}>
                                </RenderJob>
                            );
                        }}
                        onEndReached={() => { this.loadMoreJob(this.state.searchedText) }}
                        onEndReachedThreshold={0.1}
                    />
                </View>
            )
        }
    }
}