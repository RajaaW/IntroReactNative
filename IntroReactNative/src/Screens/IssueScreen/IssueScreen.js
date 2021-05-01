import React, { useState } from "react";
import { StyleSheet, FlatList, SafeAreaView, TouchableOpacity  ,ScrollView, Text, View, Image,Dimensions  } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;



export default class IssueScreen extends React.Component {
    toucheUsername = (user) => {
        // get issue info
        // move to another issue page and passing issue value in params
        this.props.navigation.navigate('ProfileScreen', { userData:user})
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
                        
                        <Text>Title:  { this.props.route.params.issueData.title}</Text>
                        <Text>state:  { this.props.route.params.issueData.state}</Text>
                        <Text onPress={() => this.toucheUsername(this.props.route.params.issueData.user)}>user:  { this.props.route.params.issueData.user?.login}</Text>
                        <Text>description:  { this.props.route.params.issueData.body}</Text>
                        
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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