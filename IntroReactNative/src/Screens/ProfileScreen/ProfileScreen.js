import React, { useState } from "react";
import { StyleSheet, FlatList, Icon, TouchableOpacity  ,ScrollView, Text, View, Image,Dimensions  } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ItemRepo = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <View style={styles.flex_container_item}>
            <Text style={[styles.title, textColor]}>{item.name}</Text>
        </View>
        
        <View style={styles.flex_container_item_icon}>
            <Image source={{ uri: "https://image.flaticon.com/icons/png/128/748/748073.png" }}
                    style={styles.flex_icon_item} />
        </View>
    </TouchableOpacity>
)

const ItemFollower = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <View style={styles.flex_container_item}>
            <Image
                source={{ uri: item.avatar_url }}
                style={styles.flex_img_follower}
            />
            <Text style={[styles.title, textColor]}>{item.login}</Text>
        </View>
        
        <View style={styles.flex_container_item_icon}>
            <Image source={{ uri: "https://image.flaticon.com/icons/png/128/748/748073.png" }}
                    style={styles.flex_icon_item} />
        </View>
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


                        
                        <View style={styles.flex_container}>
                            <Image
                                source={{ uri: this.props.route.params.userData.avatar_url }}
                                style={styles.flex_img}
                            />
                            <Text>
                                <Text style={styles.flex_type}> {this.props.route.params.userData.type} </Text>
                                <Text style={styles.flex_login}> {this.props.route.params.userData.login} </Text>
                            </Text>
                            <Text style={styles.flex_name}> {this.props.route.params.userData.name} </Text>
                            <View style={styles.flex_bottom_info}>
                                <Image
                                    source={{ uri: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" }}
                                    style={styles.flex_icon}/>
                                <Text style={styles.flex_location}> {this.props.route.params.userData.location}</Text>
                            </View>
                        </View>





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
    body: {

        fontFamily: "Open Sans",
        margin: 0,
        padding: 0,
        margin: 2,
        color:"#37474f",
    },
    views: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,
        marginTop: 10,
        
        display: "flex",
    },
    container: {
        width: 300,
        maxHeight: 200,
        marginTop:30,
        marginBottom: 30,
        
        
    },
    flex_container_item: {
        flex: 1,
        flexDirection: 'row'
    },
    flex_container_item_icon: {
        
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        padding: 10,
        fontSize: 16,
        height: 44,
        
    flexDirection: 'row',
    justifyContent: 'flex-start',
        fontWeight: "bold",
        borderBottomWidth:0.4,
        borderBottomColor:"#a1adc2",
    },
    title: {
        fontSize: 15,
    },

    flex_container: {
        overflow: "hidden",
        backgroundColor: "white",
        textAlign: "center",
        borderRadius: 12,
        position: "relative",
        width: 280,
        marginBottom: 1,
        marginLeft: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        paddingTop:30,
    },

    flex_bottom_info: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent:"center"
    },
    flex_img: {
        width: 110,
        height: 110,
        borderRadius: 60,
        alignSelf: "center",
        marginBottom:5
    },
    flex_icon: {
        width: 17,
        height: 19,
        alignSelf: 'center',
        marginBottom:7
    },
    flex_name: {
        fontWeight: "normal",
        fontSize: 16,
        fontVariant: ["small-caps"],
    },
    flex_login: {
        fontWeight: "bold",
        fontSize: 16,
    },
    flex_type: {
        fontWeight: "normal",
        fontSize: 13,
        fontVariant: ["small-caps"],
    },
    flex_location: {
        fontWeight: "normal",
        fontSize: 15,
        fontStyle: "italic",
        color:"#3d76b8",
        marginBottom:15,
        marginTop:10
    },
    flex_img_follower: {
        width: 30,
        height: 30,
        borderRadius: 60,
        alignSelf: "flex-start",
        marginRight: 15,
    },
    flex_icon_item: {
        width: 17,
        height:19,
        alignSelf: "center",
        
        marginBottom: 7,
    }
});