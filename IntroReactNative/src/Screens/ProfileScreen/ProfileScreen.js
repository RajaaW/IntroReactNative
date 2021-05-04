import React, { useState } from "react";
import { StyleSheet, FlatList, SafeAreaView, TouchableOpacity, ScrollView, Text, View, Image, Dimensions } from 'react-native';
import {Api} from '../request'
import { Store } from "../storage";

const SCREEN_WIDTH = Dimensions.get('window').width;

            //open_issues //<span class="rad-menu-badge rad-bg-primary">23</span>
const ItemRepo = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <View style={styles.flex_container_item}>
            <Text style={[styles.title, textColor]}>{item.name}</Text>
        </View>
        
        <View style={styles.flex_container_item_icon}>
            <View style={(item.open_issues > 0) ? styles.flex_bubble_issues : {display:"none"}}>
                <Text style={styles.flex_text_issues}>{item.open_issues > 999 ? "999" : item.open_issues}</Text>
            </View>
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

    searchByUrl = async (url) => {
        try {
            const rep = await Api.searchByUrl(url);
            return rep
        } catch (err) {
            console.log("err", err)
        }
    }


    componentDidMount() {

        this.searchByUrl(this.props.route.params.userData?.repos_url).then((repos) => {
            this.setState({ repos })
        });
        
                
        this.searchByUrl(this.props.route.params.userData?.followers_url).then((followers) => {
            this.setState({ followers })
        })

        this.setState({ loading: false })
    }
        
    

    touchItemRepo = async (item) => {
        this.setState({ selectedIdRepo: item.id })
        const repoData = await Api.searchUserRepo(this.props.route.params.userData.login, item.name)
        this.props.navigation.push('RepoScreen', {repoData})
    }
    
    touchItemFollower = async (item) => {
        this.setState({ selectedIdFollower: item.id })
        // get user info
        // move to another user page and passing user value in params

        const userData = await Api.searchInUser(item.login)
        this.props.navigation.push('ProfileScreen', {userData})

    }

    changeFavProfil = async () => {
        if (this.state.fav) {
            Store.delUser(this.props.route.params.userData.login)
            this.setState({fav: false})
        }
        else {
            Store.addUser(this.props.route.params.userData)
            this.setState({fav: true})
        }
    }
    
   
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            selectedIdRepo:null,
            selectedIdFollower: null,
			enableScrollViewScroll: true,
            repos: null,
            followers: null,
            fav: false,
            
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
        if(this.state.loading) {
            return (
                <Text>Loading...</Text>
            )
        }
        // {console.log(this.props.route.params.userData)}
        return (
            <View
                style={{backgroundColor:"#fff"}}
                onStartShouldSetResponderCapture={() => {
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
                            <Text style={styles.flex_text_info}>
                                <Text style={styles.flex_type}> {this.props.route.params.userData.type} </Text>
                                <Text style={styles.flex_login}> {this.props.route.params.userData.login} </Text>
                            </Text>
                            <Text style={styles.flex_name}> {this.props.route.params.userData.name} </Text>
                            <TouchableOpacity
                                style={this.state.pressed ? styles.search_btn_pressed : styles.search_btn}
                                onPress={() => { this.changeFavProfil()}}>
                                <Image
                                style={this.state.fav ? styles.icon_fav : styles.icon_unfav}
                                source={this.state.fav ? require('../../../assets/like.png') : require('../../../assets/unlike.png')} />
                            </TouchableOpacity>
     
                            <View style={(this.props.route.params.userData.location) ? styles.flex_bottom_info : {display:"none"}}>
                                <Image
                                    source={{ uri: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" }}
                                    style={styles.flex_icon}/>
                                <Text style={styles.flex_location}> {this.props.route.params.userData.location}</Text>
                            </View>
                        </View>





                        <View style={styles.flex_container_list}>
                        <Text style={styles.flex_text_list_title} > Repositories </Text>
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
</View>

                        <View style={styles.flex_container_list}>
                            <Text style={styles.flex_text_list_title} >Followers </Text>
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
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        
        borderRadius: 12,
        
        
    },
    flex_container_item: {
        flex: 1,
        flexDirection: 'row'
    },
    flex_container_item_icon: {
        
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        
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
    flex_container_list: {
        overflow: "hidden",
        backgroundColor: "white",
        //textAlign: "center",
        borderRadius: 12,
        //position: "relative",
        
        width: 300,
        //marginBottom: 1,
        //marginLeft: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
        //paddingTop:30,
        marginBottom:20,
    },
    flex_text_info: {

        justifyContent: "center",
        alignItems: "center"
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
        color:"#6e3b6e",
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
        marginTop:5,
        marginBottom: 7,
    },
    flex_bubble_issues: {
        width: 25,
        height: 25,
        borderRadius: 100 / 2,
        backgroundColor: "#db5ea1",
        alignItems:"center",
        fontSize: 3,
        marginRight:20
        
    },
    flex_text_issues: {
        color: "#fff",
        marginTop: 2
    },
    flex_text_list_title: {
        marginTop: 8,
        alignSelf: "center",
        fontSize: 18,
        
        fontWeight: "bold",
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
});