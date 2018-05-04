import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput,
  Picker,
  ScrollView,
  Dimensions,
  Share
} from 'react-native';

import WorkGroup from '../HomeScreen/WorkGroup';
import { db } from 'MolisaApp/App';
var IDTruongDangXem = -1;
export default class Registration extends Component {
  static navigationOptions = {
    tabBarLabel: 'Đăng ký',
    showIcon: true,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('MolisaApp/Image/dangKy.png')}
        style={[{ tintColor: tintColor, width: 18, height: 18 }]}
      />
    ),
  };

  constructor(props) {
    super(props);

    this.state = {
      Name: '',
      selectedS: 'Chọn',
      JobArray: [],

      NameFeedback: '',
      PhoneFeedback: '',
      EmailFeedback: '',
      AddressFeedback: '',
      ContentFeedback: '',
    };
  }


 

  renderItems() {
    items = [];
    for (let item of this.state.JobArray) {
      items.push(<Picker.Item key={item.JobName} label={item.JobName} value={item.JobName} />)
    }
    return items;
  }

  queryDataJob = () => {
    var arrs = [];
    var sql = 'select Name from Tbl_Job inner join Tbl_SchoolJob on (Tbl_Job.JobID = Tbl_SchoolJob.JobID) and (Tbl_SchoolJob.SchoolID = ?)';
    db.transaction((tx) => {
      tx.executeSql(sql, [IDTruongDangXem], (tx, results) => {
        for (var i = 0; i < results.rows.length; i++) {
          var row = results.rows.item(i);
          arrs.push(row)
        }
        this.setState({ JobArray: arrs })
      });
    });
  }


  queryData = () => {
    // var arrs = []
    db.transaction((tx) => {
      tx.executeSql('select Name from Tbl_School where SchoolID = ?', [IDTruongDangXem], (tx, results) => {
        var row = results.rows.item(0);
        this.setState({
          Name: row.Name,
        });
      });
    });
  }
  UNSAFE_componentWillMount() {
    IDTruongDangXem = WorkGroup.getTdx();
    this.queryData();
    //    this.queryDataJob();

  }

  ShareMessage = () => {
    Share.share(
      {
        // message: this.state.TextInputValueHolder.toString()
        message: this.state.Name + '\nhttp://gdnn.gov.vn/'
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
  }

  render() {
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

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 3, }}>
              <Text style={{ fontWeight: 'bold', color: '#ecaa45', marginLeft: 20 }}>{'\n'}ĐĂNG KÝ THÔNG TIN TƯ VẤN</Text>
            </View>
            <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-end', marginTop: 15 }} onPress={this.ShareMessage}>
              <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <Image source={require('MolisaApp/Image/chiaSe.png')}
                  style={{ width: 25, height: 25 }} />
                <Text style={{ color: '#1299bb', marginBottom: 15, fontSize: 13, marginLeft: 3, }}>Chia sẻ</Text>
              </View>
            </TouchableOpacity>
          </View>
          
        
          <View style={{}}>
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Họ và tên'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              returnKeyType="next"
              onSubmitEditing={() => this.NextText1.focus()}
            />
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Số điện thoại'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              returnKeyType="next"
              ref={(input) => this.NextText1 = input}
              onSubmitEditing={() => this.NextText2.focus()}
            />
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Email'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              returnKeyType="next"
              ref={(input) => this.NextText2 = input}
              onSubmitEditing={() => this.NextText3.focus()}
            />
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Địa chỉ'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              returnKeyType="next"
              ref={(input) => this.NextText3 = input}
              onSubmitEditing={() => this.NextText4.focus()}
            />
   
            <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#78787a', marginLeft: 40, marginRight: 40, }}>
              <Text style = {{paddingBottom: 10, paddingTop: 10, marginLeft: 6}}>{this.state.Name}</Text>
            </View>
            
            <View style={{ marginTop: 10, borderWidth: 1, borderColor: '#78787a', marginLeft: 40, marginRight: 40, }}>
              <Text style = {{paddingBottom: 10, paddingTop: 10, marginLeft: 6}}>{this.state.NameSchool}</Text>
            </View>
     
            <TextInput
              underlineColorAndroid='transparent'
              multiline={true}
              placeholder='Yêu cầu'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.inputComment}
              returnKeyType="go"
              ref={(input) => this.NextText4 = input}
            />
            <TouchableOpacity onPress={() => { }} style={{ backgroundColor: 'rgb(0, 161, 199)', width: 75, height: 35, marginTop: 10, marginBottom: 5, alignSelf: 'flex-end', marginRight: 40, borderRadius: 3, }}>
              <Text style={{ fontSize: 15, color: 'white', marginLeft: 15, marginTop: 7 }}>Gửi đi</Text>
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
    //  justifyContent: 'center',

  },
  textTitle: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  input: {
    marginLeft: 40,
    marginRight: 40,
    height: 40,
    color: 'black',
    borderWidth: 1,
    borderColor: '#78787a',
    paddingHorizontal: 10,
    marginTop: 10
    //backgroundColor: 'rgb(73, 124, 167)',
  },
  inputComment: {
    marginLeft: 40,
    marginRight: 40,
    height: 50,
    //color: 'black',
    borderWidth: 1,
    borderColor: '#78787a',
    paddingHorizontal: 10,
    marginTop: 10,
    //backgroundColor: 'rgb(73, 124, 167)',
  },
  inputComment2: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    height: 150,
    color: 'black',
    borderWidth: 1,
    borderColor: '#78787a',

  }
})