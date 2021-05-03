import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import  HomeScreen  from './src/Screens/HomeScreen/HomeScreen'
import  SearchScreen  from './src/Screens/SearchScreen/SearchScreen'
import  ProfileScreen  from './src/Screens/ProfileScreen/ProfileScreen'
import  ApiScreen  from './src/Screens/ApiScreen/ApiScreen'
import  RepoScreen  from './src/Screens/RepoScreen/RepoScreen'
import  IssueScreen  from './src/Screens/IssueScreen/IssueScreen'


const Stack = createStackNavigator();
export default function App() {
  //console.log(this.props)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <>
          <Stack.Screen name="Epitech Project" component={HomeScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="ApiScreen" component={ApiScreen} />
          <Stack.Screen name="IssueScreen" component={IssueScreen} />
          <Stack.Screen name="RepoScreen" component={RepoScreen} />
          </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

