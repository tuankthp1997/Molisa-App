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
  FlatList,
  Dimensions,
  Share
} from 'react-native';
import WorkGroup from '../HomeScreen/WorkGroup';
import {db} from 'MolisaApp/App';
var imgIncome;
var imgCost;
var imgProspects;
var IDTruongDangXem = -1;

export default class Educate extends Component {

  static navigationOptions = {
    title: 'Đào tạo',
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
      searchedJob: [],
    };
  }

  queryData = () => {
    var arrs = [];
    var sql = 'select Tbl_Job.JobID, Tbl_Job.Name,  Tbl_Job.Income, Tbl_Job.Cost, Tbl_Job.Prospects from Tbl_Job inner join Tbl_SchoolJob on (Tbl_Job.JobID = Tbl_SchoolJob.JobID) and (Tbl_SchoolJob.SchoolID = ?) WHERE Tbl_Job.Status = 1';
    db.transaction((tx) => {
      tx.executeSql(sql, [IDTruongDangXem], (tx, results) => {
        for (var i = 0; i < results.rows.length; i++) {
          var row = results.rows.item(i);
          arrs.push(row)
        }
        this.setState({ searchedJob: arrs })
      });
    });

  }
  queryDataGetSchools = () => {
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
    this.queryDataGetSchools();
  }

  ShareMessage = () => {
    Share.share(
      {
        // message: this.state.TextInputValueHolder.toString()
        message: this.state.Name +  '\nhttp://gdnn.gov.vn/'
      }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
  }

  renderJob = (jb) => {
    if (jb.Income <= 0) {
      imgIncome = require('MolisaApp/Image/Income/Income0.png')
    } else
      if (jb.Income == 1 || jb.Income == 2) {
        imgIncome = require('MolisaApp/Image/Income/Income2.png')
      }
      else if (jb.Income == 3 || jb.Income == 4) {
        imgIncome = require('MolisaApp/Image/Income/Income4.png')
      }
      else if (jb.Income == 5 || jb.Income == 6) {
        imgIncome = require('MolisaApp/Image/Income/Income6.png')
      }
      else if (jb.Income == 7 || jb.Income == 8) {
        imgIncome = require('MolisaApp/Image/Income/Income8.png')
      }
      else if (jb.Income == 9 || jb.Income >= 10) {
        imgIncome = require('MolisaApp/Image/Income/Income10.png')
      }

    // COST
    if (jb.Cost <= 0) {
      imgCost = require('MolisaApp/Image/Cost/Cost0.png')
    } else
      if (jb.Cost == 1) {
        imgCost = require('MolisaApp/Image/Cost/Cost1.png')
      }
      else if (jb.Cost == 2) {
        imgCost = require('MolisaApp/Image/Cost/Cost2.png')
      }
      else if (jb.Cost == 3) {
        imgCost = require('MolisaApp/Image/Cost/Cost3.png')
      }
      else if (jb.Cost == 4) {
        imgCost = require('MolisaApp/Image/Cost/Cost4.png')
      }
      else if (jb.Cost == 5) {
        imgCost = require('MolisaApp/Image/Cost/Cost5.png')
      }
      else if (jb.Cost == 6) {
        imgCost = require('MolisaApp/Image/Cost/Cost6.png')
      }
      else if (jb.Cost == 7) {
        imgCost = require('MolisaApp/Image/Cost/Cost7.png')
      }
      else if (jb.Cost == 8) {
        imgCost = require('MolisaApp/Image/Cost/Cost8.png')
      }
      else if (jb.Cost == 9) {
        imgCost = require('MolisaApp/Image/Cost/Cost9.png')
      }
      else if (jb.Cost == 10) {
        imgCost = require('MolisaApp/Image/Cost/Cost10.png')
      }

    // PROSPECTS
    if (jb.Prospects <= 0) {
      imgProspects = require('MolisaApp/Image/Prospects/Prospects0.png')
    } else
      if (jb.Prospects == 1 || jb.Prospects == 2) {
        imgProspects = require('MolisaApp/Image/Prospects/Prospects10.png')
      }

      else if (jb.Prospects == 3 || jb.Prospects == 4 || jb.Prospects == 5) {
        imgProspects = require('MolisaApp/Image/Prospects/Prospects8.png')
      }

      else if (jb.Prospects == 6 || jb.Prospects == 7 || jb.Prospects == 8) {
        imgProspects = require('MolisaApp/Image/Prospects/Prospects5.png')
      }

      else if (jb.Prospects == 9 || jb.Prospects >= 10) {
        imgProspects = require('MolisaApp/Image/Prospects/Prospects2.png')
      }



    return (
      <TouchableOpacity
        style={{ marginBottom: 3 }}
        onPress={() => { this.clickJob(jb) }}>
        <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 2 }}>
          <View style={{ flex: 1, }}>
            <Text style={{ flex: 1, fontSize: 13, color: 'rgb(233, 187, 116)' }}>{jb.Name}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 4.5 }}></View>
            <Image
              source={require('MolisaApp/Image/muiTenNgang.png')}
              style={{ height: 13, marginTop: 0, marginRight: 5 }} />
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
      </TouchableOpacity>
    );
  };
  clickJob = (x) => {
    WorkGroup.setNdx(x.JobID);
    this.props.navigation.navigate('Screen3', {
      Income: x.Income,
      Cost: x.Cost,
      Prospects: x.Prospects,
    });
  }
  render() {
    const { params } = this.props.navigation.state;
    var { width } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <ScrollView>
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
          <TouchableOpacity onPress={() => { this.props.navigation.goBack(null) }} style={{ backgroundColor: 'rgb(0, 161, 199)', width: width }}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: 'white', alignSelf: 'center', marginTop: 6, marginBottom: 6, marginLeft: 15 }}>←   {this.state.Name.toUpperCase()}</Text>
          </TouchableOpacity>

          <View style={{}}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ flex: 3, fontWeight: 'bold', color: '#1299bb', fontSize: 15 }}> {'\n'}  DANH SÁCH ĐÀO TẠO </Text>
              <TouchableOpacity style={{ flex: 1, alignSelf: 'flex-end' }} onPress = {this.ShareMessage}>
                <View style={{ flexDirection: 'row', marginRight: 10 }}>
                  <Image source={require('MolisaApp/Image/chiaSe.png')}
                    style={{ width: 25, height: 25 }} />
                  <Text style={{ color: '#1299bb', marginTop: 3, fontSize: 13, marginLeft: 3, }}>Chia sẻ</Text>
                </View>
              </TouchableOpacity>
            </View>

            <FlatList
            data={this.state.searchedJob}
            renderItem={({item}) => 
            this.renderJob(item)}
            style={{ marginTop: 10 }}/>
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

})