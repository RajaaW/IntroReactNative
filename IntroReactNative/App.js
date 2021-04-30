import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import  HomeScreen  from './src/Screens/HomeScreen/HomeScreen'
import  ProfileScreen  from './src/Screens/ProfileScreen/ProfileScreen'
import  FavScreen  from './src/Screens/FavScreen/FavScreen'


const Stack = createStackNavigator();
export default function App() {
  //console.log(this.props)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="FavScreen" component={FavScreen} />
          </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

