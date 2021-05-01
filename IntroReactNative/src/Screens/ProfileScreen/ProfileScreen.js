import React, { useState } from "react";
import { StyleSheet, FlatList, SafeAreaView, TouchableOpacity  ,ScrollView, Text, View, Image,Dimensions  } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ItemRepo = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.name}</Text>
    </TouchableOpacity>
)

const ItemFollower = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.login}</Text>
    </TouchableOpacity>
)
export default class ProfileScreen extends React.Component {
    touchItemRepo = (item) => {
        this.setState({ selectedIdRepo: item.id })
        // get repo info
        // move to another repo page and passing repo value in params
        alert("go to page of the repo") 
    }
    
    touchItemFollower = (item) => {
        this.setState({ selectedIdFollower: item.id })
        // get user info
        // move to another user page and passing user value in params
        alert("go to page of the follower")
    }
    constructor(props) {
        super(props);
        
        this.state = {
            selectedIdRepo:null,
            selectedIdFollower: null,
			enableScrollViewScroll: true,
            repos: this.props.route.params.userData?.repos_url,         // replace by request
            followers: this.props.route.params.userData?.followers_url, // replace by request
            
            // No need to touch renderRepo & renderFollower
            renderRepo : ({ item }) => {
                const backgroundColor = item.id === this.state.selectedIdRepo ? "#6e3b6e" : "#ffffff";
                const color = item.id === this.state.selectedIdRepo ? 'white' : 'black';
                return (
                <ItemRepo
                    item={item}
                    onPress={() => this.touchItemRepo(item)}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                />
                );
            },
            renderFollower : ({ item }) => {
                const backgroundColor = item.id === this.state.selectedIdFollower ? "#6e3b6e" : "#ffffff";
                const color = item.id === this.state.selectedIdFollower ? 'white' : 'black';
                return (
                <ItemFollower
                    item={item}
                    onPress={() => this.touchItemFollower(item)}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                />
                );
            }
        }
        console.log(this.props.route.params.userData)
    }

    
    //Login, avatar and type 
    render() {
        return (
            <View onStartShouldSetResponderCapture={() => {
          this.setState({ enableScrollViewScroll: true });
      }}>
                <ScrollView scrollEnabled={this.state.enableScrollViewScroll}
                    ref={myScroll => (this._myScroll = myScroll)}
                    contentContainerStyle={this.state.content}>
                    <View style={styles.views} >
                        <Image
                            source={{ uri: this.props.route.params.userData.avatar_url }}
                            style={{  width: 100, height: 100}}
                        />
                        <Text>type:  { this.props.route.params.userData.type}</Text> 
                        <Text>login: {this.props.route.params.userData.login}</Text>
                        <Text>repos: </Text>
                        <View   onStartShouldSetResponderCapture={() => {
                                    this.setState({ enableScrollViewScroll: false });
                                    if (this._myScroll.contentOffset === 0 && this.state.enableScrollViewScroll === false) {
                                        this.setState({ enableScrollViewScroll: true });
                                    }}}
                            style={styles.container}>
                            <FlatList
                                data={this.state.repos}
                                renderItem={this.state.renderRepo}
                                keyExtractor={(item) => item.id}
                                extraData={this.state.selectedIdRepo}
                            />
                        </View>

                        <Text>followers: </Text>
                        <View onStartShouldSetResponderCapture={() => {
                                    this.setState({ enableScrollViewScroll: false });
                                    if (this._myScroll.contentOffset === 0 && this.state.enableScrollViewScroll === false) {
                                        this.setState({ enableScrollViewScroll: true });
                                    }}}
                            style={styles.container}>
                            <FlatList
                            scrollEnabled={true}
                                data={this.state.followers}
                                renderItem={this.state.renderFollower}
                                keyExtractor={(item) => item.id}
                                extraData={this.state.selectedIdFollower}
                            />
                        </View>
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
    item: {
        padding: 10,
        fontSize: 15,
        height: 44,
    },
    title: {
        fontSize: 15,
    },
});