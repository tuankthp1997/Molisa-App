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
    Dimensions,
    Share
} from 'react-native';
import WorkGroup from '../HomeScreen/WorkGroup';
import { db } from 'MolisaApp/App';

var IDNganhDangXem = -1;
var IDTruongDangXem = -1;
var imgIncome;
var imgCost;
var imgProspects;
export default class MoTa extends Component {

    static navigationOptions = {
        title: 'Mô tả',
        showIcon: true,
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('MolisaApp/Image/trienVong.png')}
                style={[{ tintColor: tintColor, width: 23, height: 23 }]}
            />
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            NameSchool: '',
            Description: '',
            Mission: '',
            Position: '',
            JobRelated: '',
            IncomeSchool: '',
            ChiPhiCaoDangSchool: '',
            ChiPhiTrungCapSchool: '',
            ProspectsSchool: '',
            DescriptionSchool: '',
            MissionSchool: '',
            PositionSchool: '',
            JobRelatedSchool: '',
            WorkGroupID: '',
            Income: '',
            Cost: '',
            Prospects: '',
            SchoolsArray: [
                { SchoolsID: '', Name: '', ChiPhiCaoDang: '', ChiPhiTrungCap: '', ThuNhap: '', TrienVong: '' }],
            Listjob: [
                { key: '', Name: '' }],
        };
    }

    queryData = () => {
        db.transaction((tx) => {
            tx.executeSql('select Name, WorkGroupID, Description, Mission, Position, JobRelated, Income, Cost, Prospects from Tbl_Job where JobID = ?', [IDNganhDangXem], (tx, results) => {
                var row = results.rows.item(0);
                this.setState({
                    Name: row.Name,
                    WorkGroupID: row.WorkGroupID,
                    Description: row.Description,
                    Mission: row.Mission,
                    Position: row.Position,
                    JobRelated: row.JobRelated,
                    Income: row.Income,
                    Cost: row.Cost,
                    Prospects: row.Prospects,
                    countJob: '',
                });
            });
        });
    }

    queryDataJob = () => {
        var arrs = [];
        var sql = 'select Name, Income, Prospects,  CollegeMonthlyCost,SecondaryMonthlyCost  from Tbl_Job where JobID = ?';
        db.transaction((tx) => {
            tx.executeSql(sql, [IDNganhDangXem], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var School = {
                        Name: row.Name,
                        ThuNhap: row.Income,
                        TrienVong: row.Prospects,
                        ChiPhiCaoDang: row.CollegeMonthlyCost,
                        ChiPhiTrungCap: row.SecondaryMonthlyCost,
                    }
                    arrs.push(School);
                }
                this.setState({
                    SchoolsArray: arrs
                })
            });
        });
    }

    queryDataSchool = () => {
        if (IDTruongDangXem != -1) {     // Query data theo ID truong, mo ta nghe theo tung truong
            db.transaction((tx) => {
                tx.executeSql('select Description, Mission, Position, JobRelated from Tbl_SchoolJob where (Tbl_SchoolJob.SchoolID = ? and Tbl_SchoolJob.JobID = ?)', [IDTruongDangXem, IDNganhDangXem], (tx, results) => {
                    if (results.rows.length != 0) {
                        var row = results.rows.item(0);
                        this.setState({
                            DescriptionSchool: row.Description,
                            MissionSchool: row.Mission,
                            PositionSchool: row.Position,
                            JobRelatedSchool: row.JobRelated,
                        });
                    }
                });
            });
        }
    }

    queryListJob = () => {
        var arrs = [];
        db.transaction((tx) => {
            tx.executeSql('select JobID, Name from Tbl_Job where WorkGroupID = ? and JobID != ?', [this.state.WorkGroupID, IDNganhDangXem], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    var ListJob = { key: row.JobID, Name: row.Name }
                    arrs.push(ListJob);
                }
                this.setState({
                    Listjob: arrs
                })
            });
        });
    }

  

    ConvertStringToMoney = (x) => {
        if (x != '') {
            var intPart = Math.round(x).toString();
            var decimalPart = (x - Math.round(x)).toString();
            // Remove the "0." if it exists
            if (decimalPart.length > 2) {
                decimalPart = decimalPart.substring(2);
            } else {
                // Otherwise remove it altogether
                decimalPart = '';
            }
            // Work through the digits three at a time
            var i = intPart.length - 3;
            while (i > 0) {
                intPart = intPart.substring(0, i) + ',' + intPart.substring(i);
                i = i - 3;
            }
            return intPart + decimalPart + ' VNĐ';
        } else {
            return 'Đang cập nhật';
        }
    }

    queryDatajobSchool = () => {
        if (IDNganhDangXem != -1 && IDTruongDangXem != -1) {
            db.transaction((tx) => {
                tx.executeSql('select Income, CollegeMonthlyCost, SecondaryMonthlyCost, Prospects from Tbl_SchoolJob where SchoolID = ? and JobID = ?', [IDTruongDangXem, IDNganhDangXem], (tx, results) => {
                    if (results.rows.length != 0) {
                        var row = results.rows.item(0);

                        this.setState({
                            IncomeSchool: row.Income,
                            ChiPhiCaoDangSchool: row.CollegeMonthlyCost,
                            ChiPhiTrungCapSchool: row.SecondaryMonthlyCost,
                            ProspectsSchool: row.Prospects,
                        });
                    }
                });
            })
        }
    }

    StringCoHoiPhatTrienViecLam = (x) => {
        if (x == 0) return 'Đang cập nhật'; else
            if (x > 0 && x <= 3) return 'Thuận lợi'; else
                if (x > 3 && x <= 6) return 'Tương đối thuận lợi'; else
                    if (x > 6 && x <= 8) return 'Trung bình'; else
                        if (x > 8) return 'Không thuận lợi';
    }
    StringThuNhap = (x) => {
        if (x == 0) return 'Đang cập nhật'; else
            if (x > 0 && x <= 2) return 'Nhỏ hơn 5 triệu VNĐ'; else
                if (x > 2 && x <= 4) return 'Từ 5 triệu đến 8 triệu VNĐ'; else
                    if (x > 4 && x <= 6) return 'Từ 8 đến 10 triệu VNĐ'; else
                        if (x > 6 && x <= 8) return 'Từ 10 đến 12 triệu VNĐ'; else
                            if (x > 8) return 'Lớn hơn 12 triệu VNĐ';
    }

    StringThuNhapSchool = (x) => {
        if (x == 0) return 'Đang cập nhật'; else
        if (x > 0 && x <= 1) return 'Nhỏ hơn 5 triệu VNĐ'; else
            if (x == 2) return 'Từ 5 triệu đến 8 triệu VNĐ'; else
                if (x == 3) return 'Từ 8 đến 10 triệu VNĐ'; else
                    if (x == 4) return 'Từ 10 đến 12 triệu VNĐ'; else
                        if (x >= 5) return 'Lớn hơn 12 triệu VNĐ';
    }

    printNameSchool = () => {
        if (IDTruongDangXem != -1) {
            db.transaction((tx) => {
                tx.executeSql('select Name from Tbl_School where SchoolID = ?', [IDTruongDangXem], (tx, results) => {
                    if (results.rows.length != 0) {
                        var row = results.rows.item(0);
                        this.setState({
                            NameSchool: row.Name,
                        });
                    }
                });
            });
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Screen2', {
                        });
                    }}
                >
                    <Text style={{ fontWeight: 'bold', color: '#1565C0', fontSize: 14, marginLeft: 2 }}> {'\n'} {this.state.NameSchool.toUpperCase()}</Text>
                </TouchableOpacity>
            )
        } return null;
    }

    clickJob = (ID) => {
        WorkGroup.setNdx(ID);
        WorkGroup.setTdx(-1);
        this.props.navigation.navigate('Screen3', {
        });
    }

    renderListJob = (item) => {
        return (
            <TouchableOpacity
                style={{ height: 30, marginTop: 10, marginBottom: 3, borderColor: '#c5c5c5', borderBottomWidth: 1, marginLeft: 20, marginRight: 20 }}
                onPress={() => { this.clickJob(item.key) }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 2, fontSize: 11, color: 'rgb(13, 157, 186)', flex: 10 }}>{item.Name.toUpperCase()}</Text>
                    <Image
                        source={require('MolisaApp/Image/muiTenNgang.png')}
                        style={{ height: 13, }} />
                </View>
            </TouchableOpacity>
        )
    }





    UNSAFE_componentWillMount() {
        IDNganhDangXem = WorkGroup.getNdx();
        IDTruongDangXem = WorkGroup.getTdx();
        // console.log(IDNganhDangXem);
        // console.log(IDTruongDangXem);
        this.queryData();
        this.queryDataJob();
        //  this.queryDataCountJob();
        this.queryDatajobSchool();
        if (IDNganhDangXem != -1 && IDTruongDangXem != -1) this.queryDataSchool();
        this.queryListJob();
    }

    renderimg = () => {
        var Income = this.state.Income;
        var Cost = this.state.Cost;
        var Prospects = this.state.Prospects;
        if (Income <= 0) {
            imgIncome = require('MolisaApp/Image/Income/Income0.png')
        } else 
        if (Income == 1 || Income == 2) {
            imgIncome = require('MolisaApp/Image/Income/Income2.png')
        }
        else if (Income == 3 || Income == 4) {
            imgIncome = require('MolisaApp/Image/Income/Income4.png')
        }
        else if (Income == 5 || Income == 6) {
            imgIncome = require('MolisaApp/Image/Income/Income6.png')
        }
        else if (Income == 7 || Income == 8) {
            imgIncome = require('MolisaApp/Image/Income/Income8.png')
        }
        else if (Income == 9 || Income >= 10) {
            imgIncome = require('MolisaApp/Image/Income/Income10.png')
        }
        
        // COST
        if (Cost <= 0) {
            imgCost = require('MolisaApp/Image/Cost/Cost0.png')
        } else 
        if (Cost == 1) {
            imgCost = require('MolisaApp/Image/Cost/Cost1.png')
        }
        else if (Cost == 2) {
            imgCost = require('MolisaApp/Image/Cost/Cost2.png')
        }
        else if (Cost == 3) {
            imgCost = require('MolisaApp/Image/Cost/Cost3.png')
        }
        else if (Cost == 4) {
            imgCost = require('MolisaApp/Image/Cost/Cost4.png')
        }
        else if (Cost == 5) {
            imgCost = require('MolisaApp/Image/Cost/Cost5.png')
        }
        else if (Cost == 6) {
            imgCost = require('MolisaApp/Image/Cost/Cost6.png')
        }
        else if (Cost == 7) {
            imgCost = require('MolisaApp/Image/Cost/Cost7.png')
        }
        else if (Cost == 8) {
            imgCost = require('MolisaApp/Image/Cost/Cost8.png')
        }
        else if (Cost == 9) {
            imgCost = require('MolisaApp/Image/Cost/Cost9.png')
        }
        else if (Cost >= 10) {
            imgCost = require('MolisaApp/Image/Cost/Cost10.png')
        }

        // PROSPECTS
        if (Prospects <= 0) {
            imgProspects = require('MolisaApp/Image/Prospects/Prospects0.png')
        } else
        if (Prospects == 1 || Prospects == 2) {
            imgProspects = require('MolisaApp/Image/Prospects/Prospects10.png')
        }
       
        else if (Prospects == 3 || Prospects == 4 || Prospects == 5) {
            imgProspects = require('MolisaApp/Image/Prospects/Prospects8.png')
        }
       
        else if (Prospects == 6 || Prospects == 7 || Prospects == 8) {
            imgProspects = require('MolisaApp/Image/Prospects/Prospects5.png')
        }
      
        else if (Prospects == 9 || Prospects >= 10) {
            imgProspects = require('MolisaApp/Image/Prospects/Prospects2.png')
        }
    };

    ListViewSeeMore = () => {
        return (
            <FlatList
                data={this.state.SchoolsArray}
                renderItem={({ item }) =>
                    this.renderSchool(item)} />
        )
    }

    ListViewSeeMoreSchool = () => {
        if (IDTruongDangXem != -1 && IDNganhDangXem != -1)
            return (
                <View>
                    <TouchableOpacity
                        style={{ marginBottom: 3, marginLeft: 20, marginRight: 20 }}
                        onPress={() => {
                            this.props.navigation.navigate('ListViewFilter', {
                                ID: 5,
                                SchoolID: IDNganhDangXem,
                                IDTruongDangXem: IDTruongDangXem,
                                SchoolName: this.state.Name,
                                NameSchoolTop1: this.state.NameSchool,
                                InComeSchoolTop1: this.state.IncomeSchool,
                                ChiPhiCaoDangSchoolTop1: this.state.ChiPhiCaoDangSchool,
                                ChiPhiTrungCapSchoolTop1: this.state.ChiPhiTrungCapSchool,
                                ProSchoolTop1: this.state.ProspectsSchool
                            });
                        }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                            <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Thu Nhập: {this.StringThuNhapSchool(this.state.IncomeSchool)}</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                            <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Học phí Cao Đẳng/ tháng: {this.ConvertStringToMoney(Math.round(this.state.ChiPhiCaoDangSchool))}</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                            <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Học phí Trung Cấp/ tháng: {this.ConvertStringToMoney(Math.round(this.state.ChiPhiTrungCapSchool))}</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                            <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Cơ hội: {this.StringCoHoiPhatTrienViecLam(this.state.ProspectsSchool)}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )
        else return null;
    }



    renderDescription = () => {
        if (this.state.Description == '' && this.state.DescriptionSchool == '') {
            return (
                <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
            )
        }
        if (this.state.Description != '') {
            return (
                <View>
                    {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin tổng cục</Text> */}
                    <Text style={{ marginLeft: 20, color: 'black', marginRight: 20 }}>
                        {this.state.Description}
                    </Text>
                </View>
            );
        }
        else return null;
    }

    renderDescriptionSchool = () => {
        if (this.state.DescriptionSchool != '' && this.state.Description == '') {
            return (
                <View>
                    {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin từ trường</Text> */}
                    <Text style={{ marginLeft: 20, color: 'black', marginRight: 20 }}>
                        {this.state.DescriptionSchool}
                    </Text>
                </View>
            );
        }
        else return null;
    }

    renderMission = () => {
        if (this.state.Mission == '' && this.state.MissionSchool == '') {
            return (
                <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
            )
        }
        if (this.state.Mission != '') {
            return (
                <View>
                    {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin tổng cục</Text> */}
                    <Text style={{ marginLeft: 20, color: 'black', marginRight: 20 }}>
                        {this.state.Mission}
                    </Text>
                </View>
            );
        }
        else return null;
    }

    renderMissionSchool = () => {
        if (this.state.MissionSchool != '' && this.state.Mission == '') {
            return (
                <View>
                    {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin từ trường</Text> */}
                    <Text style={{ marginLeft: 20, color: 'black', marginRight: 20 }}>
                        {this.state.MissionSchool}
                    </Text>
                </View>
            );
        }
        else return null;
    }

    renderPosition = () => {
        if (this.state.Position == '' && this.state.PositionSchool == '') {
            return (
                <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
            )
        }
        if (this.state.Position != '') {
            return (
                <View>
                    {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin tổng cục</Text> */}
                    <Text style={{ marginLeft: 20, color: 'black', marginRight: 20 }}>
                        {this.state.Position}
                    </Text>
                </View>
            );
        }
        else return null;
    }
    renderPositionSchool = () => {
        if (this.state.PositionSchool != '' && this.state.Position == '') {
            return (
                <View>
                    {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin từ trường</Text> */}
                    <Text style={{ marginLeft: 20, color: 'black', marginRight: 20 }}>
                        {this.state.PositionSchool}
                    </Text>
                </View>
            );
        }
        else return null;
    }
    renderJobRelated = () => {
        if (this.state.JobRelated == '' && this.state.JobRelatedSchool == '') {
            return (
                <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
            )
        }
        if (this.state.JobRelated != '') {
            return (
                <View>
                    {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin tổng cục</Text> */}
                    <Text style={{ marginLeft: 20, color: 'black', marginRight: 20 }}>
                        {this.state.JobRelated}
                    </Text>
                </View>
            );
        }
        else return null;
    }
    renderJobRelatedSchool = () => {
        if (this.state.JobRelatedSchool != '' && this.state.JobRelated == '') {
            return (
                <View>
                    {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin từ trường</Text> */}
                    <Text style={{ marginLeft: 20, color: 'black', marginRight: 20 }}>
                        {this.state.JobRelatedSchool}
                    </Text>
                </View>
            );
        }
        else return null;
    }

    navigateSchool = () => {
        if (IDTruongDangXem != -1) {
            this.props.navigation.navigate('ListViewFilter', {
                ID: 5,
                SchoolID: IDNganhDangXem,
                IDTruongDangXem: IDTruongDangXem,
                SchoolName: this.state.Name,
                NameSchoolTop1: this.state.NameSchool,
                InComeSchoolTop1: this.state.IncomeSchool,
                ChiPhiCaoDangSchoolTop1: this.state.ChiPhiCaoDangSchool,
                ChiPhiTrungCapSchoolTop1: this.state.ChiPhiTrungCapSchool,
                ProSchoolTop1: this.state.ProspectsSchool
            });
        } else {
            this.props.navigation.navigate('ListViewFilter', {
                ID: 5,
                SchoolID: IDNganhDangXem,
                SchoolName: this.state.Name,
            });
        }
    }
    renderSchool = (sc) => {
        return (
            <View>
                <TouchableOpacity
                    style={{ marginTop: 10, marginBottom: 3, marginLeft: 20, marginRight: 20 }}
                    onPress={() => {
                        this.navigateSchool();
                    }}>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Thu Nhập: {this.StringThuNhap(sc.ThuNhap)}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Học phí Cao Đẳng/ tháng: {this.ConvertStringToMoney(Math.round(sc.ChiPhiCaoDang))}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Học phí Trung Cấp/ tháng: {this.ConvertStringToMoney(Math.round(sc.ChiPhiTrungCap))}</Text>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
                        <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Cơ hội: {this.StringCoHoiPhatTrienViecLam(sc.TrienVong)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }


    ShareMessage = () => {
        Share.share(
            {
                message: this.state.Name + ',' + this.state.NameSchool + '\nhttp://gdnn.gov.vn/'
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    }


    render() {
        this.renderimg();
        var { width } = Dimensions.get('window');
        return (
            <View style={styles.container}>
                <ScrollView>
                    <TouchableOpacity onPress={() => { WorkGroup.setTdx(-1), WorkGroup.setTdx(-1), this.props.navigation.navigate('Screen1') }}>
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

                        <Text style={{ fontSize: 16, color: '#1299bb', fontWeight: 'bold', alignSelf: 'center' }}>CHỌN NGHỀ CHỌN TRƯỜNG{'\n'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack(null) }} style={{ backgroundColor: 'rgb(0, 161, 199)', width: width }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'white', alignSelf: 'center', marginTop: 6, marginBottom: 6, marginLeft: 15 }}>←   {this.state.Name.toUpperCase()}</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={{ flex: 3, fontSize: 14, fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>{'\n'}{this.state.Name}</Text>
                        <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-end', marginTop: 10 }} onPress={this.ShareMessage}>
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <Image source={require('MolisaApp/Image/chiaSe.png')}
                                    style={{ width: 25, height: 25 }} />
                                <Text style={{ color: '#1299bb', marginTop: 3, fontSize: 13, marginLeft: 3, }}>Chia sẻ</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 2, marginBottom: 3 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 4.5 }}></View>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        source={imgIncome}
                                        style={{ width: 70, height: 70 }} />
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        source={imgCost}
                                        style={{ width: 70, height: 70 }} />
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        source={imgProspects}
                                        style={{ width: 70, height: 70 }} />
                                </View>
                            </View>
                            <View style={{ flex: 0.2, borderColor: 'rgb(47, 216, 244)', borderTopWidth: 2.5, marginLeft: 20, marginRight: 20, marginTop: 10 }}></View>
                            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 0, marginRight: 0 }}>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, alignItems: 'center', justifyContent: 'center', color: 'black', marginTop: 8 }}>Thu nhập</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, alignItems: 'center', justifyContent: 'center', color: 'black', marginTop: 8 }}>Học phí</Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, alignItems: 'center', justifyContent: 'center', color: 'black', marginTop: 8 }}>Cơ hội</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {this.ListViewSeeMore()}
                    <View style={{}}>
                        <View style={{}}>
                            {this.printNameSchool()}
                            {this.ListViewSeeMoreSchool()}
                            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  MÔ TẢ NGHỀ</Text>
                            {this.renderDescription()}
                            {this.renderDescriptionSchool()}

                            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  CÁC NHIỆM VỤ CHỦ YẾU CỦA NGHỀ </Text>
                            {this.renderMission()}
                            {this.renderMissionSchool()}
                            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  VỊ TRÍ VIỆC LÀM CỦA NGHỀ </Text>
                            {this.renderPosition()}
                            {this.renderPositionSchool()}
                            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  NGÀNH NGHỀ LIÊN QUAN TƯƠNG TỰ {this.state.countJob}</Text>

                            <FlatList
                                data={this.state.Listjob}
                                renderItem={({ item }) =>
                                    this.renderListJob(item)} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // justifyContent: 'flex-start',
        alignItems: 'center',
    },
})