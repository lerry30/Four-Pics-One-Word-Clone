import React from 'react';
import { View } from 'react-native';
import Constants from 'expo-constants';

// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

import Navigator from './routes/homeStacks';

import * as Font from 'expo-font';

const getFonts = () => Font.loadAsync({
    'bebasneue' : require('./assets/fonts/BebasNeue-Regular.ttf')
});

// const Drawer = createDrawerNavigator();

export default function App() {

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: Constants.statusBarHeight }}>
            <Navigator />
        </View>
    );
}

{/* <NavigationContainer>
    <Drawer.Navigator initialRouteName="Navigator">
        <Drawer.Screen name="Navigator" component={Navigator} />
    </Drawer.Navigator>
</NavigationContainer> */}