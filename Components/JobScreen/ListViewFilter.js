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
  Dimensions,
  Share,
  FlatList
} from 'react-native';
import WorkGroup from '../HomeScreen/WorkGroup';
import {db} from 'MolisaApp/App';
var key = '';         // ID cua nghe
var SchoolName = '';
var ID = '';   // ID de phan loai hoc phi theo thang, nam Trung cap, cao dang
var NameSchoolTop1 = '';
var InComeSchoolTop1 = '';
var ChiPhiCaoDangSchoolTop1 = '';
var ChiPhiTrungCapSchoolTop1 = '';
var ProSchoolTop1 = '';
var IDTruongDangXem = ''; // Lay tu man` hinh`MoTa

export default class ListViewFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SchoolCost: [
        { SchoolID: '', Name: '', SecondaryCourseCost: '', SecondaryMonthlyCost: '', CollegeMonthlyCost: '', CollegeCourseCost: '' }
      ],
      SchoolsArray: [
        { SchoolsID: '', Name: '', ChiPhiCaoDangSchool: '',  ChiPhiTrungCapSchool: '', ThuNhap: '', TrienVong: '' }],
      ListOther: [
        { SchoolID: '', Name: '', OpFindJob: '', OpDevelope: '', OpLevelUp: '', Income: '' }],
      StudentNum: [
        { SchoolID: '', Name: '', StudentNum2017: '', StudentNum2016: '', StudentNum2015: '', StudentNum2014: '', StudentNum2013: '', }],
    };
  }

  clickJob = (ID) => {
    WorkGroup.setTdx(ID);
    this.props.navigation.navigate('Screen3', {
    });
  }
 
  queryDataJob = () => {
    var arrs = [];
    var sql = 'select Name, Tbl_School.SchoolID, Tbl_SchoolJob.Income, Tbl_SchoolJob.CollegeMonthlyCost, Tbl_SchoolJob.CollegeCourseCost, Tbl_SchoolJob.SecondaryMonthlyCost,Tbl_SchoolJob.SecondaryCourseCost, Tbl_SchoolJob.Prospects from Tbl_School inner join Tbl_SchoolJob on Tbl_School.SchoolID = Tbl_SchoolJob.SchoolID and Tbl_SchoolJob.JobID = ? where Name != "' + NameSchoolTop1 + '"';
    db.transaction((tx) => {
      tx.executeSql(sql, [key], (tx, results) => {
        for (var i = 0; i < results.rows.length; i++) {
          var row = results.rows.item(i);
          var School = {
            SchoolID: row.SchoolID,
            Name: row.Name,
            ThuNhap: row.Income,
            TrienVong: row.Prospects,
            ChiPhiCaoDangSchool: row.CollegeMonthlyCost,
            ChiPhiTrungCapSchool: row.SecondaryMonthlyCost
          }
          arrs.push(School);
        }
        this.setState({
          SchoolsArray: arrs
        })
      });
    });
  }

  queryCost = () => {
    var arrs = [];
    var sql = 'select Tbl_SchoolJob.SchoolID, Tbl_School.Name, CollegeCourseCost, CollegeMonthlyCost, SecondaryMonthlyCost, SecondaryCourseCost from Tbl_SchoolJob inner join Tbl_School where Tbl_School.SchoolID = Tbl_SchoolJob.SchoolID and JobID = ?';
    db.transaction((tx) => {
      tx.executeSql(sql, [key], (tx, results) => {
        for (var i = 0; i < results.rows.length; i++) {
          var row = results.rows.item(i);
          arrs.push(row);
        }
        this.setState({
          SchoolCost: arrs
        })
      });
    });
  }

  queryOtherData = () => {
    var arrs = [];
    var sql = 'select Tbl_SchoolJob.OpFindJob, Tbl_SchoolJob.OpDevelope, Tbl_SchoolJob.OpLevelUp, Tbl_SchoolJob.Income, Tbl_SchoolJob.SchoolID, Tbl_School.Name from Tbl_SchoolJob inner join Tbl_School where Tbl_School.SchoolID = Tbl_SchoolJob.SchoolID and JobID = ?';
    db.transaction((tx) => {
      tx.executeSql(sql, [key], (tx, results) => {
        for (var i = 0; i < results.rows.length; i++) {
          var row = results.rows.item(i);
          arrs.push(row);
        }
        this.setState({
          ListOther: arrs
        })
      });
    });
  }

  queryStudent = () => {
    var arrs = [];
    var sql = 'select Tbl_School.SchoolID, StudentNum2017, StudentNum2016, StudentNum2015, StudentNum2014, StudentNum2013, Tbl_School.Name from Tbl_SchoolJob inner join Tbl_School where Tbl_School.SchoolID = Tbl_SchoolJob.SchoolID and JobID = ?';
    db.transaction((tx) => {
      tx.executeSql(sql, [key], (tx, results) => {
        for (var i = 0; i < results.rows.length; i++) {
          var row = results.rows.item(i);
          arrs.push(row);
        }
        this.setState({
          StudentNum: arrs
        })
      });
    });
  }
  checkChiPhiDaoTaoNull = (x) => {
    if (x === 0) { return 'Đang cập nhật' }
    else return this.ConvertStringToMoney(Math.round(x)) + ' VNĐ';
  }
  renderSchool = (sc) => {
    if (sc != null && sc.Name != '')
      return (
        <View>
          <TouchableOpacity
            style={{ marginTop: 10, marginBottom: 3, borderColor: '#c5c5c5', borderBottomWidth: 1, marginLeft: 20, marginRight: 20 }}
            onPress={() => { this.clickJob(sc.SchoolID) }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 2, fontSize: 14, color: 'rgb(13, 157, 186)', }}>{sc.Name.toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Thu Nhập: {this.StringThuNhapSchool(sc.ThuNhap)}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Học phí Cao Đẳng/ tháng: {this.ConvertStringToMoney(Math.round(sc.ChiPhiCaoDangSchool))}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Học phí Trung Cấp/ tháng: {this.ConvertStringToMoney(Math.round(sc.ChiPhiTrungCapSchool))}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Cơ hội: {this.StringCoHoiPhatTrienViecLam(sc.TrienVong)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    return null;
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


  StringCoHoiViecLamSauTotNghiep = (x) => {
    if (x == 0) return 'Đang cập nhật'; else
    if (x >= 1 && x <= 3) return 'Dễ tìm việc làm'; else
      if (x > 3 && x <= 6) return 'Tương đối dễ tìm việc'; else
        if (x > 6 && x <= 8) return 'Trung bình'; else
          if (x > 8) return 'Khó tìm việc làm';
  }
  StringCoHoiPhatTrienViecLam = (x) => {
    if (x == 0) return 'Đang cập nhật'; else
    if (x >= 1 && x <= 3) return 'Thuận lợi'; else
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
  renderCost1 = (School) => {
    if (School.CollegeMonthlyCost != 0)
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
            <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black', }}>{this.checkChiPhiDaoTaoNull(School.CollegeMonthlyCost)}</Text>
          </View>
        </TouchableOpacity>
      );
    else return null;
  }
  renderCost2 = (School) => {
    if (School.CollegeCourseCost != 0)
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
              <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black', }}>{this.checkChiPhiDaoTaoNull(School.CollegeCourseCost)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    else return null;
  }
  renderCost3 = (School) => {
    if (School.SecondaryMonthlyCost != 0)
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
              <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black', }}>{this.checkChiPhiDaoTaoNull(School.SecondaryMonthlyCost)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    else return null;
  }
  renderCost4 = (School) => {
    if (School.SecondaryCourseCost != 0)
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
              <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black', }}>{this.checkChiPhiDaoTaoNull(School.SecondaryCourseCost)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    else return null;
  }
  renderOpFindJob = (School) => {
    if (School.OpFindJob != 0)
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
              <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black', }}>{this.StringCoHoiViecLamSauTotNghiep(School.OpFindJob)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    else return null;
  }
  renderOpDevelope = (School) => {
    if (School.OpDevelope != 0)
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
              <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black', }}>{this.StringCoHoiPhatTrienViecLam(School.OpDevelope)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    else return null;
  }
  renderOpLevelUp = (School) => {
    if (School.OpLevelUp != 0)
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
              <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black', }}>{this.StringCoHoiPhatTrienViecLam(School.OpLevelUp)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    else return null;
  }
  renderIncome = (School) => {
    if (School.Income != 0)
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
              <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black', }}>{this.StringThuNhapSchool(School.Income)}</Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    else return null;
  }
  renderStudentNum2017 = (School) => {
    if (School.StudentNum2017 != 0) {
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
            <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black' }}>{School.StudentNum2017} sinh viên</Text>
          </View>
        </TouchableOpacity>

      );
    } else return null;
  }
  renderStudentNum2016 = (School) => {
    if (School.StudentNum2016 != 0) {
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
            <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black' }}>{School.StudentNum2016} sinh viên</Text>
          </View>
        </TouchableOpacity>

      );
    } else return null;
  }
  renderStudentNum2015 = (School) => {
    if (School.StudentNum2015 != 0) {
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
            <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black' }}>{School.StudentNum2015} sinh viên</Text>
          </View>
        </TouchableOpacity>

      );
    } else return null;
  }
  renderStudentNum2014 = (School) => {
    if (School.StudentNum2014 != 0) {
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
            <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black' }}>{School.StudentNum2014} sinh viên</Text>
          </View>
        </TouchableOpacity>

      );
    } else return null;
  }
  renderStudentNum2013 = (School) => {
    if (School.StudentNum2013 != 0) {
      return (
        <TouchableOpacity onPress={() => { this.clickJob(School.SchoolID) }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 2, marginLeft: 20, fontWeight: 'bold', fontSize: 13, color: 'rgb(13, 157, 186)', }}>{School.Name.toUpperCase()}</Text>
            <Text style={{ flex: 1, marginLeft: 11, fontWeight: 'bold', fontSize: 13, color: 'black' }}>{School.StudentNum2013} sinh viên</Text>
          </View>
        </TouchableOpacity>

      );
    } else return null;
  }

  ViewSchoolTop1 = () => {
    if (NameSchoolTop1 != null ) {
      return (
        <View>
          <TouchableOpacity
            style={{ marginTop: 10, marginBottom: 3, borderColor: '#c5c5c5', borderBottomWidth: 1, marginLeft: 20, marginRight: 20 }}
            onPress={() => { this.clickJob(IDTruongDangXem) }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 2, fontSize: 14, color: 'rgb(13, 157, 186)', }}>{NameSchoolTop1.toUpperCase()}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Thu Nhập: {this.StringThuNhapSchool(InComeSchoolTop1)}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Học phí Cao Đẳng/ tháng: {this.ConvertStringToMoney(Math.round(ChiPhiCaoDangSchoolTop1))}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Học phí Trung Cấp/ tháng: {this.ConvertStringToMoney(Math.round(ChiPhiTrungCapSchoolTop1))}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
              <Text style={{ marginLeft: 10, fontSize: 13, color: 'black', }}>Cơ hội: {this.StringCoHoiPhatTrienViecLam(ProSchoolTop1)}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )
    }
    else return null;
  }

  Filter = (x) => {
    if (x == 1) {     // Chi phi thu nhap / thang cao dang
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.SchoolCost}
            renderItem={({ item }) =>
              this.renderCost1(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )
    }
    if (x == 2) {     // Chi phi thu nhap nam cao dang
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.SchoolCost}
            renderItem={({ item }) =>
              this.renderCost2(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )

    }
    if (x == 3) {         // Chi phi thu nhap / thang trung cap
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.SchoolCost}
            renderItem={({ item }) =>
              this.renderCost3(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )
    }
    if (x == 4) {     // Chi phi thu nhap nam trung cap
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.SchoolCost}
            renderItem={({ item }) =>
              this.renderCost4(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )
    }
    if (x == 5) {     // View thu nhap, hoc phi, co hoi
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          {this.ViewSchoolTop1()}
          <FlatList
            data={this.state.SchoolsArray}
            renderItem={({ item }) =>
              this.renderSchool(item)
            } />
        </View>
      )
    }
    if (x == 6) {
      return (       // Co Hoi Viec Lam Sau Tot Nghiep
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.ListOther}
            renderItem={({ item }) =>
              this.renderOpFindJob(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )

    }
    if (x == 7) {  // Co Hoi Phat Trien Nghe Nghiep, Viec Lam
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.ListOther}
            renderItem={({ item }) =>
              this.renderOpDevelope(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )
    }
    if (x == 8) {    // Co Hoi nang cao trinh do 
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.ListOther}
            renderItem={({ item }) =>
              this.renderOpDevelope(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )
    }
    if (x == 9) { // Thu nhap binh quan
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.ListOther}
            renderItem={({ item }) =>
              this.renderIncome(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )
    }
    if (x == 2017) {      // Thong ke sinh vien nam 2017
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.StudentNum}
            renderItem={({ item }) =>
              this.renderStudentNum2017(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )
    }

    if (x == 2016) {      // Thong ke sinh vien nam 2016
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.StudentNum}
            renderItem={({ item }) =>
              this.renderStudentNum2016(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )
    }

    if (x == 2015) {      // Thong ke sinh vien nam 2015
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.StudentNum}
            renderItem={({ item }) =>
              this.renderStudentNum2015(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )
    }

    if (x == 2014) {      // Thong ke sinh vien nam 2014
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.StudentNum}
            renderItem={({ item }) =>
              this.renderStudentNum2014(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )
    }

    if (x == 2013) {      // Thong ke sinh vien nam 2013
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2, marginBottom: 10 }}>{'\n'}  THỐNG KÊ CHI TIẾT</Text>
          <FlatList
            data={this.state.StudentNum}
            renderItem={({ item }) =>
              this.renderStudentNum2013(item)}
            style={{ marginLeft: 10 }} />
        </View>
      )
    }
  }

  UNSAFE_componentWillMount() {
    const { params } = this.props.navigation.state;
    key = params ? params.SchoolID : null;  
    ID = params ? params.ID : null;
    SchoolName = params ? params.SchoolName : null;  //    this is Jobname
    NameSchoolTop1 = params ? params.NameSchoolTop1 : null;
    IDTruongDangXem = params ? params.IDTruongDangXem : null;
    InComeSchoolTop1 = params ? params.InComeSchoolTop1 : null;
    ChiPhiCaoDangSchoolTop1 = params ? params.ChiPhiCaoDangSchoolTop1 : null;
    ChiPhiTrungCapSchoolTop1 = params ? params.ChiPhiTrungCapSchoolTop1 : null;
    CostSchoolTop1 = params ? params.CostSchoolTop1 : null;
    ProSchoolTop1 = params ? params.ProSchoolTop1 : null;

    this.queryCost();
    this.queryOtherData();
    this.queryStudent();
    this.queryDataJob();
  }

  render() {
    var { width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity onPress={() => { key = '', WorkGroup.setTdx(-1), WorkGroup.setTdx(-1), this.props.navigation.navigate('Screen1') }}>
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
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'white', alignSelf: 'center', marginTop: 6, marginBottom: 6, marginLeft: 15 }}>←   {SchoolName.toUpperCase()}</Text>
          </TouchableOpacity>
          {this.Filter(ID)}
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