import React from 'react';
import {  View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';



export default class HomeScreen extends React.Component {

    constructor(props) {super(props)}

    render() {
        
        return (
            <View style={styles.view}>
                <View  style={styles.welcome_view}>
                    <Text style={styles.welcome}>
                        <Text>WELCOME</Text>
                    </Text>
                </View>
                <View  style={styles.title_view}>
                    <Text style={styles.title}>
                        <Text>Introduction to React Native</Text>
                    </Text>
                </View>
                
                <Image
                    style={styles.gif}
                    source={{ uri: "https://i.giphy.com/media/eNAsjO55tPbgaor7ma/giphy.gif" }} />

                <View  style={styles.credits_view}>
                    <View style={styles.credits}>
                        <Text style={styles.text}>Made by:</Text>
                        <Text style={styles.text_name}>Rajaa Salmi</Text>
                        <Text style={styles.text_name}>Marian Bret</Text>
                        <Text style={styles.text_name}>Benjamin Renaud</Text>
                        <Text style={styles.text_name}>Camille Villa</Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.start}
                    onPress={() => this.props.navigation.navigate('Search')}>
                    <Text style={styles.start_txt}>  START</Text>
                </TouchableOpacity>
            </View>
    );
    }
}
const styles = StyleSheet.create({
    view: {
        backgroundColor: "#fff",
        height: "100%",
        width: "100%",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome_view: {
        alignSelf: "center",
        position: "absolute",
        top:30,
    },
    welcome: {
        fontWeight: "bold",
        fontSize: 40,
        color:"#6e3b6e",
    },
    title_view: {
        alignSelf: "center",
        position: "absolute",
        top: 100,
        height:50
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        // textShadowColor: '#ba80ba',
        // textShadowOffset: {width: 3, height: 12},
        // textShadowRadius: 40,
        height:50,
    },
    gif: {
        width: 100,
        height: 100,
        position: "absolute",
        top: 200,
        tintColor:'#6e3b6e'
    },
    start: {
        backgroundColor: "#6e3b6e",
        width: "50%",
        height:50,
        padding: 10,
        position: "absolute",
        bottom: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#6e3b6e",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        borderRadius:10
    },
    start_txt: {
        fontVariant: ["small-caps"],
        fontWeight: "bold",
        fontSize: 20,
        color:"#fff",
    },
    credits: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontVariant: ["small-caps"],
        fontSize: 13,
    },
    text_name: {
        fontWeight: "bold",
    },
    credits_view: {
        position: "absolute",
        bottom: 250,
    },
    
});
