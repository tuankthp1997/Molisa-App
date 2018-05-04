import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    Dimensions,
    ToastAndroid,
    ScrollView
} from 'react-native';

import WorkGroupScreen from 'MolisaApp/Components/HomeScreen/WorkGroupScreen';
import RenderJob from 'MolisaApp/Components/HomeScreen/RenderJob';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import { db } from 'MolisaApp/App';
import WorkGroup from '../HomeScreen/WorkGroup';

export default class JobScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedText: '',
            searchedJob: [],
            n: 0,
            onAZ: 0, offAZ: 0, onIC: 0, offIC: 0, onCT: 0, offCT: 0, onPR: 0, offPR: 0,
            Screen: 2,
        }
    }

    componentWillMount() {
        const { params } = this.props.navigation.state;
        this.setState({ onAZ: params ? params.onAZs : null, onIC: params ? params.onICs : null, onCT: params ? params.onCTs : null, onPR: params ? params.onPRs : null })
        if (this.state.onAZ == 10) this.searchJobByName();
        if (this.state.onIC == 10) this.searchJobByIncome();
        if (this.state.onCT == 10) this.searchJobByCost();
        if (this.state.onPR == 10) this.searchJobByProspects1();
    }

    onChangeTxt = (text) => {
        this.props._onChangeText(text);
    }

    ranksUpDown = (x) => {
        if (x == 1) {
            this.setState({ onIC: 0, offIC: 0, onCT: 0, offCT: 0, onPR: 0, offPR: 0 });
            if (this.state.onAZ == 0) {
                this.setState({ onAZ: 10, offAZ: 0 })   // On la sap xep ten tu A-Z
                this.searchJobByName();
            } else
                if (this.state.onAZ == 10) {
                    this.setState({ onAZ: 0, offAZ: 10 })
                    this.searchJobByName1();
                }
        }
        else if (x == 2) {
            super.setState({ onAZ: 0, offAZ: 0, onCT: 0, offCT: 0, onPR: 0, offPR: 0 });
            if (this.state.onIC == 0) {
                super.setState({ onIC: 10, offIC: 0 })
                this.searchJobByIncome();
            } else
                if (this.state.onIC == 10) {
                    super.setState({ onIC: 0, offIC: 10 })
                    this.searchJobByIncome1();
                }
        }
        else if (x == 3) {
            super.setState({ onAZ: 0, offAZ: 0, onIC: 0, offIC: 0, onPR: 0, offPR: 0 });
            if (this.state.onCT == 0) {
                super.setState({ onCT: 10, offCT: 0 })
                this.searchJobByCost();
            } else
                if (this.state.onCT == 10) {
                    super.setState({ onCT: 0, offCT: 10 })
                    this.searchJobByCost1();
                }
        }
        else if (x == 4) {
            super.setState({ onAZ: 0, offAZ: 0, onIC: 0, offIC: 0, onCT: 0, offCT: 0 });
            if (this.state.onPR == 0) {
                super.setState({ onPR: 10, offPR: 0 })
                this.searchJobByProspects1();
            } else
                if (this.state.onPR == 10) {
                    super.setState({ onPR: 0, offPR: 10 })
                    this.searchJobByProspects();
                }
        }
        else if (x == 0) {
            super.setState({ onAZ: 0, offAZ: 0, onIC: 0, offIC: 0, onCT: 0, offCT: 0, onPR: 0, offPR: 0 });
        }
    }

    // Bat dau Sap xep theo chieu tu be den lon
    searchJobByName = () => {
        var arrs = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Name limit 0, 10', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    arrs.push(row);
                }
            });
        });
        this.setState({ searchedJob: arrs, n: 10 });
    }

    searchJobByIncome = () => {
        var arrs = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Income limit 0, 10', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    arrs.push(row);
                }
            });
        });
        this.setState({ searchedJob: arrs, n: 10 });
    }

    searchJobByCost = () => {
        var arrs = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Cost limit 0, 10', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    arrs.push(row);
                }
            });
        });
        this.setState({ searchedJob: arrs, n: 10 });
    }

    searchJobByProspects = () => {
        var arrs = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Prospects limit 0, 10', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    arrs.push(row);
                }
            });
        });
        this.setState({ searchedJob: arrs, n: 10 });
    }
    // Ket thuc sap xep tu be den lon

    // Bat dau Sap xep theo chieu tu lon den be
    searchJobByName1 = () => {
        var arrs = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Name DESC limit 0, 10', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    arrs.push(row);
                }
            });
        });
        this.setState({ searchedJob: arrs, n: 10 });
    }

    searchJobByIncome1 = () => {
        var arrs = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Income DESC limit 0, 10', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    arrs.push(row);
                }
            });
        });
        this.setState({ searchedJob: arrs, n: 10 });
    }

    searchJobByCost1 = () => {
        var arrs = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Cost DESC limit 0, 10', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    arrs.push(row);
                }
            });
        });
        this.setState({ searchedJob: arrs, n: 10 });
    }

    searchJobByProspects1 = () => {
        var arrs = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Prospects DESC limit 0, 10', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    arrs.push(row);
                }
            });
        });
        this.setState({ searchedJob: arrs, n: 10 });
    }
    // Ket thuc Sap xep theo chieu tu lon den be


    // bat dau load them danh sach
    loadMoreJob = () => {
        if (this.state.onAZ == 10) {
            var searchedJob = this.state.searchedJob.slice();
            db.transaction((tx) => {
                tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Name limit ?, 10', [this.state.n], (tx, results) => {
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

        if (this.state.onIC == 10) {
            var searchedJob = this.state.searchedJob.slice();
            db.transaction((tx) => {
                tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Income limit ?, 10', [this.state.n], (tx, results) => {
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

        if (this.state.onCT == 10) {
            var searchedJob = this.state.searchedJob.slice();
            db.transaction((tx) => {
                tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Cost limit ?, 10', [this.state.n], (tx, results) => {
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

        if (this.state.offPR == 10) {
            var searchedJob = this.state.searchedJob.slice();
            db.transaction((tx) => {
                tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Prospects limit ?, 10', [this.state.n], (tx, results) => {
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



        if (this.state.offAZ == 10) {
            var searchedJob = this.state.searchedJob.slice();
            db.transaction((tx) => {
                tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Name DESC limit ?, 10', [this.state.n], (tx, results) => {
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


        if (this.state.offIC == 10) {
            var searchedJob = this.state.searchedJob.slice();
            db.transaction((tx) => {
                tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Income DESC limit ?, 10', [this.state.n], (tx, results) => {
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

        if (this.state.offCT == 10) {
            var searchedJob = this.state.searchedJob.slice();
            db.transaction((tx) => {
                tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Cost DESC limit ?, 10', [this.state.n], (tx, results) => {
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

        if (this.state.onPR == 10) {
            var searchedJob = this.state.searchedJob.slice();
            db.transaction((tx) => {
                tx.executeSql('SELECT JobID, Name, Income, Cost, Prospects FROM Tbl_Job WHERE status = 1 ORDER BY Prospects DESC limit ?, 10', [this.state.n], (tx, results) => {
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

    }
    // Ket thuc load them danh sach





    _onPressItem = (jb) => {
        WorkGroup.setNdx(jb.JobID);
        this.props.navigation.navigate('Screen3', {
            Income: jb.Income,
            Cost: jb.Cost,
            Prospects: jb.Prospects,
        });
        //this.props.onPressItem(jb);
    }

    render() {
        var { width } = Dimensions.get('window');
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <TouchableOpacity onPress={() => { WorkGroup.setNdx(-1), WorkGroup.setTdx(-1), this.props.navigation.navigate('Screen1') }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                        <View style={{}}>
                            <Image source={require('MolisaApp/Image/Logo.png')}
                                style={[{ width: 65, height: 65 }]} />
                        </View>
                        <View style={{ marginTop: 10, }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 12, color: '#a01313' }}>BỘ LAO ĐỘNG - THƯƠNG BINH VÀ XÃ HỘI</Text>
                            <Text style={{ fontWeight: 'bold', color: 'rgb(0, 161, 199)', }}>TỔNG CỤC GIÁO DỤC NGHỀ NGHIỆP</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 8, color: '#151515' }}>DIRECTORATE OF VOCATIONAL EDUCATION AND TRAINING</Text>
                        </View>
                    </View>
                    <View style={{}}>
                        <Text style={{ fontSize: 16, color: '#1299bb', fontWeight: 'bold', alignSelf: 'center' }}>CHỌN NGHỀ CHỌN TRƯỜNG{'\n'}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(null) }} style={{ backgroundColor: 'rgb(0, 161, 199)', width: width }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'white', alignSelf: 'center', marginTop: 6, marginBottom: 6, marginLeft: 15 }}>←   Quay lại</Text>
                </TouchableOpacity>
                <View>
                    <Text style={{ color: 'rgb(0, 158, 193)', marginLeft: 20, fontWeight: 'bold', marginTop: 3 }}>CHỌN NGHỀ</Text>

                    <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row' }}>
                        <TouchableOpacity
                            onPress={() => { this.ranksUpDown(1) }}
                            style={{ flexDirection: 'row' }}>
                            <Text>A-Z</Text>
                            <View style={{ marginTop: 5 }}>
                                <Image
                                    source={require('MolisaApp/Image/rankUp.png')}
                                    style={{ width: 10, height: this.state.offAZ, marginLeft: 4 }} />
                                <Image
                                    source={require('MolisaApp/Image/rankDown.png')}
                                    style={{ width: 10, height: this.state.onAZ, marginLeft: 4 }} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { this.ranksUpDown(2) }}
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
                            onPress={() => { this.ranksUpDown(3) }}
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
                            onPress={() => { this.ranksUpDown(4) }}
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
                </View>
                <View style={{ marginTop: 5, borderBottomWidth: 0.6 }}></View>
                <FlatList
                    data={this.state.searchedJob}
                    style={{ marginBottom: 2, marginTop: 10 }}
                    renderItem={({ item, index }) => {
                        return (
                            <RenderJob item={item} index={index} onPressItem={this._onPressItem}>
                            </RenderJob>
                        );
                    }}
                    onEndReached={() => { this.loadMoreJob() }}
                    onEndReachedThreshold={0.1}
                />
            </View>
        );
    }
}