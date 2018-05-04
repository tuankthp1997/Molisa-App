import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage,
    Image,
    ScrollView,
    TextInput,
} from 'react-native';
import {db} from 'MolisaApp/App';
import WorkGroup from '../HomeScreen/WorkGroup';
export default class RenderJob extends Component {

    clickJob = (jb) => {
        WorkGroup.setNdx(jb.JobID);
        this.props.onPressItem(jb);
    }

    render() {
        var imgIncome;
        var imgCost;
        var imgProspects;

        // Income

        if (this.props.item.Income <= 0) {
            imgIncome = require('MolisaApp/Image/Income/Income0.png')
        } else 
        if (this.props.item.Income == 1 || this.props.item.Income == 2) {
            imgIncome = require('MolisaApp/Image/Income/Income2.png')
        }
        else if (this.props.item.Income == 3 || this.props.item.Income == 4) {
            imgIncome = require('MolisaApp/Image/Income/Income4.png')
        }
        else if (this.props.item.Income == 5 || this.props.item.Income == 6) {
            imgIncome = require('MolisaApp/Image/Income/Income6.png')
        }
        else if (this.props.item.Income == 7 || this.props.item.Income == 8) {
            imgIncome = require('MolisaApp/Image/Income/Income8.png')
        }
        else if (this.props.item.Income == 9 || this.props.item.Income >= 10) {
            imgIncome = require('MolisaApp/Image/Income/Income10.png')
        }

        
        // COST
        if (this.props.item.Cost <= 0) {
            imgCost = require('MolisaApp/Image/Cost/Cost0.png')
        } else 
        if (this.props.item.Cost ==  1) {
            imgCost = require('MolisaApp/Image/Cost/Cost1.png')
        }
        else if (this.props.item.Cost ==  2) {
            imgCost = require('MolisaApp/Image/Cost/Cost2.png')
        }
        else if (this.props.item.Cost ==  3) {
            imgCost = require('MolisaApp/Image/Cost/Cost3.png')
        }
        else if (this.props.item.Cost ==  4) {
            imgCost = require('MolisaApp/Image/Cost/Cost4.png')
        }
        else if (this.props.item.Cost ==  5) {
            imgCost = require('MolisaApp/Image/Cost/Cost5.png')
        }
        else if (this.props.item.Cost ==  6) {
            imgCost = require('MolisaApp/Image/Cost/Cost6.png')
        }
        else if (this.props.item.Cost ==  7) {
            imgCost = require('MolisaApp/Image/Cost/Cost7.png')
        }
        else if (this.props.item.Cost ==  8) {
            imgCost = require('MolisaApp/Image/Cost/Cost8.png')
        }
        else if (this.props.item.Cost ==  9) {
            imgCost = require('MolisaApp/Image/Cost/Cost9.png')
        }
        else if (this.props.item.Cost >=  10) {
            imgCost = require('MolisaApp/Image/Cost/Cost10.png')
        }

        // PROSPECTS

        if (this.props.item.Prospects <= 0) {
            imgProspects = require('MolisaApp/Image/Prospects/Prospects0.png')
        } else
        if (this.props.item.Prospects == 1 || this.props.item.Prospects == 2) {
            imgProspects = require('MolisaApp/Image/Prospects/Prospects10.png')
        }
       
        else if (this.props.item.Prospects == 3 || this.props.item.Prospects == 4 || this.props.item.Prospects == 5) {
            imgProspects = require('MolisaApp/Image/Prospects/Prospects8.png')
        }
       
        else if (this.props.item.Prospects == 6 || this.props.item.Prospects == 7 || this.props.item.Prospects == 8) {
            imgProspects = require('MolisaApp/Image/Prospects/Prospects5.png')
        }
      
        else if (this.props.item.Prospects == 9 || this.props.item.Prospects >= 10) {
            imgProspects = require('MolisaApp/Image/Prospects/Prospects2.png')
        }


        return (
            <TouchableOpacity
                style={{ marginBottom: 3 }}
                onPress={() => { this.clickJob(this.props.item) }}>
                <View style={{ flex: 1, flexDirection: 'row', marginLeft: 20, marginRight: 20, marginTop: 2 }}>
                    <View style={{marginTop:5 }}>
                        <Text style={{ fontSize: 14, color: 'rgb(233, 187, 116)' }}>{this.props.item.Name}</Text>
                    </View>
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
                            <Text style={{ fontSize: 12, alignItems: 'center', justifyContent: 'center', color: 'black', marginTop: 8 }}>Thu nhập</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, alignItems: 'center', justifyContent: 'center', color: 'black', marginTop: 8 }}>Học phí</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 12, alignItems: 'center', justifyContent: 'center', color: 'black', marginTop: 8 }}>Cơ hội</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}
