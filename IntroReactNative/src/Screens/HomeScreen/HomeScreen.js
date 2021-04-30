import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet } from 'react-native';
import  ProfileScreen  from '../ProfileScreen/ProfileScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default class HomeScreen extends React.Component {
    constructor(props) {
        
        super(props)
        this.state = {
            storedData: "myValue"
        }
    }
    
    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('Test')
            this.setState({ storedData: value })
    
        } catch (e) {
            // error reading value
        }
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
                title="Go to Fav"
                onPress={() => this.props.navigation.navigate('FavScreen')}
            />

            <Text> {this.state.storedData}</Text>
            <Button title={"getData"} onPress={this.getData}></Button>
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
