import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet } from 'react-native';
import  ProfileScreen  from '../ProfileScreen/ProfileScreen'
import  ApiScreen  from '../ApiScreen/ApiScreen'


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
                title="Go to Details"
                onPress={() => this.props.navigation.navigate('ProfileScreen')}
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
