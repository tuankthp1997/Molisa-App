import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Picker,
  Item,
  ToastAndroid,
  ScrollView,
  Dimensions,
  Share,
  Alert
} from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogButton,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import WorkGroup from '../HomeScreen/WorkGroup';
import {db} from 'MolisaApp/App';
var imgIncome;
var imgCost;
var imgProspects;
var IDNganhDangXem = -1;
var IDTruongDangXem = -1;
var url = 'http://27.72.28.157:8080';
const scaleAnimation = new ScaleAnimation();
export default class DangKy extends Component {
  static navigationOptions = {
    tabBarLabel: 'Đăng ký',
    showIcon: true,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('MolisaApp/Image/dangKy.png')}
        style={[{ tintColor: tintColor, width: 23, height: 23 }]}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      selectedProvin: '',
      selectedJob: '',
      showDangKy: 500,
      showGopY: 0,
      showTrangThaiViecLam: 0,
      OpacityDangKy: 1,
      OpacityGopY: 1,
      OpacityTrangThaiViecLam: 1,
      onCheckBox1: 20,
      offCheckBox1: 0,
      onCheckBox2: 20,
      offCheckBox2: 0,
      Income: '', // Thu nhap binh quan / thang
      Cost: '',
      Prospects: '',
      SchoolsArray: [
        { Name: 'Thành phố đang cư trú' },
        { Name: "Hà Nội" },
        { Name: "Hải Phòng" },
        { Name: "Bắc Ninh" },
        { Name: "Hà Nam" },
        { Name: "Hải Dương" },
        { Name: "Hưng Yên" },
        { Name: "Nam Định" },
        { Name: "Ninh Bình" },
        { Name: "Thái Bình" },
        { Name: "Vĩnh Phúc" },
        { Name: "Hà Giang" },
        { Name: "Cao Bằng" },
        { Name: "Bắc Kạn" },
        { Name: "Lạng Sơn" },
        { Name: "Tuyên Quang" },
        { Name: "Thái Nguyên" },
        { Name: "Phú Thọ" },
        { Name: " Bắc Giang" },
        { Name: "Quảng Ninh" },
        { Name: "Lào Cai" },
        { Name: "Yên Bái" },
        { Name: "Điện Biên" },
        { Name: "Hoà Bình" },
        { Name: "Lai Châu" },
        { Name: "Sơn La" },
        { Name: "Thanh Hoá" },
        { Name: "Nghệ An" },
        { Name: "Hà Tĩnh" },
        { Name: "Quảng Bình" },
        { Name: "Quảng Trị" },
        { Name: "Thừa Thiên-Huế" },
        { Name: "Đà Nẵng" },
        { Name: "Quảng Nam" },
        { Name: "Quảng Ngãi" },
        { Name: "Bình Định" },
        { Name: "Phú Yên" },
        { Name: "Khánh Hoà" },
        { Name: "Ninh Thuận" },
        { Name: "Bình Thuận" },
        { Name: "Kon Tum" },
        { Name: "Gia Lai" },
        { Name: "Đắc Lắc" },
        { Name: "Đắc Nông" },
        { Name: "Lâm Đồng" },
        { Name: "Bình Phước" },
        { Name: "Bình Dương" },
        { Name: "Đồng Nai" },
        { Name: "Tây Ninh" },
        { Name: "Bà Rịa-Vũng Tàu" },
        { Name: "Thành phố Hồ Chí Minh" },
        { Name: "Long An" },
        { Name: "Đồng Tháp" },
        { Name: "Tiền Giang" },
        { Name: "An Giang" },
        { Name: "Bến Tre" },
        { Name: "Vĩnh Long" },
        { Name: "Trà Vinh" },
        { Name: "Hậu Giang" },
        { Name: "Kiên Giang" },
        { Name: "Sóc Trăng" },
        { Name: "Bạc Liêu" },
        { Name: "Cà Mau" },
        { Name: "Cần Thơ" },
      ],
      Name: '',
      NameSchool: 'Chọn trường trước khi đăng ký',
      NameFeedback: '',
      PhoneFeedback: '',
      EmailFeedback: '',
      AddressFeedback: '',
      ContentFeedback: '',

      NameRegistration: '',
      PhoneRegistration: '',
      EmailRegistration: '',
      AddressRegistration: '',
      // ContentRegistration: '',
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

