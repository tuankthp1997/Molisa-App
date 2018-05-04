import React from 'react';
import { StackNavigator } from 'react-navigation';
import Home from './Components/HomeScreen/Home';
import HomeSchool from './Components/SchoolsScreen/HomeSchool';
import HomeJob from './Components/JobScreen/HomeJob';
import Webview from './Components/JobScreen/Webview';
import WorkGroup from './Components/HomeScreen/WorkGroup';
import JobScreen from 'MolisaApp/Components/HomeScreen/JobScreen';
import Introduce from 'MolisaApp/Components/HomeScreen/Introduce';
import ListViewFilter from './Components/JobScreen/ListViewFilter';
export const Route = StackNavigator({
    Screen1: {
        screen: Home,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    Screen2: {
        screen: HomeSchool,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },

    Screen3: {
        screen: HomeJob,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    Screen4: {
        screen: Webview,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    Screen5: {
        screen: WorkGroup,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },

    Screen7: {
        screen: JobScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },

    Introduce: {
        screen: Introduce,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    ListViewFilter: {
        screen: ListViewFilter,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
})

