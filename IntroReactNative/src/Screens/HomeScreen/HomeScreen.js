import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet } from 'react-native';
import userData from './userData.json'
import repoData from './repoData.json'


export default class HomeScreen extends React.Component {
    constructor(props) {
        
        super(props);
    }
    
    render() {
        return (
        <View style={styles.container}>
            <Text>Open up homeScreen.js to start working on your app!</Text>
            <StatusBar style="auto" />
            <Button
                title="Go to Profile"
                onPress={() => this.props.navigation.navigate('ProfileScreen', {userData})}
            />
            <Button
                title="Go to Repo"
                onPress={() => this.props.navigation.navigate('RepoScreen', {repoData})}
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