  ShareMessage = () => {
    Share.share(
      {
        // message: this.state.TextInputValueHolder.toString()
        message: 'http://gdnn.gov.vn/'
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
  }

  changeForm = (x) => {
    if (x == 1) {
      this.setState({
        showDangKy: 500,
        showGopY: 0,
        showTrangThaiViecLam: 0,
        OpacityDangKy: 1,
        OpacityGopY: 0,
        OpacityTrangThaiViecLam: 0,
      });
    } else
      if (x == 2) {
        this.setState({
          showDangKy: 0,
          showGopY: 500,
          showTrangThaiViecLam: 0,
          OpacityDangKy: 0,
          OpacityGopY: 1,
          OpacityTrangThaiViecLam: 0,
        });
      } else
        if (x == 3) {
          this.setState({
            showDangKy: 0,
            showGopY: 0,
            showTrangThaiViecLam: 500,
            OpacityDangKy: 0,
            OpacityGopY: 0,
            OpacityTrangThaiViecLam: 1,
          });
        }
  }


  // renderItems() {
  //   items = [];
  //   for (let item of this.state.SchoolsArray) {
  //     items.push(<Picker.Item key={item.Name} label={item.Name} value={item.Name} />)
  //   }
  //   return items;
  // }
  
  renderItemJob() {
    items = [];
    items.push(<Picker.Item key={this.state.Name} label={this.state.Name} value={this.state.Name} />)
    return items;
  }

  queryData = () => {
    db.transaction((tx) => {
      tx.executeSql('select Name,Income,Cost,Prospects from Tbl_Job where JobID = ?', [IDNganhDangXem], (tx, results) => {
        var row = results.rows.item(0);
        this.setState({
          Name: row.Name,
          Income: row.Income, // Thu nhap binh quan / thang
          Cost: row.Cost,
          Prospects: row.Prospects,
        });
      });
    });
  }


  queryDataJob = () => {
    var arrs = [];
    var sql = 'select Name from Tbl_Provin';
    db.transaction((tx) => {
      tx.executeSql(sql, [], (tx, results) => {
        for (var i = 0; i < results.rows.length; i++) {
          var row = results.rows.item(i);
          arrs.push(row)
        }
        this.setState({ SchoolsArray: arrs })
      });
    });
  }


  UNSAFE_componentWillMount() {
    IDNganhDangXem = WorkGroup.getNdx();
    IDTruongDangXem = WorkGroup.getTdx();
    //this.queryDataJob();
    this.queryData();

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



  ranksUpDown = (x) => {
    if (x == 1) {
      super.setState({ onCheckBox2: 20 });
      super.setState({ offCheckBox2: 0 });
      if (this.state.onCheckBox1 == 0) {
        super.setState({ onCheckBox1: 20 })
      }
      if (this.state.onCheckBox1 == 20) {
        super.setState({ onCheckBox1: 0 })
      }
      if (this.state.offCheckBox1 == 0) {
        super.setState({ offCheckBox1: 20 })
      }
      if (this.state.offCheckBox1 == 20) {
        super.setState({ offCheckBox1: 0 })
      }
    }
    if (x == 2) {
      super.setState({ onCheckBox1: 20 });
      super.setState({ offCheckBox1: 0 });
      if (this.state.onCheckBox2 == 0) {
        super.setState({ onCheckBox2: 20 })
      }
      if (this.state.onCheckBox2 == 20) {
        super.setState({ onCheckBox2: 0 })
      }
      if (this.state.offCheckBox2 == 0) {
        super.setState({ offCheckBox2: 20 })
      }
      if (this.state.offCheckBox2 == 20) {
        super.setState({ offCheckBox2: 0 })
      }
    }
  }


  fetchRegistration = () => {
    if (IDTruongDangXem == -1) {
      Alert.alert('Thông báo', 'Vui lòng chọn trường trước');
    } else {
      if (this.state.NameRegistration == '' || this.state.PhoneRegistration == '' || this.state.EmailRegistration == '' || this.state.AddressRegistration == '' || this.state.ContentRegistration == '') {
        Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
      } else {
        // try {
        //   var sql = url + '/api/jsonws/gdnn.api/add-feedback/name/' + 
        // } catch (error) {
        //   Alert.alert('Thông báo', 'Có lỗi xảy ra');
        // }
      }
    }
  }

  fetchAddfeedback = () => {
    if (this.state.NameFeedback == '' || this.state.PhoneFeedback == '' || this.state.EmailFeedback == '' || this.state.AddressFeedback == '' || this.state.ContentFeedback == '') {
      Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin');
    } else {
      try {
        var sql = url + '/api/jsonws/gdnn.api/add-feedback/name/' + this.state.NameFeedback + '/street-address/' + this.state.AddressFeedback + '/phone-number/' + this.state.PhoneFeedback + '/email-address/' + this.state.EmailFeedback + '/content/' + this.state.ContentFeedback;
        fetch(sql, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
          },
        }).then((response) => response.json())
          .then((response) => {
            if (response.exception == null) {
              Alert.alert('Thông báo', 'Gửi đi thành công');
            } else {
              Alert.alert('Thông báo', 'Vui lòng điền chính xác các thông tin');
            }
          })

      } catch (error) {
        Alert.alert('Thông báo', 'Có lỗi xảy ra');
      }
    }
  }


  render() {
    const { params } = this.props.navigation.state;
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
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 2,marginBottom: 3  }}>
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
          {this.printNameSchool()}
          <View style={{ flexDirection: 'row', }}>
            <TouchableOpacity onPress={() => { this.changeForm(1) }}
              style={{ backgroundColor: '#ecaa45', width: 60, height: 25, marginTop: 10, marginBottom: 5, borderRadius: 3, marginLeft: 40 }}
            >
              <Text style={{ fontSize: 13, color: 'white', alignSelf: 'center', marginTop: 4, fontWeight: 'bold', }}>Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.changeForm(2) }}
              style={{ backgroundColor: '#ecaa45', width: 60, height: 25, marginTop: 10, marginBottom: 5, borderRadius: 3, marginLeft: 2 }}
            >
              <Text style={{ fontSize: 13, color: 'white', alignSelf: 'center', marginTop: 4, fontWeight: 'bold', }}>Góp ý</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => { this.changeForm(3) }}
              style={{ backgroundColor: '#ecaa45', width: 120, height: 25, marginTop: 10, marginBottom: 5, borderRadius: 3, marginLeft: 2 }}
            >
              <Text style={{ fontSize: 13, color: 'white', alignSelf: 'center', marginTop: 4, fontWeight: 'bold', }}>Trạng thái việc làm</Text>
            </TouchableOpacity> */}
          </View>

          {/* <View style={{ height: this.state.showTrangThaiViecLam, opacity: this.state.OpacityTrangThaiViecLam }}>
            <Text style={{ fontWeight: 'bold', color: '#ecaa45', marginLeft: 20 }}>{'\n'}CẬP NHẬT TRẠNG THÁI VIỆC LÀM</Text>
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

            <View style={{ flexDirection: 'row', marginLeft: 40, marginTop: 10 }}>
              <Text style={{ color: 'black' }}>Tình trạng việc làm</Text>
              <View>
                <TouchableOpacity
                  onPress={() => { this.ranksUpDown(1) }}
                  style={{ flexDirection: 'row' }}>
                  <View style={{ marginTop: 0.9 }}>
                    <Image
                      source={require('MolisaApp/Image/tickBox1.png')}
                      style={{ width: 20, height: this.state.onCheckBox1, marginLeft: 4 }} />
                    <Image
                      source={require('MolisaApp/Image/tickBox2.png')}
                      style={{ width: 20, height: this.state.offCheckBox1, marginLeft: 4 }} />
                  </View>
                  <Text style={{ color: 'black' }}>Đang có việc làm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => { this.ranksUpDown(2) }}
                  style={{ flexDirection: 'row' }}>
                  <View style={{ marginTop: 0.9 }}>
                    <Image
                      source={require('MolisaApp/Image/tickBox1.png')}
                      style={{ width: 20, height: this.state.onCheckBox2, marginLeft: 4 }} />
                    <Image
                      source={require('MolisaApp/Image/tickBox2.png')}
                      style={{ width: 20, height: this.state.offCheckBox2, marginLeft: 4 }} />
                  </View>
                  <Text style={{ color: 'black' }}>Đang thất nghiệp</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 2, marginTop: 10, borderWidth: 1, borderColor: '#78787a', marginLeft: 40, marginRight: 40, }}>
                <Picker
                  selectedValue={this.state.selectedProvin}
                  onValueChange={(value) => this.setState({ selectedProvin: value })}
                  style={{ height: 38, color: '#78787a' }}
                >
                  {this.renderItems()}
                </Picker>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
            <TextInput
              underlineColorAndroid='transparent'
              multiline={true}
              placeholder='Việc làm mong muốn'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.inputComment}
              returnKeyType="next"
              ref={(input) => this.NextText3 = input}
              onSubmitEditing={() => this.NextText4.focus()}
            />
            <TextInput
              underlineColorAndroid='transparent'
              multiline={true}
              placeholder='Ghi chú'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.inputComment}
              returnKeyType="go"
              ref={(input) => this.NextText4 = input}
            />
            <TouchableOpacity onPress={() => { this.ClickRegitration() }} style={{ backgroundColor: 'rgb(0, 161, 199)', width: 75, height: 35, marginTop: 10, marginBottom: 5, alignSelf: 'flex-end', marginRight: 40, borderRadius: 3, }}>
              <Text style={{ fontSize: 15, color: 'white', marginLeft: 10, marginTop: 7 }}>Đăng ký</Text>
            </TouchableOpacity>

          </View> */}

          <View style={{ height: this.state.showGopY, opacity: this.state.OpacityGopY }}>
            <Text style={{ fontWeight: 'bold', color: '#ecaa45', marginLeft: 20 }}>{'\n'}GÓP Ý NỘI DUNG</Text>
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Họ và tên'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              onChangeText={text => { this.setState({ NameFeedback: text }) }}
              returnKeyType="next"
              onSubmitEditing={() => this.NextText5.focus()}
            />
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Số điện thoại'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              returnKeyType="next"
              onChangeText={text => { this.setState({ PhoneFeedback: text }) }}
              ref={(input) => this.NextText5 = input}
              onSubmitEditing={() => this.NextText6.focus()}
            />
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Email'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              returnKeyType="next"
              onChangeText={text => { this.setState({ EmailFeedback: text }) }}
              ref={(input) => this.NextText6 = input}
              onSubmitEditing={() => this.NextText7.focus()}
            />
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Địa chỉ'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              onChangeText={text => { this.setState({ AddressFeedback: text }) }}
              returnKeyType="next"
              ref={(input) => this.NextText7 = input}
              onSubmitEditing={() => this.NextText8.focus()}
            />

            <TextInput
              underlineColorAndroid='transparent'
              multiline={true}
              placeholder='Góp ý'
              onChangeText={text => { this.setState({ ContentFeedback: text }) }}
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.inputComment}
              ref={(input) => this.NextText8 = input}
              returnKeyType="go"

            />
            <TouchableOpacity onPress={() => { this.fetchAddfeedback() }} style={{ backgroundColor: 'rgb(0, 161, 199)', width: 75, height: 35, marginTop: 10, marginBottom: 5, alignSelf: 'flex-end', marginRight: 40, borderRadius: 3, }}>
              <Text style={{ fontSize: 15, color: 'white', marginLeft: 15, marginTop: 7 }}>Góp ý</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: this.state.showDangKy, opacity: this.state.OpacityDangKy }}>
            <Text style={{ fontWeight: 'bold', color: '#ecaa45', marginLeft: 20 }}>{'\n'}ĐĂNG KÝ THÔNG TIN TƯ VẤN</Text>
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Họ và tên'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              onChangeText={text => { this.setState({ NameRegistration: text }) }}
              returnKeyType="next"
              onSubmitEditing={() => this.NextText1.focus()}
            />
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Số điện thoại'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              returnKeyType="next"
              onChangeText={text => { this.setState({ PhoneRegistration: text }) }}
              ref={(input) => this.NextText1 = input}
              onSubmitEditing={() => this.NextText2.focus()}
            />
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Email'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              onChangeText={text => { this.setState({ EmailRegistration: text }) }}
              returnKeyType="next"
              ref={(input) => this.NextText2 = input}
              onSubmitEditing={() => this.NextText3.focus()}
            />
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Địa chỉ'
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.input}
              onChangeText={text => { this.setState({ AddressRegistration: text }) }}
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
     
            {/* <TextInput
              underlineColorAndroid='transparent'
              multiline={true}
              placeholder='Yêu cầu'
              onChangeText={text => { this.setState({ ContentRegistration: text }) }}
              placeholderTextColor='rgb(160, 169, 174)'
              style={styles.inputComment}
              returnKeyType="go"
              ref={(input) => this.NextText4 = input}
            /> */}
            <TouchableOpacity onPress={() => { this.fetchRegistration() }} style={{ backgroundColor: 'rgb(0, 161, 199)', width: 75, height: 35, marginTop: 10, marginBottom: 5, alignSelf: 'flex-end', marginRight: 40, borderRadius: 3, }}>
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
    // justifyContent: 'flex-start',  
  },
  input: {
    height: 40,
    marginLeft: 40,
    marginRight: 40,
    color: 'black',
    borderWidth: 1,
    borderColor: '#78787a',
    paddingHorizontal: 10,
    marginTop: 10
    //backgroundColor: 'rgb(73, 124, 167)',
  },
  inputComment: {
    height: 60,
    marginLeft: 40,
    marginRight: 40,
    color: 'black',
    borderWidth: 1,
    borderColor: '#78787a',
    paddingHorizontal: 10,
    marginTop: 10
    //backgroundColor: 'rgb(73, 124, 167)',
  },
  inputComment2: {
    marginLeft: 10,
    marginRight: 10,
    height: 150,
    color: 'black',
    borderWidth: 1,
    borderColor: '#78787a',
    marginTop: 10
  }
})