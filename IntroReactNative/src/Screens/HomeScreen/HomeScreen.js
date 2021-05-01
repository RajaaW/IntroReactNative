import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet } from 'react-native';
import  ProfileScreen  from '../ProfileScreen/ProfileScreen'
import  ApiScreen  from '../ApiScreen/ApiScreen'
import userData from './userData.json'
import repoData from './repoData.json'

import {Api} from '../request'


export default class HomeScreen extends React.Component {
    constructor(props) {
    
        
        super(props);

    }

    getUser = async () => {
        const user = await Api.searchUser("octocat");
        console.log("là", user)
        this.props.navigation.navigate('ProfileScreen', {user});
    }
    
    render() {
        return (
        <View style={styles.container}>
            <Text>Open up homeScreen.js to start working on your app!</Text>
            <StatusBar style="auto" />
            <Button
                title="Go to Profile"
                onPress={() => this.getUser()}
            />
            <Button
                title="Go to Repo"
                onPress={() => this.props.navigation.navigate('RepoScreen', {repoData})}
            />
            <Button
                title="Go to Api"
                onPress={() => this.props.navigation.navigate('ApiScreen')}
            />
        </View>
    );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
