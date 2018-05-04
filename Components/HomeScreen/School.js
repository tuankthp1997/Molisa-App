import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Image,
    ScrollView,
    FlatList,
    ListView,
    TextInput
} from 'react-native';
import WorkGroup from '../HomeScreen/WorkGroup';
import { Keyboard } from 'react-native'
import {db} from 'MolisaApp/App';
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });


function convertVie(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
}

function cutStr(str) {
    var arr = []
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        if (str.charAt(i) == " ") {
            count++;
        }
    }
    for (var i = 0; i < count; i++) {
        if (str.slice(0, str.indexOf(" ")) != "") {
            arr.push(str.slice(0, str.indexOf(" ")))
        }
        str = str.slice(str.indexOf(" ") + 1)
    }
    if (str != "") {
        arr.push(str)
    }
    return arr;
}

export default class Schools extends Component {
    static navigationOptions = {
        title: 'Chọn trường',
        tabBarIcon: () => (
            <Image
                source={require('MolisaApp/Image/chonTruong.png')}
                style={{ height: 20, width: 25 }}
            />
        )
    };

    constructor(props) {
        super(props);
        this.state = {
            searchedText: '',
            NCS: [
                { ID: 1, Name: 'Miền Bắc', Type: 1 },
                { ID: 2, Name: 'Miền Trung', Type: 2 },
                { ID: 3, Name: 'Miền Nam', Type: 3 },
            ],
            CDTC: [
                { ID: 1, Name: 'Cao Đẳng', BaseType: 1 },
                { ID: 2, Name: 'Trung Cấp', BaseType: 2 },
            ],
            Province: [],
            School: [],
            check: 0,
            ncsID: -1, ncsID1: -1, pvID: -1, pvName: '', cdtcID: -1,
            onAZ: 0, offAZ: 0, onCD: 20, offCD: 0, onTC: 20, offTC: 0, onK: 20, offK: 0,
            schoolsType: -1,
        };
    }

    clickSchool = (ID) => {
        WorkGroup.setTdx(ID);
        this.props.navigation.navigate('Screen2', {
        });
    }

