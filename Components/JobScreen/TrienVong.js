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
import { db } from 'MolisaApp/App';
var imgIncome;
var imgCost;
var imgProspects;
var IDNganhDangXem = -1;
var IDTruongDangXem = -1;
import WorkGroup from '../HomeScreen/WorkGroup';


export default class TrienVong extends Component {
    static navigationOptions = {
        title: 'TRIỂN VỌNG',
        showIcon: true,
        tabBarIcon: ({ tintColor }) => (
            <Image
                source={require('MolisaApp/Image/thuNhap.png')}
                style={[{ tintColor: tintColor, width: 23, height: 23 }]}
            />
        ),
    };

    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            OpFindJob: '',     // Co hoi viec lam sau tot nghiep
            OpDevelope: '',
            OpLevelUp: '',
            Income: '', // Thu nhap binh quan / thang
            Cost: '',
            Prospects: '',
            StudentNum2017: '',
            StudentNum2016: '',
            StudentNum2015: '',
            StudentNum2014: '',
            StudentNum2013: '',
            OpFindJobSchool: '',
            OpDevelopeSchool: '',
            OpLevelUpSchool: '',
            IncomeSchoolz: '',
            CostSchoolz: '',
            ProspectsSchoolz: '',
            StudentNum2017School: '',
            StudentNum2016School: '',
            StudentNum2015School: '',
            StudentNum2014School: '',
            StudentNum2013School: '',
            FindJobSchool: '',
            IncomeSchool: 0,
            CostSchool: 0,
            ProspectsSchool: 0,
            FindJob: '',
            SchoolsArray: [
                { SchoolsID: '', Name: '', ChiPhiCaoDang: '', ChiPhiTrungCap: '', ThuNhap: '', TrienVong: '' }],

