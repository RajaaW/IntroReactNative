import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export class FavScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            storedData: "myValue"
        }
    }


storeData = async () => {
    try {
        await AsyncStorage.setItem('Test', 'TestValue')
    } catch (e) {
        console.log(e)
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
        <View style={{ marginTop: 40 }}>
            <Text> {this.state.storedData}</Text>
            <Button title={"storeData"} onPress={this.storeData}></Button>
            <Button title={"getData"} onPress={this.getData}></Button>
        </View>
    )
}
}


export default FavScreen