    ranksAZ = (arr) => {
        if (this.state.onAZ == 0 && this.state.offAZ == 10) {
            let convertArr = arr;
            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (convertArr[i].Name > convertArr[j].Name) {
                        let x = convertArr[i];
                        convertArr[i] = convertArr[j];
                        convertArr[j] = x;
                        this.setState({ arr: convertArr })
                    }
                }
            }
        }
        else if (this.state.onAZ == 10 && this.state.offAZ == 0) {
            let convertArr = arr;
            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (convertArr[i].Name < convertArr[j].Name) {
                        let x = convertArr[i];
                        convertArr[i] = convertArr[j];
                        convertArr[j] = x;
                        this.setState({ arr: convertArr })
                    }
                }
            }
        }
        else {
            let convertArr = arr;
            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (convertArr[i].Name > convertArr[j].Name) {
                        let x = convertArr[i];
                        convertArr[i] = convertArr[j];
                        convertArr[j] = x;
                        this.setState({ arr: convertArr })
                    }
                }
            }
        }
    }
    ranksUpDown = (x) => {
        if (x == 1) {
            if (this.state.onAZ == 0 && this.state.offAZ == 0) {
                super.setState({ onAZ: 10 })
            }
            else {
                if (this.state.onAZ == 0) {
                    super.setState({ onAZ: 10 })
                }
                if (this.state.onAZ == 10) {
                    super.setState({ onAZ: 0 })
                }
                if (this.state.offAZ == 0) {
                    super.setState({ offAZ: 10 })
                }
                if (this.state.offAZ == 10) {
                    super.setState({ offAZ: 0 })
                }
            }
        }
        if (x == 2) {   
            super.setState({ onAZ: 0 });
            super.setState({ offAZ: 0 });
            super.setState({ onTC: 20 });
            super.setState({ offTC: 0 });
            super.setState({ onK: 20 });
            super.setState({ offK: 0 });
            if (this.state.onCD == 0) {
                super.setState({ onCD: 20 })
                if (this.state.check == 1) {
                    this.searchSchool(this.state.searchedText, 0);
                }
                if (this.state.check == 2) {
                    super.setState({ check: 0 })
                }
            }
            if (this.state.onCD == 20) {
                super.setState({ onCD: 0 })
                if (this.state.check == 1) {
                    this.searchSchool(this.state.searchedText, 1);
                }
                if (this.state.check == 2) {
                    super.setState({ schoolsType: 1 })
                    super.setState({ School: [] });
                    super.setState({ ncsID1: -1 });
                }
                if (this.state.check == 0) {
                    super.setState({ schoolsType: 1 })
                    super.setState({ School: [] });
                    super.setState({ ncsID1: -1 });
                }

            }
            if (this.state.offCD == 0) {
                super.setState({ offCD: 20 })
            }
            if (this.state.offCD == 20) {
                super.setState({ offCD: 0 })
            }
        }
        if (x == 3) {
            super.setState({ onAZ: 0 });
            super.setState({ offAZ: 0 });
            super.setState({ onCD: 20 });
            super.setState({ offCD: 0 });
            super.setState({ onK: 20 });
            super.setState({ offK: 0 });
            if (this.state.onTC == 0) {
                super.setState({ onTC: 20 })
                if (this.state.check == 1) {
                    this.searchSchool(this.state.searchedText, 0);
                }
                if (this.state.check == 2) {
                    super.setState({ check: 0 })
                }
            }
            if (this.state.onTC == 20) {
                super.setState({ onTC: 0 })
                if (this.state.check == 1) {
                    this.searchSchool(this.state.searchedText, 2);
                }
                if (this.state.check == 2) {
                    super.setState({ schoolsType: 2 })
                    super.setState({ School: [] });
                    super.setState({ ncsID1: -1 });
                }
                if (this.state.check == 0) {
                    super.setState({ schoolsType: 2 })
                    super.setState({ School: [] });
                    super.setState({ ncsID1: -1 });
                }
            }
            if (this.state.offTC == 0) {
                super.setState({ offTC: 20 })
            }
            if (this.state.offTC == 20) {
                super.setState({ offTC: 0 })
            }
        }
        if (x == 4) {
            super.setState({ onAZ: 0 });
            super.setState({ offAZ: 0 });
            super.setState({ onCD: 20 });
            super.setState({ offCD: 0 });
            super.setState({ onTC: 20 });
            super.setState({ offTC: 0 });
            if (this.state.onK == 0) {
                super.setState({ onK: 20 })
                if (this.state.check == 1) {
                    this.searchSchool(this.state.searchedText, 0);
                }
                if (this.state.check == 2) {
                    super.setState({ check: 0 })
                }
            }
            if (this.state.onK == 20) {
                super.setState({ onK: 0 })
                if (this.state.check == 1) {
                    this.searchSchool(this.state.searchedText, 3);
                }
                if (this.state.check == 2) {
                    super.setState({ schoolsType: 3 })
                    super.setState({ School: [] });
                    super.setState({ ncsID1: -1 });
                }
                if (this.state.check == 0) {
                    super.setState({ schoolsType: 3 })
                    super.setState({ School: [] });
                    super.setState({ ncsID1: -1 });
                }
            }
            if (this.state.offK == 0) {
                super.setState({ offK: 20 })
            }
            if (this.state.offK == 20) {
                super.setState({ offK: 0 })
            }
        }
        else if (x == 0) {
            super.setState({ onAZ: 0 });
            super.setState({ offAZ: 0 });
            super.setState({ onCD: 20 });
            super.setState({ offCD: 0 });
            super.setState({ onTC: 20 });
            super.setState({ offTC: 0 });
            super.setState({ onK: 20 });
            super.setState({ offK: 0 });
        }
    }

    searchSchoolType = (schoolsType, provinType) => {
        super.setState({ School: [] })
        if (schoolsType == 3) {
            var arrs = new Array();
            db.transaction((tx) => {
                var sql = 'SELECT Tbl_School.SchoolID, Tbl_School.Name FROM Tbl_School, Tbl_Province WHERE Tbl_Province.Name = Tbl_School.Province AND Tbl_School.BaseType != 1 AND Tbl_School.BaseType != 2 AND Tbl_Province.Type ="' + provinType + '"';
                tx.executeSql(sql, [], (tx, results) => {
                    for (var i = 0; i < results.rows.length; i++) {
                        var row = results.rows.item(i);
                        var scf = { Name: row.Name, SchoolID: row.SchoolID }
                        arrs.push(scf)
                        if (i == results.rows.length - 1) {
                            super.setState({ School: arrs })
                        }
                    }
                });
            });
        }
        else {
            var arrs = new Array();
            db.transaction((tx) => {
                var sql = 'SELECT Tbl_School.SchoolID, Tbl_School.Name FROM Tbl_School, Tbl_Province WHERE Tbl_Province.Name = Tbl_School.Province AND Tbl_School.BaseType ="'+ schoolsType+'" AND Tbl_Province.Type = "' + provinType + '"';
                tx.executeSql(sql, [], (tx, results) => {
                    for (var i = 0; i < results.rows.length; i++) {
                        var row = results.rows.item(i);
                        var scf = { Name: row.Name, SchoolID: row.SchoolID }
                        arrs.push(scf)
                        if (i == results.rows.length - 1) {
                            super.setState({ School: arrs })
                        }
                    }
                });
            });
        }
    }

    searchSchool = (searchedText, type) => {
        super.setState({ School: [] })
        if (searchedText.trim().length == 0) {
            super.setState({ check: 0 });
            this.ranksUpDown(0);
            super.setState({ School: [] });
        }
        else {
            if (type == 0) {
                if (this.state.check != 1) {
                    super.setState({ check: 1 })
                }
                var arrs = new Array();
                db.transaction((tx) => {
                    tx.executeSql('SELECT SchoolID, Name FROM Tbl_School', [], (tx, results) => {
                        for (var i = 0; i < results.rows.length; i++) {
                            var row = results.rows.item(i);
                            if (convertVie(row.Name).indexOf(convertVie(searchedText)) > -1) {
                                var sc = { Name: row.Name, SchoolID: row.SchoolID }
                                arrs.push(sc)
                            }
                            if (i == results.rows.length - 1) {
                                super.setState({ School: arrs })
                            }
                        }
                    });
                });
            }
            if (type == 1) {
                var arrs = new Array();
                db.transaction((tx) => {
                    tx.executeSql('SELECT SchoolID, Name FROM Tbl_School WHERE BaseType = 1', [], (tx, results) => {
                        for (var i = 0; i < results.rows.length; i++) {
                            var row = results.rows.item(i);
                            if (convertVie(row.Name).indexOf(convertVie(searchedText)) > -1) {
                                var sc = { Name: row.Name, SchoolID: row.SchoolID }
                                arrs.push(sc)
                            }
                            if (i == results.rows.length - 1) {
                                super.setState({ School: arrs })
                            }
                        }
                    });
                });
            }
            if (type == 2) {
                var arrs = new Array();
                db.transaction((tx) => {
                    tx.executeSql('SELECT SchoolID, Name FROM Tbl_School WHERE BaseType = 2', [], (tx, results) => {
                        for (var i = 0; i < results.rows.length; i++) {
                            var row = results.rows.item(i);
                            if (convertVie(row.Name).indexOf(convertVie(searchedText)) > -1) {
                                var sc = { Name: row.Name, SchoolID: row.SchoolID }
                                arrs.push(sc)
                            }
                            if (i == results.rows.length - 1) {
                                super.setState({ School: arrs })
                            }
                        }
                    });
                });
            }
            if (type == 3) {
                var arrs = new Array();
                db.transaction((tx) => {
                    tx.executeSql('SELECT SchoolID, Name FROM Tbl_School WHERE BaseType != 1 AND BaseType != 2', [], (tx, results) => {
                        for (var i = 0; i < results.rows.length; i++) {
                            var row = results.rows.item(i);
                            if (convertVie(row.Name).indexOf(convertVie(searchedText)) > -1) {
                                var sc = { Name: row.Name, SchoolID: row.SchoolID }
                                arrs.push(sc)
                            }
                            if (i == results.rows.length - 1) {
                                super.setState({ School: arrs })
                            }
                        }
                    });
                });
            }
        }
    }

    searchSchoolProvince = (ProvinceName, BaseType) => { // Truy van Truong theo Tinh va Trung cap(1) or Cao Dang(2).
        super.setState({ School: [] })
        var arrs = new Array();
        var sql = 'SELECT Name, SchoolID FROM Tbl_School WHERE Province ="' + ProvinceName+ '" AND BaseType ="' + BaseType + '"';
        db.transaction((tx) => {
            tx.executeSql(sql, [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    
                    var spr = { Name: row.Name, SchoolID: row.SchoolID }
                    arrs.push(spr)
                    if (i == results.rows.length - 1) {
                        super.setState({ School: arrs })
                    }
                }
            });
        });
    }

    searchProvince = (Type) => {
        super.setState({ Province: [] })
        var arrs = new Array();
        db.transaction((tx) => {
            tx.executeSql('SELECT ProvinceID, Name FROM Tbl_Province WHERE Type = ?', [Type], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var prv = { ProvinceID: row.ProvinceID, Name: row.Name }
                    arrs.push(prv)
                    if (i == results.rows.length - 1) {
                        super.setState({ Province: arrs })
                    }
                }
            });
        });
    }

    renderSchool = (sc) => {
        return (
            <View>
                <TouchableOpacity
                    style={{ height: 30, marginTop: 10, marginBottom: 3, borderColor: 'rbg(203, 203, 203)', borderBottomWidth: 1, marginLeft: 50, marginRight: 20 }}
                    onPress={() => { this.clickSchool(sc.SchoolID) }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ marginLeft: 2, fontSize: 11, color: 'rgb(13, 157, 186)', flex: 10 }}>{sc.Name.toUpperCase()}</Text>
                        <Image
                            source={require('MolisaApp/Image/muiTenDoc.png')}
                            style={{ height: 9,  marginTop: 0, marginRight: 5 }} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderCDTC = (cdtc) => {   
        if (this.state.cdtcID == cdtc.ID) {   // Render ra Trung Cap, Cao Dang
            return (
                <View>
                    <TouchableOpacity
                        style={{ height: 30, marginTop: 10, borderColor: 'rbg(203, 203, 203)', marginLeft: 40, marginRight: 20 }}
                        onPress={() => { this.setState({ cdtcID: -1 }), this.setState({ School: [] }), this.ranksUpDown(0) }}>
                        <View style={{ flex: 1, backgroundColor: 'rgb(229, 229, 229)', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ marginLeft: 2, fontSize: 12, color: 'rgb(13, 157, 186)', flex: 10 }}>{cdtc.Name}</Text>
                            <Image
                                source={require('MolisaApp/Image/muiTenNgang.png')}
                                style={{ height: 13, marginTop: 0, marginRight: 5 }} />
                        </View>
                    {console.log('School')}    
                    {console.log(this.state.School)}
                   
                    </TouchableOpacity>
                    <ListView
                        dataSource={ds.cloneWithRows(this.state.School)}
                        renderRow={this.renderSchool} />
                </View>
            );
        }
        else {
            return (
                <View>
                    <TouchableOpacity
                        style={{ height: 30, marginTop: 10, borderColor: 'rbg(203, 203, 203)', borderBottomWidth: 1, marginLeft: 40, marginRight: 20 }}
                        onPress={() => { this.setState({ cdtcID: cdtc.ID }), this.searchSchoolProvince(this.state.pvName, cdtc.BaseType), this.ranksUpDown(0) }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ marginLeft: 2, fontSize: 12, color: 'rgb(13, 157, 186)', flex: 10 }}>{cdtc.Name}</Text>
                            <Image
                                source={require('MolisaApp/Image/muiTenDoc.png')}
                                style={{ height: 9,  marginTop: 0, marginRight: 5 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
    renderProvince = (pv) => {
        if (this.state.pvID == pv.ProvinceID) {
            return (
                <View>
                    <TouchableOpacity
                        style={{ height: 30, marginTop: 10, borderColor: 'rbg(203, 203, 203)', marginLeft: 30, marginRight: 20 }}
                        onPress={() => { this.setState({ pvID: -1 }), this.setState({ cdtcID: -1 }), this.setState({ School: [] }), this.ranksUpDown(0) }}>
                        <View style={{ flex: 1, backgroundColor: 'rgb(229, 229, 229)', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ marginLeft: 2, fontSize: 13, color: 'rgb(13, 157, 186)', flex: 10 }}>{pv.Name}</Text>
                            <Image
                                source={require('MolisaApp/Image/muiTenNgang.png')}
                                style={{ height: 13, marginTop: 0, marginRight: 5 }} />
                        </View>
                    </TouchableOpacity>
                    <ListView
                        dataSource={ds.cloneWithRows(this.state.CDTC)}
                        renderRow={this.renderCDTC} />
                </View>
            );
        }
        else {
            return (
                <View>
                    <TouchableOpacity
                        style={{ height: 30, marginTop: 10, borderColor: 'rbg(203, 203, 203)', borderBottomWidth: 1, marginLeft: 30, marginRight: 20 }}
                        onPress={() => { this.setState({ pvID: pv.ProvinceID }), this.setState({ cdtcID: -1 }), this.setState({ pvName: pv.Name }), this.ranksUpDown(0) }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ marginLeft: 2, fontSize: 13, color: 'rgb(13, 157, 186)', flex: 10 }}>{pv.Name}</Text>
                            <Image
                                source={require('MolisaApp/Image/muiTenDoc.png')}
                                style={{ height: 9,  marginTop: 0, marginRight: 5 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    renderNCS = (ncs) => {
        if (this.state.check == 0) {
            if (this.state.ncsID == ncs.ID) {
                return (
                    <View>
                        <TouchableOpacity
                            style={{ height: 30, marginTop: 10, borderColor: 'rbg(203, 203, 203)', marginLeft: 20, marginRight: 20 }}
                            onPress={() => { this.setState({ ncsID: -1 }), this.setState({ pvID: -1 }), this.setState({ cdtcID: -1 }), this.setState({ Province: [] }), this.setState({ School: [] }), this.setState({ Province: [] }), this.ranksUpDown(0) }}>
                            <View style={{ flex: 1, backgroundColor: 'rgb(229, 229, 229)', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginLeft: 8, fontSize: 14, color: 'rgb(13, 157, 186)', flex: 10 }}>{ncs.Name}</Text>
                                <Image
                                    source={require('MolisaApp/Image/muiTenNgang.png')}
                                    style={{ height: 13, marginTop: 0, marginRight: 5 }} />
                            </View>
                        </TouchableOpacity>
                        <ListView
                            dataSource={ds.cloneWithRows(this.state.Province)}
                            renderRow={this.renderProvince} />
                    </View>
                );
            }
            else {
                return (
                    <View>
                        <TouchableOpacity
                            style={{ height: 30, marginTop: 10, borderColor: 'rbg(203, 203, 203)', borderBottomWidth: 1, marginLeft: 20, marginRight: 20 }}
                            onPress={() => { this.setState({ ncsID: ncs.ID }), this.setState({ pvID: -1 }), this.setState({ cdtcID: -1 }), this.searchProvince(ncs.Type), this.ranksUpDown(0) }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginLeft: 8, fontSize: 14, color: 'rgb(13, 157, 186)', flex: 10 }}>{ncs.Name}</Text>
                                <Image
                                    source={require('MolisaApp/Image/muiTenDoc.png')}
                                    style={{ height: 9,  marginTop: 0, marginRight: 5 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            }
        }
        if (this.state.check == 2) {
            if (this.state.ncsID1 == ncs.ID) {
                return (
                    <View>
                        <TouchableOpacity
                            style={{ height: 30, marginTop: 10, borderColor: 'rbg(203, 203, 203)', marginLeft: 20, marginRight: 20 }}
                            onPress={() => { this.setState({ ncsID1: -1 }), this.setState({ School: [] }), this.setState({ Province: [] }), this.setState({ ncsID: -1 }) }}>
                            <View style={{ flex: 1, backgroundColor: 'rgb(229, 229, 229)', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginLeft: 8, fontSize: 14, color: 'rgb(13, 157, 186)', flex: 10 }}>{ncs.Name}</Text>
                                <Image
                                    source={require('MolisaApp/Image/muiTenNgang.png')}
                                    style={{ height: 13, marginTop: 0, marginRight: 5 }} />
                            </View>
                        </TouchableOpacity>
                        <ListView
                            dataSource={ds.cloneWithRows(this.state.School)}
                            renderRow={this.renderSchool} />
                    </View>
                );

            }
            else {
                return (
                    <View>
                        <TouchableOpacity
                            style={{ height: 30, marginTop: 10, borderColor: 'rbg(203, 203, 203)', borderBottomWidth: 1, marginLeft: 20, marginRight: 20 }}
                            onPress={() => { this.setState({ ncsID1: ncs.ID }), this.searchSchoolType(this.state.schoolsType, ncs.Type) }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ marginLeft: 8, fontSize: 14, color: 'rgb(13, 157, 186)', flex: 10 }}>{ncs.Name}</Text>
                                <Image
                                    source={require('MolisaApp/Image/muiTenDoc.png')}
                                    style={{ height: 9,  marginTop: 0, marginRight: 5 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            }
        }
    }

    render() {
        if (this.state.check == 0) { // trang thai chua bam gi
            return (
                <View style={{ flex: 1, backgroundColor: 'white', }}>
                    <ScrollView>
                        <TouchableOpacity onPress={() => {WorkGroup.setNdx(-1), WorkGroup.setTdx(-1), this.props.navigation.navigate('Screen1') }}>
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
                            <View style={{ borderBottomWidth: 7, borderColor: 'rgb(0, 158, 193)' }}>
                                <Text style={{ fontSize: 16, color: '#1299bb', fontWeight: 'bold', alignSelf: 'center' }}>CHỌN NGHỀ CHỌN TRƯỜNG{'\n'}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <View>
                                <Text style={{ color: 'rgb(0, 158, 193)', marginLeft: 20, fontWeight: 'bold', marginTop: 3 }}>CHỌN TRƯỜNG</Text>
                            </View>

                            <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => { this.ranksUpDown(1), this.ranksAZ(this.state.School) }}
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
                                    onPress={() => { this.ranksUpDown(2), this.setState({ check: 2 }) }}
                                    style={{ marginLeft: 45, flexDirection: 'row' }}>
                                    <View style={{ marginTop: 0.9 }}>
                                        <Image
                                            source={require('MolisaApp/Image/tickBox1.png')}
                                            style={{ width: 20, height: this.state.onCD, marginLeft: 4 }} />
                                        <Image
                                            source={require('MolisaApp/Image/tickBox2.png')}
                                            style={{ width: 20, height: this.state.offCD, marginLeft: 4 }} />
                                    </View>
                                    <Text>Cao đẳng</Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { this.ranksUpDown(3), this.setState({ check: 2 }) }}
                                    style={{ flexDirection: 'row' }}>
                                    <View style={{ marginTop: 0.9 }}>
                                        <Image
                                            source={require('MolisaApp/Image/tickBox1.png')}
                                            style={{ width: 20, height: this.state.onTC, marginLeft: 4 }} />
                                        <Image
                                            source={require('MolisaApp/Image/tickBox2.png')}
                                            style={{ width: 20, height: this.state.offTC, marginLeft: 4 }} />
                                    </View>
                                    <Text>Trung cấp</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { this.ranksUpDown(4), this.setState({ check: 2 }) }}
                                    style={{ flexDirection: 'row' }}>
                                    <View style={{ marginTop: 0.9 }}>
                                        <Image
                                            source={require('MolisaApp/Image/tickBox1.png')}
                                            style={{ width: 20, height: this.state.onK, marginLeft: 4 }} />
                                        <Image
                                            source={require('MolisaApp/Image/tickBox2.png')}
                                            style={{ width: 20, height: this.state.offK, marginLeft: 4 }} />
                                    </View>
                                    <Text>Khác</Text>
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
                                    onChangeText={text => { this.setState({ searchedText: text }), this.searchSchool(text, 0) }}
                                    value={this.state.searchedText}
                                    placeholder="Tìm kiếm trường"
                                />
                            </View>
                        </View>

                        <View>
                            <ListView
                                dataSource={ds.cloneWithRows(this.state.NCS)}
                                renderRow={this.renderNCS} />
                        </View>
                    </ScrollView>
                </View>
            );
        }
        else if (this.state.check == 1) { // trang thai tim kiem truong
            return (
                <View style={{ flex: 1, backgroundColor: 'white', }}>
                    <ScrollView>
                        <TouchableOpacity onPress={() => {  WorkGroup.setNdx(-1), WorkGroup.setTdx(-1), this.props.navigation.navigate('Screen1') }}>
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
                            <View style={{ borderBottomWidth: 7, borderColor: 'rgb(0, 158, 193)' }}>
                                <Text style={{ fontSize: 16, color: '#1299bb', fontWeight: 'bold', alignSelf: 'center' }}>CHỌN NGHỀ CHỌN TRƯỜNG {'\n'}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <View>
                                <Text style={{ color: 'rgb(0, 158, 193)', marginLeft: 20, fontWeight: 'bold', marginTop: 3 }}>CHỌN TRƯỜNG</Text>
                            </View>
                            <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => { this.ranksUpDown(1), this.ranksAZ(this.state.School) }}
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
                                    onPress={() => { this.ranksUpDown(2) }}
                                    style={{ marginLeft: 45, flexDirection: 'row' }}>
                                    <View style={{ marginTop: 0.9 }}>
                                        <Image
                                            source={require('MolisaApp/Image/tickBox1.png')}
                                            style={{ width: 20, height: this.state.onCD, marginLeft: 4 }} />
                                        <Image
                                            source={require('MolisaApp/Image/tickBox2.png')}
                                            style={{ width: 20, height: this.state.offCD, marginLeft: 4 }} />
                                    </View>
                                    <Text>Cao đẳng</Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { this.ranksUpDown(3) }}
                                    style={{ flexDirection: 'row' }}>
                                    <View style={{ marginTop: 0.9 }}>
                                        <Image
                                            source={require('MolisaApp/Image/tickBox1.png')}
                                            style={{ width: 20, height: this.state.onTC, marginLeft: 4 }} />
                                        <Image
                                            source={require('MolisaApp/Image/tickBox2.png')}
                                            style={{ width: 20, height: this.state.offTC, marginLeft: 4 }} />
                                    </View>
                                    <Text>Trung cấp</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { this.ranksUpDown(4) }}
                                    style={{ flexDirection: 'row' }}>
                                    <View style={{ marginTop: 0.9 }}>
                                        <Image
                                            source={require('MolisaApp/Image/tickBox1.png')}
                                            style={{ width: 20, height: this.state.onK, marginLeft: 4 }} />
                                        <Image
                                            source={require('MolisaApp/Image/tickBox2.png')}
                                            style={{ width: 20, height: this.state.offK, marginLeft: 4 }} />
                                    </View>
                                    <Text>Khác</Text>
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
                                    onChangeText={text => { this.setState({ searchedText: text }), this.searchSchool(text, 0), this.ranksUpDown(0) }}
                                    value={this.state.searchedText}
                                    placeholder="Tìm kiếm trường"
                                />
                            </View>
                        </View>
                        <View>
                            <ListView
                                dataSource={ds.cloneWithRows(this.state.School)}
                                renderRow={this.renderSchool} />
                        </View>
                    </ScrollView>
                </View>
            );
        }
        else if (this.state.check == 2) { // trang thai click vao cac mien
            return (
                <View style={{ flex: 1, backgroundColor: 'white', }}>
                    <ScrollView>
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

                            <View style={{ borderBottomWidth: 7, borderColor: 'rgb(0, 158, 193)' }}>
                                <Text style={{ fontSize: 16, color: '#1299bb', fontWeight: 'bold', alignSelf: 'center' }}>CHỌN NGHỀ CHỌN TRƯỜNG {'\n'}</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <View>
                                <Text style={{ color: 'rgb(0, 158, 193)', marginLeft: 20, fontWeight: 'bold', marginTop: 3 }}>CHỌN TRƯỜNG</Text>
                            </View>
                            <View style={{ marginLeft: 20, marginRight: 20, flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => { this.ranksUpDown(1), this.ranksAZ(this.state.School) }}
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
                                    onPress={() => { this.ranksUpDown(2) }}
                                    style={{ marginLeft: 45, flexDirection: 'row' }}>
                                    <View style={{ marginTop: 0.9 }}>
                                        <Image
                                            source={require('MolisaApp/Image/tickBox1.png')}
                                            style={{ width: 20, height: this.state.onCD, marginLeft: 4 }} />
                                        <Image
                                            source={require('MolisaApp/Image/tickBox2.png')}
                                            style={{ width: 20, height: this.state.offCD, marginLeft: 4 }} />
                                    </View>
                                    <Text>Cao đẳng</Text>

                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { this.ranksUpDown(3) }}
                                    style={{ flexDirection: 'row' }}>
                                    <View style={{ marginTop: 0.9 }}>
                                        <Image
                                            source={require('MolisaApp/Image/tickBox1.png')}
                                            style={{ width: 20, height: this.state.onTC, marginLeft: 4 }} />
                                        <Image
                                            source={require('MolisaApp/Image/tickBox2.png')}
                                            style={{ width: 20, height: this.state.offTC, marginLeft: 4 }} />
                                    </View>
                                    <Text>Trung cấp</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => { this.ranksUpDown(4) }}
                                    style={{ flexDirection: 'row' }}>
                                    <View style={{ marginTop: 0.9 }}>
                                        <Image
                                            source={require('MolisaApp/Image/tickBox1.png')}
                                            style={{ width: 20, height: this.state.onK, marginLeft: 4 }} />
                                        <Image
                                            source={require('MolisaApp/Image/tickBox2.png')}
                                            style={{ width: 20, height: this.state.offK, marginLeft: 4 }} />
                                    </View>
                                    <Text>Khác</Text>
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
                                    onChangeText={text => { this.setState({ searchedText: text }), this.searchSchool(text, 0), this.ranksUpDown(0) }}
                                    value={this.state.searchedText}
                                    placeholder="Tìm kiếm trường"
                                />
                            </View>
                        </View>
                        <View>
                            <ListView
                                dataSource={ds.cloneWithRows(this.state.NCS)}
                                renderRow={this.renderNCS} />
                        </View>
                    </ScrollView>
                </View>
            );
        }
    }
}