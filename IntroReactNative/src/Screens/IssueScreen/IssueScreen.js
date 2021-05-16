import React, { useState } from "react";
import { StyleSheet, FlatList, SafeAreaView, TouchableOpacity  ,ScrollView, Text, View, Image,Dimensions  } from 'react-native';
import { Api } from '../request'

const SCREEN_WIDTH = Dimensions.get('window').width;



export default class IssueScreen extends React.Component {
    toucheUsername = async (user) => {
        // get issue info
        // move to another issue page and passing issue value in params
        const userData = await Api.searchInUser(user.login)
        this.props.navigation.push('ProfileScreen', { userData})
       // alert("go to page of the issue") 
    }
    
    constructor(props) {
        super(props);
        
        this.state = {
			enableScrollViewScroll: true,
            
           
        }
       // console.log(this.props.route.params.issueData)
    }

    
    //Name, is private, is a fork, description, size and default branch name
    render() {
        return (
            <View onStartShouldSetResponderCapture={() => {
          this.setState({ enableScrollViewScroll: true });
      }}>
                <ScrollView scrollEnabled={this.state.enableScrollViewScroll}
                    ref={myScroll => (this._myScroll = myScroll)}
                    contentContainerStyle={this.state.content}>
                    <View style={styles.views} >
                        
                        <View style={styles.flex_container}>
                            <Text style={styles.flex_type}>USER  </Text>
                            <Text onPress={() => this.toucheUsername(this.props.route.params.issueData.user)} style={styles.flex_login}> { this.props.route.params.issueData.user?.login}</Text>
                        </View>

                        <View style={styles.flex_container}>
                            <Text style={styles.flex_type}>{ this.props.route.params.issueData.title}</Text>
                            <Text style={styles.flex_type_state}>STATE : </Text>
                            <Text style={styles.flex_type_desc}>{ this.props.route.params.issueData.state}</Text>
                        </View>
                        
                        <View style={styles.flex_container}>
                            <Text style={styles.flex_type}>DESCRIPTION  </Text>
                            <Text style={styles.flex_type_desc}>{ this.props.route.params.issueData.body}</Text>
                        </View>
                        
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flex_login: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: "5%",
        marginTop: "2%"
    },
    flex_type: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 17,
        fontVariant: ["small-caps"],
        color:"#6e3b6e",
        fontWeight: "bold",
    },
    flex_type_state: {
        textAlign: "center",
        marginTop: "8%",
        fontWeight: "bold",
        fontSize: 14,
        color:"#6e3b6e",
    },
    flex_type_desc: {
        textAlign: "center",
        marginTop: "2%",
        marginBottom: "5%",
        fontSize: 15,
        fontVariant: ["small-caps"],
    },
    flex_text_info: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: "5%",
        marginTop: "8%"
    },
    flex_container: {
        overflow: "hidden",
        //backgroundColor: "#fff0fa",
        backgroundColor: "#fff",
        textAlign: "center",
        borderRadius: 50,
        position: "relative",
        width: 390,
        marginBottom: 10,
        marginLeft: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        paddingTop: 20,
        paddingLeft: 30,
        paddingRight:30,
        borderBottomWidth:0,

    },
    views: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,
        marginTop:30,
    },
    container: {
        width: 300,
        height: 200,
        marginTop:30,
        marginBottom:30,
        
    },
    containerBig: {
        width: 350,
        height: 250,
        marginTop:30,
        marginBottom:30,
        
    },
    item: {
        padding: 10,
        fontSize: 15,
    },
    text: {
        fontSize: 15,
        fontWeight: "normal"
    },
    textUsername: {
        fontSize: 15,
        fontWeight: "normal",
        fontStyle: "italic",
        fontVariant: ["small-caps"],
    },
    title: {
        fontSize: 15,
        fontWeight: "bold"
    },
});