            setHeight2017: 0,
            setHeight2016: 0,
            setHeight2015: 0,
            setHeight2014: 0,
            setHeight2013: 0,
            setHeightOpFindJob: 0,
            setHeightOpDevelope: 0,
            setHeightOpLevelUp: 0,
            setHeightIncome: 0,
            NameSchool: ''
        };
    }

    setHeights = (x) => {
        if (x == 2017) {
            if (this.state.setHeight2017 == 0)
                this.setState({
                    setHeight2017: 220,
                    setHeight2016: 0,
                    setHeight2015: 0,
                    setHeight2014: 0,
                    setHeight2013: 0,
                });
            else this.setState({
                setHeight2017: 0,
            });
        } else
            if (x == 2016) {
                if (this.state.setHeight2016 == 0)
                    this.setState({
                        setHeight2017: 0,
                        setHeight2016: 220,
                        setHeight2015: 0,
                        setHeight2014: 0,
                        setHeight2013: 0,
                    });
                else this.setState({
                    setHeight2016: 0,
                });
            } else
                if (x == 2015) {
                    if (this.state.setHeight2015 == 0)
                        this.setState({
                            setHeight2017: 0,
                            setHeight2016: 0,
                            setHeight2015: 220,
                            setHeight2014: 0,
                            setHeight2013: 0,
                        });
                    else this.setState({
                        setHeight2015: 0,
                    });
                } else
                    if (x == 2014) {
                        if (this.state.setHeight2014 == 0)
                            this.setState({
                                setHeight2017: 0,
                                setHeight2016: 0,
                                setHeight2015: 0,
                                setHeight2014: 220,
                                setHeight2013: 0,
                            });
                        else this.setState({
                            setHeight2014: 0,
                        });
                    } else
                        if (x == 2013) {
                            if (this.state.setHeight2013 == 0)
                                this.setState({
                                    setHeight2017: 0,
                                    setHeight2016: 0,
                                    setHeight2015: 0,
                                    setHeight2014: 0,
                                    setHeight2013: 220,
                                });
                            else this.setState({
                                setHeight2013: 0,
                            });
                        };
        if (x == 1) {
            if (this.state.setHeightOpFindJob == 0)
                this.setState({
                    setHeightOpFindJob: 220,
                    setHeightOpDevelope: 0,
                    setHeightOpLevelUp: 0,
                    setHeightIncome: 0,
                });
            else this.setState({
                setHeightOpFindJob: 0,
            });
        };
        if (x == 2) {
            if (this.state.setHeightOpDevelope == 0)
                this.setState({
                    setHeightOpFindJob: 0,
                    setHeightOpDevelope: 220,
                    setHeightOpLevelUp: 0,
                    setHeightIncome: 0,
                });
            else this.setState({
                setHeightOpDevelope: 0,
            });
        };
        if (x == 3) {
            if (this.state.setHeightOpLevelUp == 0)
                this.setState({
                    setHeightOpFindJob: 0,
                    setHeightOpDevelope: 0,
                    setHeightOpLevelUp: 220,
                    setHeightIncome: 0,
                });
            else this.setState({
                setHeightOpLevelUp: 0,
            });
        };
        if (x == 4) {
            if (this.state.setHeightIncome == 0)
                this.setState({
                    setHeightOpFindJob: 0,
                    setHeightOpDevelope: 0,
                    setHeightOpLevelUp: 0,
                    setHeightIncome: 220,
                });
            else this.setState({
                setHeightIncome: 0,
            });
        };
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
    queryDataSchool = () => {
        if (IDTruongDangXem != -1) {
            db.transaction((tx) => {
                tx.executeSql('select Name, OpFindJob, OpDevelope, OpLevelUp, Income, Cost, Prospects, StudentNum2017, StudentNum2016, StudentNum2015, StudentNum2014, StudentNum2013, FindJob from Tbl_School inner join Tbl_SchoolJob on (Tbl_School.SchoolID = Tbl_SchoolJob.SchoolID and Tbl_SchoolJob.SchoolID = ? and Tbl_SchoolJob.JobID = ?)', [IDTruongDangXem, IDNganhDangXem], (tx, results) => {
                    var row = results.rows.item(0);
                    this.setState({
                        NameSchool: row.Name,
                        OpFindJobSchool: row.OpFindJob,
                        OpDevelopeSchool: row.OpDevelope,
                        OpLevelUpSchool: row.OpLevelUp,
                        IncomeSchoolz: row.Income,
                        CostSchoolz: row.Cost,
                        ProspectsSchoolz: row.Prospects,
                        StudentNum2017School: row.StudentNum2017,
                        StudentNum2016School: row.StudentNum2016,
                        StudentNum2015School: row.StudentNum2015,
                        StudentNum2014School: row.StudentNum2014,
                        StudentNum2013School: row.StudentNum2013,
                        FindJobSchool: row.FindJob
                    });
                });
            });
        }
    }

    printNameSchool = () => {
        if (IDTruongDangXem != -1) {

            return (
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Screen2', {
                        });
                    }}
                >
                    <Text style={{ fontWeight: 'bold', color: '#1565C0', fontSize: 14, marginLeft: 2 }}> {'\n'}  {this.state.NameSchool.toUpperCase()}</Text>
                </TouchableOpacity>
            )
        } else {
            return null;
        }
    }
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


    clickJob = (ID) => {
        WorkGroup.setTdx(ID);
        this.props.navigation.navigate('Screen2', {
        });
    }

    ShareMessage = () => {
        Share.share(
            {
                // message: this.state.TextInputValueHolder.toString()
                message: this.state.Name + ',' + this.state.NameSchool + '\nhttp://gdnn.gov.vn/'
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
    }

    queryData = () => {
        db.transaction((tx) => {
            tx.executeSql('select Name, OpFindJob, OpDevelope, OpLevelUp, Income, Cost, Prospects, StudentNum2017, StudentNum2016, StudentNum2015, StudentNum2014, StudentNum2013, FindJob  from Tbl_Job where JobID = ?', [IDNganhDangXem], (tx, results) => {
                var row = results.rows.item(0);
                this.setState({
                    Name: row.Name,
                    OpFindJob: row.OpFindJob,     // Co hoi viec lam sau tot nghiep
                    OpDevelope: row.OpDevelope,
                    OpLevelUp: row.OpLevelUp,
                    Income: row.Income, // Thu nhap binh quan / thang
                    Cost: row.Cost,
                    Prospects: row.Prospects,
                    StudentNum2017: row.StudentNum2017,
                    StudentNum2016: row.StudentNum2016,
                    StudentNum2015: row.StudentNum2015,
                    StudentNum2014: row.StudentNum2014,
                    StudentNum2013: row.StudentNum2013,
                    FindJob: row.FindJob,
                });
            });
        });
    }

    queryDataJob = () => {
        var arrs = [];
        var sql = 'select Name,Income,Prospects, Cost, CollegeMonthlyCost, SecondaryMonthlyCost from Tbl_Job where JobID = ?';
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

    renderCoHoiViecLamSauTotNghiep = () => {
        if (this.state.OpFindJobSchool == '' && this.state.OpFindJob == '') {
            return (
                <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
            )
        }
        if (this.state.OpFindJobSchool != '') {
            return this.StringCoHoiViecLamSauTotNghiepSchool(this.state.OpFindJobSchool);
        } else {
            return this.StringCoHoiViecLamSauTotNghiep(this.state.OpFindJob);
        }
    }

    renderCoHoiPhatTrienViecLam = () => {
        if (this.state.OpDevelopeSchool == '' && this.state.OpDevelope == '') {
            return (
                <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
            )
        }
        if (this.state.OpDevelopeSchool != '') {
            return this.StringCoHoiPhatTrienViecLamSchool(this.state.OpDevelopeSchool)
        } else {
            return this.StringCoHoiPhatTrienViecLam(this.state.OpDevelope)
        }
    }

    renderCoHoiNangCaoTrinhDo = () => {
        if (this.state.OpLevelUpSchool == '' && this.state.OpLevelUp == '') {
            return (
                <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
            )
        }
        if (this.state.OpLevelUpSchool != '') {
            return this.StringCoHoiPhatTrienViecLamSchool(this.state.OpLevelUpSchool)
        } else {
            return this.StringCoHoiPhatTrienViecLam(this.state.OpLevelUp)
        }
    }

    renderThuNhap = () => {
        if (this.state.IncomeSchoolz == '' && this.state.Income == '') {
            return (
                <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
            )
        }
        if (this.state.IncomeSchoolz != '') {
            return this.StringThuNhapSchool(this.state.IncomeSchoolz)
        } else {
            return this.StringThuNhap(this.state.Income)
        }
    }
    renderStudent2017School = () => {
        if (this.state.StudentNum2017School != '') {
            return (this.state.StudentNum2017School + ' học viên')
        } else {
            return (this.state.StudentNum2017 + ' học viên [tổng hợp]')
        }
    }
    renderStudent2016School = () => {
        if (this.state.StudentNum2016School != '') {
            return (this.state.StudentNum2016School + ' học viên')
        } else {
            return (this.state.StudentNum2016 + ' học viên [tổng hợp]')
        }
    }
    renderStudent2015School = () => {
        if (this.state.StudentNum2015School != '') {
            return (this.state.StudentNum2015School + ' học viên')
        } else {
            return (this.state.StudentNum2015 + ' học viên [tổng hợp]')
        }
    }
    renderStudent2014School = () => {
        if (this.state.StudentNum2014School != '') {
            return (this.state.StudentNum2014School + ' học viên')
        } else {
            return (this.state.StudentNum2014 + ' học viên [tổng hợp]')
        }
    }
    renderStudent2013School = () => {
        if (this.state.StudentNum2013School != '') {
            return (this.state.StudentNum2013School + ' học viên');
        } else {
            return (this.state.StudentNum2013 + ' học viên [tổng hợp]');
        }
    }

    UNSAFE_componentWillMount() {
        IDNganhDangXem = WorkGroup.getNdx();
        IDTruongDangXem = WorkGroup.getTdx();
        this.queryData();
        this.queryDataJob();
        this.queryDatajobSchool();
        this.queryDataSchool();
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


    StringCoHoiViecLamSauTotNghiep = (x) => {
        if (x == 0) return 'Đang cập nhật'; else
            if (x > 0 && x <= 3) return 'Dễ tìm việc làm'; else
                if (x > 3 && x <= 6) return 'Tương đối dễ tìm việc'; else
                    if (x > 6 && x <= 8) return 'Trung bình'; else
                        if (x > 8) return 'Khó tìm việc làm';
    }

    StringCoHoiViecLamSauTotNghiepSchool = (x) => {
        if (x == 0) return 'Đang cập nhật'; else
            if (x > 0 && x <= 1) return 'Dễ tìm việc làm'; else
                if (x == 2) return 'Tương đối dễ tìm việc'; else
                    if (x == 3) return 'Trung bình'; else
                        if (x >= 4) return 'Khó tìm việc làm';
    }

    StringCoHoiPhatTrienViecLam = (x) => {
        if (x == 0) return 'Đang cập nhật'; else
            if (x > 0 && x <= 3) return 'Thuận lợi'; else
                if (x > 3 && x <= 6) return 'Tương đối thuận lợi'; else
                    if (x > 6 && x <= 8) return 'Trung bình'; else
                        if (x > 8) return 'Không thuận lợi';
    }

    StringCoHoiPhatTrienViecLamSchool = (x) => {
        if (x == 0) return 'Đang cập nhật'; else
            if (x > 0 && x <= 1) return 'Thuận lợi'; else
                if (x == 2) return 'Tương đối thuận lợi'; else
                    if (x == 3) return 'Trung bình'; else
                        if (x >= 4) return 'Không thuận lợi';
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

    render() {
        const { params } = this.props.navigation.state;
        IDNganhDangXem = IDNganhDangXem;
        Income = this.state.Income;
        Cost = this.state.Cost;
        Prospects = this.state.Prospects;
        var { width } = Dimensions.get('window');
        this.renderimg();
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
                        {this.printNameSchool()}
                        {this.ListViewSeeMoreSchool()}
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ListViewFilter', {
                                ID: 6,
                                SchoolID: IDNganhDangXem,
                                SchoolName: this.state.Name,
                            })
                        }}>
                            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  CƠ HỘI VIỆC LÀM SAU TỐT NGHIỆP</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontWeight: 'bold', fontSize: 13, color: 'purple', }}>
                                {this.renderCoHoiViecLamSauTotNghiep()}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ListViewFilter', {
                                ID: 7,
                                SchoolID: IDNganhDangXem,
                                SchoolName: this.state.Name,
                            })
                        }}>
                            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  CƠ HỘI PHÁT TRIỂN NGHỀ NGHIỆP, VIỆC LÀM</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontWeight: 'bold', fontSize: 13, color: 'purple', }}>
                                {this.renderCoHoiPhatTrienViecLam()}
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ListViewFilter', {
                                ID: 8,
                                SchoolID: IDNganhDangXem,
                                SchoolName: this.state.Name,
                            })
                        }}>
                            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  CƠ HỘI NÂNG CAO TRÌNH ĐỘ/ CHUYỂN ĐỔI NGHỀ NGHIỆP</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontWeight: 'bold', fontSize: 13, color: 'purple', }}>
                                {this.renderCoHoiNangCaoTrinhDo()}
                            </Text>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ListViewFilter', {
                                ID: 9,
                                SchoolID: IDNganhDangXem,
                                SchoolName: this.state.Name,
                            })
                        }}>
                            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  THU NHẬP BÌNH QUÂN/ THÁNG SAU TỐT NGHIỆP</Text>
                            <Text style={{ marginLeft: 20, marginRight: 20, fontWeight: 'bold', fontSize: 13, color: 'purple', }}>
                                {this.renderThuNhap()}
                            </Text>
                        </TouchableOpacity>

                        <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  SỐ LƯỢNG SINH VIÊN NHỮNG NĂM GẦN ĐÂY</Text>
                        <View>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('ListViewFilter', {
                                    ID: 2017,
                                    SchoolID: IDNganhDangXem,
                                    SchoolName: this.state.Name,
                                })
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginLeft: 20, color: 'black', }}>Năm 2017:</Text>
                                    <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', }}>
                                        {this.renderStudent2017School()}
                                    </Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('ListViewFilter', {
                                    ID: 2016,
                                    SchoolID: IDNganhDangXem,
                                    SchoolName: this.state.Name,
                                })
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginLeft: 20, color: 'black', }}>Năm 2016:</Text>
                                    <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', }}>
                                        {this.renderStudent2016School()}
                                    </Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('ListViewFilter', {
                                    ID: 2015,
                                    SchoolID: IDNganhDangXem,
                                    SchoolName: this.state.Name,
                                })
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginLeft: 20, color: 'black', }}>Năm 2015:</Text>
                                    <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', }}>
                                        {this.renderStudent2015School()}
                                    </Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('ListViewFilter', {
                                    ID: 2014,
                                    SchoolID: IDNganhDangXem,
                                    SchoolName: this.state.Name,
                                })
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginLeft: 20, color: 'black', }}>Năm 2014:</Text>
                                    <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', }}>
                                        {this.renderStudent2014School()}
                                    </Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('ListViewFilter', {
                                    ID: 2013,
                                    SchoolID: IDNganhDangXem,
                                    SchoolName: this.state.Name,
                                })
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginLeft: 20, color: 'black', }}>Năm 2013:</Text>
                                    <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', }}>
                                        {this.renderStudent2013School()}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                        <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  TÌM VIỆC LÀM Ở ĐÂU</Text>
                        <Text style={{ marginLeft: 20, color: 'black', marginRight: 20 }}>
                            {this.state.FindJob}
                        </Text>
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