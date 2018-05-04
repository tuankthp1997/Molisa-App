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
  Dimensions,
  Share
} from 'react-native';
import WorkGroup from '../HomeScreen/WorkGroup';
import {db} from 'MolisaApp/App';
var IDTruongDangXem = '-1';
export default class Infomation extends Component {
  static navigationOptions = {
    title: 'Thông tin',
    showIcon: true,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('MolisaApp/Image/thongTin.png')}
        style={[{ tintColor: tintColor, width: 23, height: 23 }]}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Add: '',
      Code: '',
      Telephone: '',
      Mail: '',
      infomation: '',
      Managers: '', TypeManager: '', Establish: '',DateEstablish: '', Promulgator: '',
      EducationActivityNum: '', EducationActivityDate: '', EducationActivityAddress: '',
      // TextInputValueHolder: ''
    };
  }

  ShareMessage = () => {
    Share.share(
      {
        // message: this.state.TextInputValueHolder.toString()
        message: this.state.Name   + '\nhttp://gdnn.gov.vn/'
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
  }
  
  queryData = () => {
    db.transaction((tx) => {
      tx.executeSql('select Name,Code, Street, Commune, Province, Telephone1, Telephone2, Email,Information,TypeManager, Managers, Establish,Promulgator, EducationActivityNum, EducationActivityDate, EducationActivityAddress  from Tbl_School where SchoolID = ?', [IDTruongDangXem], (tx, results) => {
        var row = results.rows.item(0);
        this.setState({
          Name: row.Name,
          Code: row.Code,
          Add: row.Street + ', ' + row.Commune + ', ' + row.Province,
          Telephone: row.Telephone1 + ' / ' + row.Telephone2,
          Mail: row.Email,
          infomation: row.Information,
          TypeManager: row.TypeManager,
          Managers: row.Managers,
          Establish: row.Establish,
          DateEstablish: row.DateEstablish,
          Promulgator: row.Promulgator,
          EducationActivityNum: row.EducationActivityNum,
          EducationActivityDate: row.EducationActivityDate,
          EducationActivityAddress: row.EducationActivityAddress
        });
      });
    });
  }

  CheckStringNull = (x) => {
    if (x == null) return 'Đang cập nhật';
      else return x;
  }

  UNSAFE_componentWillMount() {
    IDTruongDangXem = WorkGroup.getTdx();
    this.queryData();
  }

  render() {
    const { params } = this.props.navigation.state;
    var {width} = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <ScrollView>
        <TouchableOpacity onPress={() => {WorkGroup.setTdx(-1), WorkGroup.setTdx(-1),  this.props.navigation.navigate('Screen1') }}>
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
          <TouchableOpacity onPress={() => { this.props.navigation.goBack(null) }} style={{ backgroundColor: 'rgb(0, 161, 199)', width: width}}>
            <Text style={{fontWeight: 'bold', fontSize: 14, color: 'white', alignSelf: 'center', marginTop: 6, marginBottom: 6, marginLeft: 15 }}>←   {this.state.Name.toUpperCase()}</Text>
          </TouchableOpacity>

          <View style={{}}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 3, fontWeight: 'bold', color: '#1299bb', fontSize: 15 }}> {'\n'}  GIỚI THIỆU</Text>
              <TouchableOpacity style={{flex: 1, alignSelf: 'flex-end'}} onPress = {this.ShareMessage}>
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <Image source={require('MolisaApp/Image/chiaSe.png')}
                    style={{ width: 25, height: 25 }} />
                  <Text style={{ color: '#1299bb', marginTop: 3, fontSize: 13, marginLeft: 3,}}>Chia sẻ</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ color: '#0a0a0a', fontWeight: 'bold', marginLeft: 20, marginRight: 20 }}>{'\n'}Địa chỉ: {this.CheckStringNull(this.state.Add)}</Text>
              <Text style={{ color: '#0a0a0a', fontWeight: 'bold', marginLeft: 20, marginRight: 20 }}>Mã trường: {this.CheckStringNull(this.state.Code)}</Text>
              <Text style={{ color: '#0a0a0a', fontWeight: 'bold', marginLeft: 20, marginRight: 20 }}>Điện thoại: {this.CheckStringNull(this.state.Telephone)}</Text>
              <Text style={{ color: '#0a0a0a', fontWeight: 'bold', marginLeft: 20, marginRight: 20 }}>Mail: {this.CheckStringNull(this.state.Mail)} {'\n'}</Text>
              <Text style={{fontWeight: 'bold', color: '#1299bb', fontSize: 15 }}> {'\n'}  THÔNG TIN CHUNG</Text>
              <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>{this.CheckStringNull(this.state.infomation)}</Text>
              <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>- Cấp quản lý: {this.CheckStringNull(this.state.ManagersAdd)}</Text>
              <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>- Loại hình quản lý: {this.CheckStringNull(this.state.TypeManager)}</Text>
              <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>- Quyết định thành lập số: {this.CheckStringNull(this.state.Establish)}</Text>
              <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>- Ngày ban hành Quyết định: {this.CheckStringNull(this.state.DateEstablish)}</Text>
              <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>- Đơn vị ban hành quyết định: {this.CheckStringNull(this.state.Promulgator)}</Text>
              <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>- Đăng ký hoạt động giáo dục nghề nghiệp số: {this.CheckStringNull(this.state.EducationActivityNum)}</Text>
              <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>- Ngày cấp: {this.CheckStringNull(this.state.EducationActivityDate)}</Text>
              <Text style={{ color: '#0a0a0a', marginLeft: 20, marginRight: 20 }}>- Nơi cấp: {this.CheckStringNull(this.state.EducationActivityAddress)}</Text>
            </View>
            <View>
   
              
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
    //alignItems: 'center',
  },
})