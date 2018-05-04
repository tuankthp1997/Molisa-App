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
  Dimensions,
  WebView,
  Share
} from 'react-native';
import WorkGroup from '../HomeScreen/WorkGroup';
import { db } from 'MolisaApp/App';
var IDNganhDangXem = -1;
var IDTruongDangXem = -1;
export default class Information extends Component {
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
      NameSchool: '',
      CollegeCode: '',
      SecondaryCode: '',
      usefulLinksJob: '',
      usefulVideosJob: '',
      usefulImageJob: '',
      usefulLinksSchool: '',
      usefulVideosSchool: '',
      usefulImageSchool: '',
    };
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


  queryData = () => {
    db.transaction((tx) => {
      tx.executeSql('select Name, CollegeCode, SecondaryCode, usefulLinks, usefulVideos, usefulImage from Tbl_Job where JobID = ?', [IDNganhDangXem], (tx, results) => {
        var row = results.rows.item(0);
        this.setState({
          Name: row.Name,
          CollegeCode: row.CollegeCode,
          SecondaryCode: row.SecondaryCode,
          usefulLinksJob: row.usefulLinks,
          usefulVideosJob: row.usefulVideos,
          usefulImageJob: row.usefulImage,
        });
      });
    });
  }

  queryDataSchool = () => {
    if (IDTruongDangXem != -1) {
      db.transaction((tx) => {
        tx.executeSql('select usefulLinks, usefulVideos, usefulImage from Tbl_SchoolJob where SchoolID = ? and JobID = ?', [IDTruongDangXem, IDNganhDangXem], (tx, results) => {
          var row = results.rows.item(0);
          this.setState({
            usefulLinksSchool: row.usefulLinks,
            usefulVideosSchool: row.usefulVideos,
            usefulImageSchool: row.usefulImage,
          });
        });
      });
    }
  }

  renderTrinhDoDaoTao = () => {
    if (this.state.CollegeCode != '' && this.state.SecondaryCode != '')
      return (
        <Text style={{ flex: 1, color: 'black', marginRight: 10, fontWeight: 'bold', fontSize: 12 }}>Cao Đẳng, Trung Cấp</Text>
      ); else
      if (this.state.CollegeCode != '')
        return (
          <Text style={{ flex: 1, color: 'black', marginRight: 10, fontWeight: 'bold', fontSize: 12 }}>Cao Đẳng</Text>
        ); else
        return (
          <Text style={{ flex: 1, color: 'black', marginRight: 10, fontWeight: 'bold', fontSize: 12 }}>Trung Cấp</Text>
        );
  }

  UNSAFE_componentWillMount() {
    IDNganhDangXem = WorkGroup.getNdx();
    IDTruongDangXem = WorkGroup.getTdx();
    this.queryData();
    this.queryDataSchool();
  }
  ShareMessage = () => {
    Share.share(
      {
        // message: this.state.TextInputValueHolder.toString()
        message: this.state.Name + ',' + this.state.NameSchool + '\nhttp://gdnn.gov.vn/'
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
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
          {this.printNameSchool()}
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 3, fontWeight: 'bold', color: '#1299bb', marginLeft: 8 }}>{'\n'}THÔNG TIN NGÀNH/ NGHỀ ĐÀO TẠO</Text>
            <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-end', marginTop: 10 }} onPress={this.ShareMessage}>
              <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <Image source={require('MolisaApp/Image/chiaSe.png')}
                  style={{ width: 25, height: 25 }} />
                <Text style={{ color: '#1299bb', marginTop: 3, fontSize: 13, marginLeft: 3, }}>Chia sẻ</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ flex: 1, marginLeft: 20, color: 'black', fontSize: 12 }}>Ngành/ nghề đào tạo: </Text>
            <Text style={{ flex: 1, color: 'black', marginRight: 10, fontWeight: 'bold', fontSize: 12 }}>{this.state.Name.toUpperCase()}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, marginLeft: 20, color: 'black', fontSize: 12 }}>Mã ngành Cao Đẳng: </Text>
            <Text style={{ flex: 1, color: 'black', marginRight: 10, fontWeight: 'bold', fontSize: 12 }}>{this.state.CollegeCode}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, marginLeft: 20, color: 'black', fontSize: 12 }}>Mã ngành Trung Cấp: </Text>
            <Text style={{ flex: 1, color: 'black', marginRight: 10, fontWeight: 'bold', fontSize: 12 }}>{this.state.SecondaryCode}</Text>
          </View>
          {/* <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, marginLeft: 20, color: 'black', fontSize: 12 }}>Trình độ đào tạo: </Text>
            {this.renderTrinhDoDaoTao()}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, marginLeft: 20, color: 'black', fontSize: 12 }}>Quy mô đào tạo: </Text>
            {this.renderTrinhDoDaoTao()}
          </View>
          <View style={{ flexDirection: 'row' }}> 
            <Text style={{ flex: 1, marginLeft: 20, color: 'black', fontSize: 12 }}>Hình thức tuyển sinh: </Text>
            <Text style={{ flex: 1, color: 'black', marginRight: 10, fontWeight: 'bold', fontSize: 12 }}>Thi tuyển</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, marginLeft: 20, color: 'black', fontSize: 12 }}>Dự báo nhu cầu nhân lực: </Text>
            <Text style={{ flex: 1, color: 'black', marginRight: 10, fontWeight: 'bold', fontSize: 12 }}>Phát triển</Text>
          </View> */}
          <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  LIÊN KẾT HỮU ÍCH </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Screen4', {
                url: this.state.usefulLinksJob,
              })
            }} >
            <Text style={{ marginLeft: 20, marginRight: 20, marginBottom: 2 }}>Xem chi tiết ngành >></Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Screen4', {
                url: this.state.usefulLinksSchool,
              })
            }} >
            <Text style={{ marginLeft: 20, marginRight: 20, marginBottom: 2 }}>Xem chi tiết trường >></Text>
          </TouchableOpacity>

          <View>
            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  VIDEO VÀ HÌNH ẢNH HỮU ÍCH TỔNG CỤC</Text>
            <Image
              source={{ uri: this.state.usefulImageJob }}
              style={{ marginTop: 5, alignSelf: 'center', height: 200, width: 300 }}
            />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Screen4', {
                  url: this.state.usefulVideosJob,
                })
              }} >
              <Text style={{ marginLeft: 20, marginRight: 20, marginBottom: 2 }}>Xem chi tiết >></Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ fontWeight: 'bold', color: '#1299bb', fontSize: 13, marginLeft: 2 }}> {'\n'}  VIDEO VÀ HÌNH ẢNH HỮU ÍCH CỦA TRƯỜNG</Text>
            <Image
              source={{ uri: this.state.usefulImageSchool }}
              style={{ marginTop: 5, alignSelf: 'center', height: 200, width: 300 }}
            />
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Screen4', {
                  url: this.state.usefulVideosSchool,
                })
              }} >
              <Text style={{ marginLeft: 20, marginRight: 20, marginBottom: 2 }}>Xem chi tiết >></Text>
            </TouchableOpacity>
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
  },
})