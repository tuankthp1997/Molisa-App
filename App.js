import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Alert,
    NetInfo,
    ActivityIndicator,
} from 'react-native';
import { Route } from './Route';
var SQLite = require('react-native-sqlite-storage');
var CheckTong = 0;
var CheckJob = 0;
var CheckSchool = 0;
var CheckSchoolJob = 0;
var CheckWorkGroup = 0;
var CheckProvince = 0;
var date = new Date();
var ticks = date.getTime();
export var db = SQLite.openDatabase({ name: 'dzz.db', createFromLocation: '~data.db' });

export default class App extends Component {
    gettingStart = async () => {
        try {
            var CheckDate = await AsyncStorage.getItem("@CheckDate:key");
            if (CheckDate == null) {  // Truong hop khoi dong app len lan dau. Set CheckDate = Date now
                // Alert.alert('Thông Báo!', 'Xin Chào!');
                await AsyncStorage.setItem("@CheckDate:key", ticks.toString());
                await this.fetchTblJob();
                await this.fetchTblWorkGroup();
                await this.fetchTblSchool();
                await this.fetchTblSchoolJob();
                await this.fetchTblProvince();
                // await this.setState({
                //     checkDownLoadData: false
                // })
                // download het data ve
            } else {
                this.fetchNewInfo(CheckDate);
            }
        } catch (e) {
            // console.log('Error');

        }
    }

    fetchNewInfo = async (CheckDate) => {
        var queryJob = 'http://27.72.28.157:8080/api/jsonws/gdnn.api/has-new-job/date/' + CheckDate;
        await fetch(queryJob, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log('Job');
                // console.log(response);
                if (response == true) {
                    CheckTong = 1;
                    CheckJob = 1;

                }
            })

