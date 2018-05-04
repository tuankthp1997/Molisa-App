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
  Share
} from 'react-native';
import WorkGroup from '../HomeScreen/WorkGroup';
import {db} from 'MolisaApp/App';
var IDTruongDangXem = '';
export default class Contact extends Component {
  static navigationOptions = {
    title: 'Liên hệ',
    showIcon: true,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('MolisaApp/Image/lienHe.png')}
        style={[{ tintColor: tintColor, width: 23, height: 23 }]}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Add: '',
      Telephone: '',
      Mail: '',
      infomation: '',
    };
  }

  ShareMessage = () => {
    Share.share(
      {
        // message: this.state.TextInputValueHolder.toString()
        message: this.state.Name + '\nhttp://gdnn.gov.vn/'
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
  }

  queryData = () => {
    // var arrs = []
    db.transaction((tx) => {
      tx.executeSql('select Name, Street, Commune, Province, Telephone1, Telephone2 , Email, Information  from Tbl_School where SchoolID = ?', [IDTruongDangXem], (tx, results) => {
        var row = results.rows.item(0);
        this.setState({
          Name: row.Name,
          Add: row.Street + ', ' + row.Commune + ', ' + row.Province,
          Telephone: row.Telephone1 + ' / ' + row.Telephone2,
          Mail: row.Email,
          infomation: row.Information,
        });
      });
    });

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
      <TouchableOpacity onPress={() => { WorkGroup.setTdx(-1), WorkGroup.setTdx(-1),  this.props.navigation.navigate('Screen1') }}>
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
            <Text style={{ flex: 3, fontWeight: 'bold', color: '#1299bb', fontSize: 15, marginLeft: 2 }}> {'\n'}  LIÊN HỆ </Text>
            <TouchableOpacity style={{flex: 1, alignSelf: 'flex-end'}} onPress = {this.ShareMessage}>
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <Image source={require('MolisaApp/Image/chiaSe.png')}
                    style={{ width: 25, height: 25 }} />
                  <Text style={{ color: '#1299bb', marginTop: 3, fontSize: 13, marginLeft: 3,}}>Chia sẻ</Text>
                </View>
              </TouchableOpacity>
          </View>
          <Text style={{ color: '#0a0a0a', fontWeight: 'bold', marginLeft: 20 }}>{'\n'}Địa chỉ: {this.state.Add}</Text>
          <Text style={{ color: '#0a0a0a', fontWeight: 'bold', marginLeft: 20  }}>Điện thoại: {this.state.Telephone}</Text>
          <Text style={{ color: '#0a0a0a', fontWeight: 'bold', marginLeft: 20  }}>Mail: {this.state.Mail} {'\n'}</Text>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'flex-start',

  },
})