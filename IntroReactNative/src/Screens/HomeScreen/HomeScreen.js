//import * as React from 'react';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet, TextInput, Image, TouchableOpacity   } from 'react-native';
import repoData from './repoData.json'

import {Api} from '../request'


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: "",
            pressed: false,
        }

    }

    setResearch = (text) => {
        this.setState({ text })
        
        this.setState({pressed: false})
    }

    getSearch = () => {
        console.log(this.state.text)
        this.setState({pressed: true})
    }
    getUser = async () => {
        const userData = await Api.searchUser("CamilleWS");
        this.props.navigation.navigate('ProfileScreen', {userData});
    }
    
    render() {
        
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Search..."
                    onChangeText={text => this.setResearch(text)}
                    defaultValue={this.state.text}
                ></TextInput>
                <TouchableOpacity
                    style={this.state.pressed ? styles.search_btn_pressed : styles.search_btn}
                    onPress={() => this.getSearch()}>
                    <Image
                        style={this.state.pressed ? styles.icon_pressed : styles.icon}
                        source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Magnifying_glass_icon.svg/1200px-Magnifying_glass_icon.svg.png" }} />
                    {/* <Text
                        style={this.state.pressed ? styles.search_text_btn_pressed : styles.search_text_btn}>
                        Go</Text> */}
                </TouchableOpacity>
                <View>
                    
                </View>

            {/* <Text>Open up homeScreen.js to start working on your app!</Text>
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
            /> */}
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
    input: {
        height: 40,
        minWidth:"75%",
        margin: 12,
        borderWidth: 1,
        borderRadius: 12,
        padding: 10,
        position: 'absolute',
        top: 10,
        left:10
    },
    icon: {
        width: 20,
        height:20,
        alignSelf: "center",
        position: "relative",
        tintColor: "black",
    },
    icon_pressed: {
        width: 20,
        height:20,
        alignSelf: "center",
        position: "relative",
        tintColor: "#fff",
    },
    search_btn: {
        backgroundColor: "#ffbde1",
        borderColor:"#6e3b6e",
        flex: 1,
        flexDirection: 'row',
        maxWidth: 120,
        maxHeight: 40,
        padding: 5,
        borderRadius: 25,
        borderWidth: 1,
        margin: 12,
        position: 'absolute',
        top: 12,
        right:10,
        padding:8
    },
    search_btn_pressed: {
        backgroundColor: "#6e3b6e",
        flex: 1,
        flexDirection: 'row',
        maxWidth: 120,
        maxHeight: 40,
        padding: 5,
        borderRadius: 25,
        margin: 12,
        position: 'absolute',
        top: 12,
        right:10,
        padding:8
    },
    search_text_btn: {
        fontSize: 16,
        color:"black"
    },
    search_text_btn_pressed: {
        fontSize: 16,
        color: "#fff",
    }
});