        var querySchool = 'http://27.72.28.157:8080/api/jsonws/gdnn.api/has-new-school/date/' + CheckDate;
        await fetch(querySchool, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log('School');
                // console.log(response);
                if (response == true) {
                    CheckTong = 1;
                    CheckSchool = 1;
                }
            })

        var querySchoolJob = 'http://27.72.28.157:8080/api/jsonws/gdnn.api/has-new-school-job/date/' + CheckDate;
        await fetch(querySchoolJob, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log('querySchoolJob');
                // console.log(response);
                if (response == true) {
                    CheckTong = 1;
                    CheckSchoolJob = 1;
                }
            })

        var queryWorkGroup = 'http://27.72.28.157:8080/api/jsonws/gdnn.api/has-new-work-groups/date/' + CheckDate;
        await fetch(queryWorkGroup, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log('queryWorkGroup');
                // console.log(response);
                if (response == true) {
                    CheckTong = 1;
                    CheckWorkGroup = 1;
                }
            })

        var queryProvince = 'http://27.72.28.157:8080/api/jsonws/gdnn.api/has-new-provinces/date/' + CheckDate;
        await fetch(queryWorkGroup, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log('queryWorkGroup');
                // console.log(response);
                if (response == true) {
                    CheckTong = 1;
                    CheckProvince = 1;
                }
            })
        await this.downloadDB();
    }

    downloadDB = async () => {
        //  console.log('CheckTong');
        //  console.log(CheckTong);
        if (CheckTong == 1) {
            Alert.alert(
                'Thông Báo',
                'Có bản cập nhật dữ liệu mới',
                [
                    {
                        text: 'Cập Nhật Ngay', onPress: async () => {
                            if (CheckSchool == 1) await this.fetchTblSchool();
                            if (CheckJob == 1) await this.fetchTblJob();
                            if (CheckSchoolJob == 1) await this.fetchTblSchoolJob();
                            if (CheckWorkGroup == 1) await this.fetchTblWorkGroup();
                            if (CheckProvince == 1) await this.fetchTblProvince();
                            await AsyncStorage.setItem("@CheckDate:key", ticks.toString());
                            await Alert.alert(
                                'Thông Báo',
                                'Cập nhật dữ liệu thành công',
                            )
                            // await this.setState({
                            //     checkDownLoadData: false
                            // })
                        }
                    },
                    {
                        text: 'Nhắc Tôi Sau', onPress: () => {
                            // await this.setState({
                            //     checkDownLoadData: false
                            //    })
                        }, style: 'cancel'
                    },
                ],
                { cancelable: false }
            )

        }
    }



    fetchTblJob = () => {
        fetch('http://27.72.28.157:8080/api/jsonws/gdnn.api/get-jobs/start/-1/end/-1', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                var crack = Math.floor(response.length / 2);
                db.transaction((tx) => {
                    var sql = '';
                    var sqldel = 'delete from Tbl_Job';
                    tx.executeSql(sqldel, [], (tx, results) => {
                    });

                    for (var i = 0; i < crack; i++) {
                        sql = 'insert into Tbl_Job values(' + response[i].jobID + ',"' + response[i].name + '","' + response[i].collegeCode + '","' + response[i].secondaryCode + '","' + response[i].workGroupID + '","' + response[i].income + '","' + response[i].cost + '","' + response[i].prospects + '","' + response[i].description + '","' + response[i].mission + '","' + response[i].module + '","' + response[i].requirement + '","' + response[i].standard + '","' + response[i].diploma + '","' + response[i].coincidence + '","' + response[i].position + '","' + response[i].jobRelated + '","' + response[i].opFindJob + '","' + response[i].opDevelope + '","' + response[i].opLevelUp + '","' + response[i].employmentRate + '","' + response[i].collegeMonthlyCost + '","' + response[i].collegeCourseCost + '","' + response[i].secondaryMonthlyCost + '","' + response[i].secondaryCourseCost + '","' + response[i].studentNum2017 + '","' + response[i].studentNum2016 + '","' + response[i].studentNum2015 + '","' + response[i].studentNum2014 + '","' + response[i].studentNum2013 + '","' + response[i].findJob + '", 1)';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                });

                db.transaction((tx) => {
                    for (var i = crack; i < (response.length); i++) {
                        sql = 'insert into Tbl_Job values(' + response[i].jobID + ',"' + response[i].name + '","' + response[i].collegeCode + '","' + response[i].secondaryCode + '","' + response[i].workGroupID + '","' + response[i].income + '","' + response[i].cost + '","' + response[i].prospects + '","' + response[i].description + '","' + response[i].mission + '","' + response[i].module + '","' + response[i].requirement + '","' + response[i].standard + '","' + response[i].diploma + '","' + response[i].coincidence + '","' + response[i].position + '","' + response[i].jobRelated + '","' + response[i].opFindJob + '","' + response[i].opDevelope + '","' + response[i].opLevelUp + '","' + response[i].employmentRate + '","' + response[i].collegeMonthlyCost + '","' + response[i].collegeCourseCost + '","' + response[i].secondaryMonthlyCost + '","' + response[i].secondaryCourseCost + '","' + response[i].studentNum2017 + '","' + response[i].studentNum2016 + '","' + response[i].studentNum2015 + '","' + response[i].studentNum2014 + '","' + response[i].studentNum2013 + '","' + response[i].findJob + '", 1)';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                    // console.log('Update Tbl_Job OK');
                    // console.log(response.length);

                })
            })
    }

    fetchTblSchool = () => {
        fetch('http://27.72.28.157:8080/api/jsonws/gdnn.api/get-schools/start/-1/end/-1', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                var crack = Math.floor(response.length / 4);
                db.transaction((tx) => {
                    var sql = '';
                    var sqldel = 'delete from Tbl_School';
                    tx.executeSql(sqldel, [], (tx, results) => {
                    });
                    for (var i = 0; i < crack; i++) {
                        sql = 'insert into Tbl_School values(' + response[i].schoolID + ',"' + response[i].name + '","' + response[i].code + '","' + response[i].street + '","' + response[i].commune + '","' + response[i].township + '","' + response[i].province + '","' + response[i].telephone1 + '","' + response[i].fax + '","' + response[i].telephone2 + '","' + response[i].email + '","' + response[i].website + '","' + response[i].information + '","' + response[i].managers + '","' + response[i].typeManager + '","' + response[i].enterprise + '","' + response[i].baseType + '","' + response[i].provinDivision1 + '","' + response[i].townshipDivision1 + '","' + response[i].communeDivision1 + '","' + response[i].streetDivision1 + '","' + response[i].telephoneDivision1 + '","' + response[i].faxDivision1 + '","' + response[i].emailDivision1 + '","' + response[i].provinDivision2 + '","' + response[i].townshipDivision2 + '","' + response[i].communeDivision2 + '","' + response[i].streetDivision2 + '","' + response[i].telephoneDivision2 + '","' + response[i].faxDivision2 + '","' + response[i].emailDivision2 + '","' + response[i].provinDivision3 + '","' + response[i].townshipDivision3 + '","' + response[i].communeDivision3 + '","' + response[i].streetDivision3 + '","' + response[i].telephoneDivision3 + '","' + response[i].faxDivision3 + '","' + response[i].emailDivision3 + '","' + response[i].establish + '","' + response[i].dateEstablish + '","' + response[i].promulgator + '","' + response[i].educationActivityNum + '","' + response[i].educationActivityDate + '","' + response[i].educationActivityAddress + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                });

                db.transaction((tx) => {
                    for (var i = crack; i < (crack + crack); i++) {
                        sql = 'insert into Tbl_School values(' + response[i].schoolID + ',"' + response[i].name + '","' + response[i].code + '","' + response[i].street + '","' + response[i].commune + '","' + response[i].township + '","' + response[i].province + '","' + response[i].telephone1 + '","' + response[i].fax + '","' + response[i].telephone2 + '","' + response[i].email + '","' + response[i].website + '","' + response[i].information + '","' + response[i].managers + '","' + response[i].typeManager + '","' + response[i].enterprise + '","' + response[i].baseType + '","' + response[i].provinDivision1 + '","' + response[i].townshipDivision1 + '","' + response[i].communeDivision1 + '","' + response[i].streetDivision1 + '","' + response[i].telephoneDivision1 + '","' + response[i].faxDivision1 + '","' + response[i].emailDivision1 + '","' + response[i].provinDivision2 + '","' + response[i].townshipDivision2 + '","' + response[i].communeDivision2 + '","' + response[i].streetDivision2 + '","' + response[i].telephoneDivision2 + '","' + response[i].faxDivision2 + '","' + response[i].emailDivision2 + '","' + response[i].provinDivision3 + '","' + response[i].townshipDivision3 + '","' + response[i].communeDivision3 + '","' + response[i].streetDivision3 + '","' + response[i].telephoneDivision3 + '","' + response[i].faxDivision3 + '","' + response[i].emailDivision3 + '","' + response[i].establish + '","' + response[i].dateEstablish + '","' + response[i].promulgator + '","' + response[i].educationActivityNum + '","' + response[i].educationActivityDate + '","' + response[i].educationActivityAddress + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                })
                db.transaction((tx) => {
                    for (var i = crack + crack; i < (crack + crack + crack); i++) {
                        sql = 'insert into Tbl_School values(' + response[i].schoolID + ',"' + response[i].name + '","' + response[i].code + '","' + response[i].street + '","' + response[i].commune + '","' + response[i].township + '","' + response[i].province + '","' + response[i].telephone1 + '","' + response[i].fax + '","' + response[i].telephone2 + '","' + response[i].email + '","' + response[i].website + '","' + response[i].information + '","' + response[i].managers + '","' + response[i].typeManager + '","' + response[i].enterprise + '","' + response[i].baseType + '","' + response[i].provinDivision1 + '","' + response[i].townshipDivision1 + '","' + response[i].communeDivision1 + '","' + response[i].streetDivision1 + '","' + response[i].telephoneDivision1 + '","' + response[i].faxDivision1 + '","' + response[i].emailDivision1 + '","' + response[i].provinDivision2 + '","' + response[i].townshipDivision2 + '","' + response[i].communeDivision2 + '","' + response[i].streetDivision2 + '","' + response[i].telephoneDivision2 + '","' + response[i].faxDivision2 + '","' + response[i].emailDivision2 + '","' + response[i].provinDivision3 + '","' + response[i].townshipDivision3 + '","' + response[i].communeDivision3 + '","' + response[i].streetDivision3 + '","' + response[i].telephoneDivision3 + '","' + response[i].faxDivision3 + '","' + response[i].emailDivision3 + '","' + response[i].establish + '","' + response[i].dateEstablish + '","' + response[i].promulgator + '","' + response[i].educationActivityNum + '","' + response[i].educationActivityDate + '","' + response[i].educationActivityAddress + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                })
                db.transaction((tx) => {
                    for (var i = crack + crack + crack; i < (crack + crack + crack + crack); i++) {
                        sql = 'insert into Tbl_School values(' + response[i].schoolID + ',"' + response[i].name + '","' + response[i].code + '","' + response[i].street + '","' + response[i].commune + '","' + response[i].township + '","' + response[i].province + '","' + response[i].telephone1 + '","' + response[i].fax + '","' + response[i].telephone2 + '","' + response[i].email + '","' + response[i].website + '","' + response[i].information + '","' + response[i].managers + '","' + response[i].typeManager + '","' + response[i].enterprise + '","' + response[i].baseType + '","' + response[i].provinDivision1 + '","' + response[i].townshipDivision1 + '","' + response[i].communeDivision1 + '","' + response[i].streetDivision1 + '","' + response[i].telephoneDivision1 + '","' + response[i].faxDivision1 + '","' + response[i].emailDivision1 + '","' + response[i].provinDivision2 + '","' + response[i].townshipDivision2 + '","' + response[i].communeDivision2 + '","' + response[i].streetDivision2 + '","' + response[i].telephoneDivision2 + '","' + response[i].faxDivision2 + '","' + response[i].emailDivision2 + '","' + response[i].provinDivision3 + '","' + response[i].townshipDivision3 + '","' + response[i].communeDivision3 + '","' + response[i].streetDivision3 + '","' + response[i].telephoneDivision3 + '","' + response[i].faxDivision3 + '","' + response[i].emailDivision3 + '","' + response[i].establish + '","' + response[i].dateEstablish + '","' + response[i].promulgator + '","' + response[i].educationActivityNum + '","' + response[i].educationActivityDate + '","' + response[i].educationActivityAddress + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                })
            })
    }

    fetchTblSchoolJob = () => {
        fetch('http://27.72.28.157:8080/api/jsonws/gdnn.api/get-school-jobs/start/-1/end/-1', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                var crack = Math.floor(response.length / 6);
                db.transaction((tx) => {
                    var sql = '';
                    var sqldel = 'delete from Tbl_SchoolJob';
                    tx.executeSql(sqldel, [], (tx, results) => {
                    });

                    for (var i = 0; i < crack; i++) {
                        sql = 'insert into Tbl_SchoolJob values(' + response[i].schoolID + ',"' + response[i].jobID + '","' + response[i].schoolCode + '","' + response[i].collegeCode + '","' + response[i].secondaryCode + '","' + response[i].income + '","' + response[i].cost + '","' + response[i].prospects + '","' + response[i].description + '","' + response[i].mission + '","' + response[i].module + '","' + response[i].requirement + '","' + response[i].standard + '","' + response[i].diploma + '","' + response[i].coincidence + '","' + response[i].position + '","' + response[i].jobRelated + '","' + response[i].opFindJob + '","' + response[i].opDevelope + '","' + response[i].opLevelUp + '","' + response[i].collegeMonthlyCost + '","' + response[i].collegeCourseCost + '","' + response[i].secondaryMonthlyCost + '","' + response[i].secondaryCourseCost + '","' + response[i].studentNum2017 + '","' + response[i].studentNum2016 + '","' + response[i].studentNum2015 + '","' + response[i].studentNum2014 + '","' + response[i].studentNum2013 + '","' + response[i].findJob + '","' + response[i].levelEducateCollege + '","' + response[i].levelEducateSecondary + '","' + response[i].levelEducatePrimary + '","' + response[i].scaleCollege + '","' + response[i].scaleSecondary + '","' + response[i].scalePrimary + '","' + response[i].enrollmentForm + '","' + response[i].prequalification + '","' + response[i].timeAdmissionFrom + '","' + response[i].timeAdmissionTo + '","' + response[i].employmentRate + '","' + response[i].manpowerSupply + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                });

                db.transaction((tx) => {
                    for (var i = crack; i < (crack + crack); i++) {
                        sql = 'insert into Tbl_SchoolJob values(' + response[i].schoolID + ',"' + response[i].jobID + '","' + response[i].schoolCode + '","' + response[i].collegeCode + '","' + response[i].secondaryCode + '","' + response[i].income + '","' + response[i].cost + '","' + response[i].prospects + '","' + response[i].description + '","' + response[i].mission + '","' + response[i].module + '","' + response[i].requirement + '","' + response[i].standard + '","' + response[i].diploma + '","' + response[i].coincidence + '","' + response[i].position + '","' + response[i].jobRelated + '","' + response[i].opFindJob + '","' + response[i].opDevelope + '","' + response[i].opLevelUp + '","' + response[i].collegeMonthlyCost + '","' + response[i].collegeCourseCost + '","' + response[i].secondaryMonthlyCost + '","' + response[i].secondaryCourseCost + '","' + response[i].studentNum2017 + '","' + response[i].studentNum2016 + '","' + response[i].studentNum2015 + '","' + response[i].studentNum2014 + '","' + response[i].studentNum2013 + '","' + response[i].findJob + '","' + response[i].levelEducateCollege + '","' + response[i].levelEducateSecondary + '","' + response[i].levelEducatePrimary + '","' + response[i].scaleCollege + '","' + response[i].scaleSecondary + '","' + response[i].scalePrimary + '","' + response[i].enrollmentForm + '","' + response[i].prequalification + '","' + response[i].timeAdmissionFrom + '","' + response[i].timeAdmissionTo + '","' + response[i].employmentRate + '","' + response[i].manpowerSupply + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                })

                db.transaction((tx) => {
                    for (var i = crack + crack; i < (crack + crack + crack); i++) {
                        sql = 'insert into Tbl_SchoolJob values(' + response[i].schoolID + ',"' + response[i].jobID + '","' + response[i].schoolCode + '","' + response[i].collegeCode + '","' + response[i].secondaryCode + '","' + response[i].income + '","' + response[i].cost + '","' + response[i].prospects + '","' + response[i].description + '","' + response[i].mission + '","' + response[i].module + '","' + response[i].requirement + '","' + response[i].standard + '","' + response[i].diploma + '","' + response[i].coincidence + '","' + response[i].position + '","' + response[i].jobRelated + '","' + response[i].opFindJob + '","' + response[i].opDevelope + '","' + response[i].opLevelUp + '","' + response[i].collegeMonthlyCost + '","' + response[i].collegeCourseCost + '","' + response[i].secondaryMonthlyCost + '","' + response[i].secondaryCourseCost + '","' + response[i].studentNum2017 + '","' + response[i].studentNum2016 + '","' + response[i].studentNum2015 + '","' + response[i].studentNum2014 + '","' + response[i].studentNum2013 + '","' + response[i].findJob + '","' + response[i].levelEducateCollege + '","' + response[i].levelEducateSecondary + '","' + response[i].levelEducatePrimary + '","' + response[i].scaleCollege + '","' + response[i].scaleSecondary + '","' + response[i].scalePrimary + '","' + response[i].enrollmentForm + '","' + response[i].prequalification + '","' + response[i].timeAdmissionFrom + '","' + response[i].timeAdmissionTo + '","' + response[i].employmentRate + '","' + response[i].manpowerSupply + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                })
                db.transaction((tx) => {
                    for (var i = crack + crack + crack; i < (crack + crack + crack + crack); i++) {
                        sql = 'insert into Tbl_SchoolJob values(' + response[i].schoolID + ',"' + response[i].jobID + '","' + response[i].schoolCode + '","' + response[i].collegeCode + '","' + response[i].secondaryCode + '","' + response[i].income + '","' + response[i].cost + '","' + response[i].prospects + '","' + response[i].description + '","' + response[i].mission + '","' + response[i].module + '","' + response[i].requirement + '","' + response[i].standard + '","' + response[i].diploma + '","' + response[i].coincidence + '","' + response[i].position + '","' + response[i].jobRelated + '","' + response[i].opFindJob + '","' + response[i].opDevelope + '","' + response[i].opLevelUp + '","' + response[i].collegeMonthlyCost + '","' + response[i].collegeCourseCost + '","' + response[i].secondaryMonthlyCost + '","' + response[i].secondaryCourseCost + '","' + response[i].studentNum2017 + '","' + response[i].studentNum2016 + '","' + response[i].studentNum2015 + '","' + response[i].studentNum2014 + '","' + response[i].studentNum2013 + '","' + response[i].findJob + '","' + response[i].levelEducateCollege + '","' + response[i].levelEducateSecondary + '","' + response[i].levelEducatePrimary + '","' + response[i].scaleCollege + '","' + response[i].scaleSecondary + '","' + response[i].scalePrimary + '","' + response[i].enrollmentForm + '","' + response[i].prequalification + '","' + response[i].timeAdmissionFrom + '","' + response[i].timeAdmissionTo + '","' + response[i].employmentRate + '","' + response[i].manpowerSupply + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                })
                db.transaction((tx) => {
                    for (var i = crack + crack + crack + crack; i < (crack + crack + crack + crack + crack); i++) {
                        sql = 'insert into Tbl_SchoolJob values(' + response[i].schoolID + ',"' + response[i].jobID + '","' + response[i].schoolCode + '","' + response[i].collegeCode + '","' + response[i].secondaryCode + '","' + response[i].income + '","' + response[i].cost + '","' + response[i].prospects + '","' + response[i].description + '","' + response[i].mission + '","' + response[i].module + '","' + response[i].requirement + '","' + response[i].standard + '","' + response[i].diploma + '","' + response[i].coincidence + '","' + response[i].position + '","' + response[i].jobRelated + '","' + response[i].opFindJob + '","' + response[i].opDevelope + '","' + response[i].opLevelUp + '","' + response[i].collegeMonthlyCost + '","' + response[i].collegeCourseCost + '","' + response[i].secondaryMonthlyCost + '","' + response[i].secondaryCourseCost + '","' + response[i].studentNum2017 + '","' + response[i].studentNum2016 + '","' + response[i].studentNum2015 + '","' + response[i].studentNum2014 + '","' + response[i].studentNum2013 + '","' + response[i].findJob + '","' + response[i].levelEducateCollege + '","' + response[i].levelEducateSecondary + '","' + response[i].levelEducatePrimary + '","' + response[i].scaleCollege + '","' + response[i].scaleSecondary + '","' + response[i].scalePrimary + '","' + response[i].enrollmentForm + '","' + response[i].prequalification + '","' + response[i].timeAdmissionFrom + '","' + response[i].timeAdmissionTo + '","' + response[i].employmentRate + '","' + response[i].manpowerSupply + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                })
                db.transaction((tx) => {
                    for (var i = crack + crack + crack + crack + crack; i < (crack + crack + crack + crack + crack + crack); i++) {
                        sql = 'insert into Tbl_SchoolJob values(' + response[i].schoolID + ',"' + response[i].jobID + '","' + response[i].schoolCode + '","' + response[i].collegeCode + '","' + response[i].secondaryCode + '","' + response[i].income + '","' + response[i].cost + '","' + response[i].prospects + '","' + response[i].description + '","' + response[i].mission + '","' + response[i].module + '","' + response[i].requirement + '","' + response[i].standard + '","' + response[i].diploma + '","' + response[i].coincidence + '","' + response[i].position + '","' + response[i].jobRelated + '","' + response[i].opFindJob + '","' + response[i].opDevelope + '","' + response[i].opLevelUp + '","' + response[i].collegeMonthlyCost + '","' + response[i].collegeCourseCost + '","' + response[i].secondaryMonthlyCost + '","' + response[i].secondaryCourseCost + '","' + response[i].studentNum2017 + '","' + response[i].studentNum2016 + '","' + response[i].studentNum2015 + '","' + response[i].studentNum2014 + '","' + response[i].studentNum2013 + '","' + response[i].findJob + '","' + response[i].levelEducateCollege + '","' + response[i].levelEducateSecondary + '","' + response[i].levelEducatePrimary + '","' + response[i].scaleCollege + '","' + response[i].scaleSecondary + '","' + response[i].scalePrimary + '","' + response[i].enrollmentForm + '","' + response[i].prequalification + '","' + response[i].timeAdmissionFrom + '","' + response[i].timeAdmissionTo + '","' + response[i].employmentRate + '","' + response[i].manpowerSupply + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                })
            })
    }



    fetchTblWorkGroup = () => {
        fetch('http://27.72.28.157:8080/api/jsonws/gdnn.api/get-work-groups/start/-1/end/-1', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                db.transaction((tx) => {
                    var sqldel = 'delete from Tbl_WorkGroup';
                    var sql = '';
                    tx.executeSql(sqldel, [], (tx, results) => {
                    });
                    // console.log(response);
                    for (var i = 0; i < response.length; i++) {
                        sql = 'insert into Tbl_WorkGroup values(' + response[i].workGroupID + ',"' + response[i].name + '","' + response[i].collegeCode + '","' + response[i].secondaryCode + '","' + response[i].status + '","' + response[i].title + '","' + response[i].income + '","' + response[i].image + '","' + response[i].pos + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                    // console.log('Update WorkGroup Okey');
                    // console.log(response.length);
                });
            })
    }

    fetchTblProvince = () => {
        fetch('http://27.72.28.157:8080/api/jsonws/gdnn.api/get-provinces/start/-1/end/-1', {
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWRtaW5AZ2Rubi5nb3Yudm46MTIzNDU2',
            },
        })
            .then((response) => response.json())
            .then((response) => {
                // console.log(response.length);
                db.transaction((tx) => {
                    var sql = '';
                    var sqldel = 'delete from Tbl_Province';
                    tx.executeSql(sqldel, [], (tx, results) => {
                    });

                    for (var i = 0; i < response.length; i++) {
                        sql = 'insert into Tbl_Province values(' + response[i].provinceID + ',"' + response[i].name + '","' + response[i].type + '")';
                        tx.executeSql(sql, [], (tx, results) => {
                        });
                    }
                    // console.log('Update Province OK');
                    // console.log(response.length);
                });
            })
    }

    printWG = () => {
        var arr = [];
        db.transaction((tx) => {
            var sql = 'select * from Tbl_Job';
            tx.executeSql(sql, [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    var row = results.rows.item(i);
                    arr.push(row);
                }
            });
        });
        console.log(arr);
        // var arr1 = [];

        // db.transaction((tx) => {
        //     var sql = 'select Name from Tbl_SchoolJob';
        //     tx.executeSql(sql, [], (tx, results) => {
        //         for (var i = 0; i < results.rows.length; i++) {
        //             var row = results.rows.item(i);
        //             arr1.push(row);
        //         }
        //     });
        // });
        // console.log(arr1);
        // var arr2 = [];

        // db.transaction((tx) => {
        //     var sql = 'select * from Tbl_WorkGroup';
        //     tx.executeSql(sql, [], (tx, results) => {
        //         for (var i = 0; i < results.rows.length; i++) {
        //             var row = results.rows.item(i);
        //             arr2.push(row);
        //         }
        //     });
        // });
        // console.log(arr2);
    }

    componentWillMount() {

        this.gettingStart();

        // NetInfo.getConnectionInfo().then((connectionInfo) => {
        //     if (connectionInfo.type != 'none')
        //         {
        //             this.gettingStart();
        //         }
        // })
    }

    render() {
        this.printWG();
        return (
            <Route />
        );
    }
}
