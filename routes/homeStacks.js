import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Landing from '../components/landing';
import Main from '../components/main';

const Stack = createNativeStackNavigator();
const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Landing'>
                <Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
                <Stack.Screen name='Main' component={Main} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;
