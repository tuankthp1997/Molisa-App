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

import { db } from 'MolisaApp/App';

var IDNganhDangXem = -1;
var IDTruongDangXem = -1;
import WorkGroup from '../HomeScreen/WorkGroup';
export default class DaoTao extends Component {

  static navigationOptions = {
    title: 'Đào Tạo',
    showIcon: true,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('MolisaApp/Image/daoTao.png')}
        style={[{ tintColor: tintColor, width: 23, height: 23 }]}
      />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      Name: '',
      NameSchool: '',
      Module: '',
      Requirement: '',
      Standard: '',
      Diploma: '',
      Coincidence: '',
      SecondaryCourseCost: '',
      ModuleSchool: '',
      RequirementSchool: '',
      StandardSchool: '',
      CoincidenceSchoool: '',
      DiplomaSchool: '',
      SchoolsArray: [
        { SchoolID: '', Name: '' }],
      CollegeMonthlyCostSchool: '',
      CollegeCourseCostSchool: '',
      SecondaryMonthlyCostSchool: '',
      SecondaryCourseCostSchool: '',
    };
  }

  clickJob = (ID) => {
    WorkGroup.setTdx(ID);
    this.props.navigation.navigate('Screen3', {
    });
  }

  queryNameSchool = () => {
    if (IDTruongDangXem != -1) {
      db.transaction((tx) => {
        tx.executeSql('select Name from Tbl_School where SchoolID = ?', [IDTruongDangXem], (tx, results) => {
          if ( results.rows.length != 0) {
          var row = results.rows.item(0);
          this.setState({
            NameSchool: row.Name,
          });
        }
        });
      });
    }
  }

  printNameSchool = () => {
    if (IDTruongDangXem != -1) {

        return (
          <TouchableOpacity 
                onPress = {()=>{
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
  printSchool = () => {
    if (IDTruongDangXem != -1) {
      return (
        <View>
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}>{'\n'}  CHI PHÍ ĐÀO TẠO {this.state.NameSchool.toUpperCase()}</Text>
          <View>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('ListViewFilter', {
                ID: 1,
                SchoolID: IDNganhDangXem,
                SchoolName: this.state.Name,
              });
            }}>
              <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                <Text style={{ marginLeft: 20, color: 'black', flex:2 }}>Trình độ Cao Đẳng / 1 tháng:</Text>
                <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', flex: 1.5 }}>
                  {this.checkChiPhiDaoTaoNull(this.state.CollegeMonthlyCostSchool)}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('ListViewFilter', {
                ID: 2,
                SchoolID: IDNganhDangXem,
                SchoolName: this.state.Name,
              });
            }}>
              <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                <Text style={{ marginLeft: 20, color: 'black', flex:2 }}>Chi phí cho cả khóa học:</Text>
                <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', flex:1.5}}>
                  {this.checkChiPhiDaoTaoNull(this.state.CollegeCourseCostSchool)}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('ListViewFilter', {
                ID: 3,
                SchoolID: IDNganhDangXem,
                SchoolName: this.state.Name,
              });
            }}>
              <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                <Text style={{ marginLeft: 20, color: 'black', flex:2 }}>Trình độ Trung Cấp / 1 tháng:</Text>
                <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', flex:1.5 }}>
                  {this.checkChiPhiDaoTaoNull(this.state.SecondaryMonthlyCostSchool)}

                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('ListViewFilter', {
                ID: 4,
                SchoolID: IDNganhDangXem,
                SchoolName: this.state.Name,
              });
            }}>
              <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                <Text style={{ marginLeft: 20, color: 'black', flex:2 }}>Chi phí cho cả khóa học:</Text>
                <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', flex:1.5}}>
                  {this.checkChiPhiDaoTaoNull(this.state.SecondaryCourseCostSchool)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )
    } return null;
  }
  renderSchool = (item) => {
    if (item != null && item.Name != '')
      return (
        <View>
          <TouchableOpacity
            style={{ height: 30, marginTop: 10, marginBottom: 3, borderColor: '#c5c5c5', borderBottomWidth: 1, marginLeft: 20, marginRight: 30 }}
            onPress={() => { this.clickJob(item.SchoolID) }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 2, fontSize: 11, color: 'rgb(13, 157, 186)', flex: 10 }}>{item.Name.toUpperCase()}</Text>
              <Image
                source={require('MolisaApp/Image/muiTenNgang.png')}
                style={{ height: 13, }} />
            </View>
          </TouchableOpacity>
        </View>
      )
    else return null;
  }

  queryData = () => {
    db.transaction((tx) => {
      tx.executeSql('select Name, Module, Requirement, Standard, Coincidence, Diploma, CollegeMonthlyCost, CollegeCourseCost, SecondaryMonthlyCost, SecondaryCourseCost from Tbl_Job where JobID = ?', [IDNganhDangXem], (tx, results) => {
        if (results.rows.length != 0) {
        var row = results.rows.item(0);
        this.setState({
          Name: row.Name,
          Module: row.Module,
          Requirement: row.Requirement,
          Standard: row.Standard,
          Coincidence: row.Coincidence,
          Diploma: row.Diploma,
          CollegeMonthlyCost: row.CollegeMonthlyCost, // Chi phi dao tao TRUNG BINH cua Trung Cap / thang
          CollegeCourseCost: row.CollegeCourseCost,
          SecondaryMonthlyCost: row.SecondaryMonthlyCost,
          SecondaryCourseCost: row.SecondaryCourseCost,
        });
      }
      });
    });
  }

  queryDataJob = () => {
    var arrs = [];
    db.transaction((tx) => {
      tx.executeSql('select Tbl_School.SchoolID, Tbl_School.Name from Tbl_School inner join Tbl_SchoolJob on (Tbl_School.SchoolID = Tbl_SchoolJob.SchoolID and Tbl_SchoolJob.JobID = ?)', [IDNganhDangXem], (tx, results) => {
        for (var i = 0; i < results.rows.length; i++) {
          var row = results.rows.item(i);
          arrs.push(row);
        }
        this.setState({
          SchoolsArray: arrs
        })
      });
    });
  }


  queryDataSchool = () => {        // Query data theo ID truong, mo ta nghe theo tung truong
    if (IDTruongDangXem != -1) {
    db.transaction((tx) => {
      tx.executeSql('select Module, Requirement, Standard, Coincidence, Diploma, CollegeMonthlyCost, CollegeCourseCost, SecondaryMonthlyCost, SecondaryCourseCost from Tbl_SchoolJob where (Tbl_SchoolJob.SchoolID = ? and Tbl_SchoolJob.JobID = ?)', [IDTruongDangXem, IDNganhDangXem], (tx, results) => {
        if (results.rows.length != 0) {
        var row = results.rows.item(0);
        this.setState({
          ModuleSchool: row.Module,
          RequirementSchool: row.Requirement,
          StandardSchool: row.Standard,
          CoincidenceSchoool: row.Coincidence,
          DiplomaSchool: row.Diploma,
          CollegeMonthlyCostSchool: row.CollegeMonthlyCost,
          CollegeCourseCostSchool: row.CollegeCourseCost,
          SecondaryMonthlyCostSchool: row.SecondaryMonthlyCost,
          SecondaryCourseCostSchool: row.SecondaryCourseCost,
        });
      }
      });
    });
  }
  }

  ConvertStringToMoney = (x) => {
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
    return intPart + decimalPart;
  }


  checkChiPhiDaoTaoNull = (x) => {
    if (x === 0) { return 'Đang cập nhật' }
    else {
      return this.ConvertStringToMoney(Math.round(x)) + ' VNĐ';
    }
  }

  renderModule = () => {
    if (this.state.Module == '' && this.state.ModuleSchool == '') {

      return (
        <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
      )
    } else {
      if (this.state.Module != '') {
        return (
          <View>
            {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin tổng cục</Text> */}
            <Text style={{ marginLeft: 30, color: 'black', marginRight: 20 }}>
              {this.state.Module}
            </Text>
          </View>
        );
      }
      else return null;
    }
  }
  renderModuleSchool = () => {
    if (this.state.ModuleSchool != '' && this.state.Module == '') {
      return (
        <View>
          {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin từ trường</Text> */}
          <Text style={{ marginLeft: 30, color: 'black', marginRight: 20 }}>
            {this.state.ModuleSchool}
          </Text>
        </View>
      );
    }
    else return null;
  }

  renderRequirement = () => {
    if (this.state.Requirement == '' && this.state.RequirementSchool == '') {
      return (
        <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
      )
    } else {
      if (this.state.Requirement != '') {
        return (
          <View>
            {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin tổng cục</Text> */}
            <Text style={{ marginLeft: 30, color: 'black', marginRight: 20 }}>
              {this.state.Requirement}
            </Text>
          </View>
        );
      }
      else return null;
    }
  }
  renderRequirementSchool = () => {
    if (this.state.RequirementSchool != '' && this.state.Requirement == '') {
      return (
        <View>
          {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin từ trường</Text> */}
          <Text style={{ marginLeft: 30, color: 'black', marginRight: 20 }}>
            {this.state.RequirementSchool}
          </Text>
        </View>
      );
    }
    else return null;
  }

  renderStandard = () => {
    if (this.state.Standard == '' && this.state.StandardSchool == '') {
      return (
        <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
      )
    } else {
      if (this.state.Standard != '') {
        return (
          <View>
            {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin tổng cục</Text> */}
            <Text style={{ marginLeft: 30, color: 'black', marginRight: 20 }}>
              {this.state.Standard}
            </Text>
          </View>
        );
      }
      else return null;
    }
  }
  renderStandardSchool = () => {
    if (this.state.StandardSchool != '' && this.state.Standard == '') {
      return (
        <View>
          {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin từ trường</Text> */}
          <Text style={{ marginLeft: 30, color: 'black', marginRight: 20 }}>
            {this.state.StandardSchool}
          </Text>
        </View>
      );
    }
    else return null;
  }

  renderCoincidence = () => {
    if (this.state.Coincidence == '' && this.state.CoincidenceSchoool == '') {
      return (
        <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
      )
    } else {
      if (this.state.Coincidence != '') {
        return (
          <View>
            {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin tổng cục</Text> */}
            <Text style={{ marginLeft: 30, color: 'black', marginRight: 20 }}>
              {this.state.Coincidence}
            </Text>
          </View>
        );
      }
      else return null;
    }
  }
  renderCoincidenceSchoool = () => {
    if (this.state.CoincidenceSchoool != '' && this.state.Coincidence == '') {
      return (
        <View>
          {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin từ trường</Text> */}
          <Text style={{ marginLeft: 30, color: 'black', marginRight: 20 }}>
            {this.state.CoincidenceSchoool}
          </Text>
        </View>
      );
    }
    else return null;
  }

  renderDiploma = () => {

    if (this.state.Diploma == '' && this.state.DiplomaSchool == '') {

      return (
        <Text style={{ marginLeft: 30 }}>Đang cập nhật</Text>
      )
    } else {
      if (this.state.Diploma != '') {
        return (
          <View>
            {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin tổng cục</Text> */}
            <Text style={{ marginLeft: 30, color: 'black', marginRight: 20 }}>
              {this.state.Diploma}
            </Text>
          </View>
        );
      }
      else return null;
    }
  }
  renderDiplomaSchool = () => {
    if (this.state.DiplomaSchool != '' && this.state.Diploma == '') {
      return (
        <View>
          {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', marginLeft: 20 }}>Thông tin từ trường</Text> */}
          <Text style={{ marginLeft: 30, color: 'black', marginRight: 20 }}>
            {this.state.DiplomaSchool}
          </Text>
        </View>
      );
    }
    else return null;
  }

  ShareMessage = () => {
    Share.share(
      {
        // message: this.state.TextInputValueHolder.toString()
        message: this.state.Name + ',' + this.state.NameSchool + '\nhttp://gdnn.gov.vn/'
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
  }

  UNSAFE_componentWillMount() {
    IDNganhDangXem = WorkGroup.getNdx();
    IDTruongDangXem = WorkGroup.getTdx();
    this.queryData();
    this.queryDataJob();
    //this.queryCost();
    if (IDNganhDangXem != -1 && IDTruongDangXem != -1) this.queryDataSchool();
    this.queryNameSchool();
  }

  render() {
    const { params } = this.props.navigation.state;
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

          <View style={{}}>
            <View>
              {this.printNameSchool()}
              <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{flex: 3, fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}>{'\n'}  CÁC MÔĐUN/ MÔN HỌC CHÍNH</Text>
                <TouchableOpacity style={{ flex:1,  marginTop: 10 }} onPress={this.ShareMessage}>
                  <View style={{ flexDirection: 'row'}}>
                    <Image source={require('MolisaApp/Image/chiaSe.png')}
                      style={{ width: 25, height: 25 }} />
                    <Text style={{ color: '#1299bb', marginTop: 3, fontSize: 13, marginLeft: 3, }}>Chia sẻ</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {this.renderModule()}
            {this.renderModuleSchool()}
            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}>{'\n'}  YÊU CẦU ĐỐI VỚI NGƯỜI HỌC </Text>
            {this.renderRequirement()}
            {this.renderRequirementSchool()}
            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}>{'\n'}  YÊU CẦU CHUẨN ĐẦU RA CỦA NGHỀ </Text>
            {this.renderStandard()}
            {this.renderStandardSchool()}
            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}>{'\n'}  AI PHÙ HỢP VỚI NGHỀ </Text>
            {this.renderCoincidence()}
            {this.renderCoincidenceSchoool()}
            {/* <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}>{'\n'}  BẰNG CẤP/ CHỨNG CHỈ CẦN THIẾT ĐỂ LÀM NGHỀ </Text>
            {this.renderDiploma()}
            {this.renderDiplomaSchool()} */}
            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}>{'\n'}  CHI PHÍ ĐÀO TẠO </Text>
            <View>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('ListViewFilter', {
                  ID: 1,
                  SchoolID: IDNganhDangXem,
                  SchoolName: this.state.Name,
                });
              }}>
                <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                  <Text style={{ marginLeft: 20, color: 'black', flex: 2 }}>Trình độ Cao Đẳng / 1 tháng:</Text>
                  <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', flex: 1.5}}>
                    {this.checkChiPhiDaoTaoNull(Math.round(this.state.CollegeMonthlyCost))}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('ListViewFilter', {
                  ID: 2,
                  SchoolID: IDNganhDangXem,
                  SchoolName: this.state.Name,
                });
              }}>
                <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                  <Text style={{ marginLeft: 20, color: 'black', flex:2 }}>Chi phí cho cả khóa học:</Text>
                  <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', flex:1.5 }}>
                    {this.checkChiPhiDaoTaoNull(Math.round(this.state.CollegeCourseCost))}

                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('ListViewFilter', {
                  ID: 3,
                  SchoolID: IDNganhDangXem,
                  SchoolName: this.state.Name,
                });
              }}>
                <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                  <Text style={{ marginLeft: 20, color: 'black', flex: 2 }}>Trình độ Trung Cấp / 1 tháng:</Text>
                  <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', flex:1.5}}>
                    {this.checkChiPhiDaoTaoNull(Math.round(this.state.SecondaryMonthlyCost))}
                  </Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('ListViewFilter', {
                  ID: 4,
                  SchoolID: IDNganhDangXem,
                  SchoolName: this.state.Name,
                });
              }}>
                <View style={{ flexDirection: 'row', marginLeft: 10, }}>
                  <Text style={{ marginLeft: 20, color: 'black', flex:2}}>Chi phí cho cả khóa học:</Text>
                  <Text style={{ marginLeft: 5, color: 'purple', fontWeight: 'bold', flex:1.5}}>
                    {this.checkChiPhiDaoTaoNull(Math.round(this.state.SecondaryCourseCost))}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {this.printSchool()}
          </View>
          <Text style={{ fontWeight: 'bold', color: '#ecaa45', marginLeft: 8 }}>{'\n'}DANH SÁCH ĐƠN VỊ ĐÀO TẠO</Text>
          {/* <ListView
                dataSource={ds.cloneWithRows(this.state.SchoolsArray)}
                renderRow={this.renderSchool} /> */}
          <FlatList
            data={this.state.SchoolsArray}
            renderItem={({ item }) =>
              this.renderSchool(item)
            } />
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