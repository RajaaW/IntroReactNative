import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import  HomeScreen  from './src/Screens/HomeScreen/HomeScreen'
import  ProfileScreen  from './src/Screens/ProfileScreen/ProfileScreen'
import  RepoScreen  from './src/Screens/RepoScreen/RepoScreen'


const Stack = createStackNavigator();
export default function App() {
  //console.log(this.props)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="RepoScreen" component={RepoScreen} />
          </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

