//import * as React from 'react';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, FlatList ,Dimensions  } from 'react-native';


import {Api} from '../request'
const SCREEN_WIDTH = Dimensions.get('window').width;


const ItemRepo = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <View style={styles.flex_container_item}>
            <Text style={[styles.title, textColor]}>{item.name}</Text>
        </View>
        
        <View style={styles.flex_container_item_icon}>
            <View style={styles.flex_bubble_issues}>
                <Text style={styles.flex_text_issues}>{item.open_issues > 999 ? "999" : item.open_issues}</Text>
            </View>
            <Image source={{ uri: "https://image.flaticon.com/icons/png/128/748/748073.png" }}
                    style={styles.flex_icon_item} />
        </View>
    </TouchableOpacity>
)

const ItemUsers = ({ item, onPress, backgroundColor, textColor }) => (
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

export default class HomeScreen extends React.Component {
    
    touchItemRepo = async (item) => {
        this.setState({ selectedIdRepo: item.id })
        const repoData = await Api.searchUserRepo(this.props.route.params.userData.login, item.name)
        this.props.navigation.navigate('RepoScreen', {repoData})
    }
    
    touchItemUsers = async (item) => {
        this.setState({ selectedIdUsers: item.id })
        // get user info
        // move to another user page and passing user value in params

        const userData = await Api.searchInUser(item.login)
        this.props.navigation.push('ProfileScreen', {userData})

    }



    constructor(props) {
        super(props);

        this.state = {
            text: "",
            oldText: "",
            pressed: false,
            repoSelected: true,
            loading: true,
            selectedIdRepo:null,
            selectedIdUsers: null,
            users: null,
            repos:null,

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
            renderUsers : ({ item }) => {
                const backgroundColor = item.id === this.state.selectedIdUsers ? "#6e3b6e" : "#ffffff";
                const color = item.id === this.state.selectedIdUsers ? 'white' : 'black';
                return (
                <ItemUsers
                    item={item}
                    onPress={() => this.touchItemUsers(item)}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                />
                );
            }
        }

    }

    selectTab = (tabSelected) => {
        switch (tabSelected) {
            case "Repositories":
                this.setState({repoSelected:true})
                break;
        
            default:
                this.setState({repoSelected:false})
                break;
        }
    }

    setResearch = (text) => {
        this.setState({ text })
        this.setState({pressed: false})
    }

    getSearch = async () => {
        console.log(this.state.text)
        try {
            const users = await Api.searchUsers(this.state.text);
            const repos = await Api.searchRepos(this.state.text);

            // const rep = await Api.searchByUrl(url);
            // return rep

        this.setState({
            pressed: true,
            oldText: this.state.text,
            users:users,
            repos:repos
        })

        } catch (err) {
            console.log("err", err)
        }

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
                <Text style={this.state.oldText ? styles.text_result : {display:"none"}}>
                    <Text>Result for </Text>
                    <Text style={{fontWeight: "bold", color:"#6e3b6e"}}>{this.state.oldText}</Text>
                    <Text> :</Text>
                </Text>
                {(this.state.oldText) ?(
                    
                    <View style={styles.container_result}>
                        <View style={styles.tabs_btn_container}>
                            <TouchableOpacity
                                style={this.state.repoSelected ? styles.tabs_btn_selected : styles.tabs_btn}
                                onPress={() => this.selectTab("Repositories")}>
                                <Text style={{ color: "#fff", fontSize: 20 }}> Repositories </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={this.state.repoSelected ? styles.tabs_btn : styles.tabs_btn_selected}
                                onPress={() => this.selectTab("Users")}>
                                <Text style={{ color: "#fff", fontSize: 20 }}> Users </Text>
                            </TouchableOpacity>
                        </View>


                        <ScrollView style={this.state.repoSelected ? '' : {display:"none"} }>
                            <FlatList
                                data={this.state.repos}
                                renderItem={this.state.renderRepo}
                                keyExtractor={(item) => item.id}
                                extraData={this.state.selectedIdRepo}
                            />
                        
                        </ScrollView>
                        <ScrollView style={this.state.repoSelected ? {display:"none"} : "" }>
                            <FlatList
                                data={this.state.users}
                                renderItem={this.state.renderUsers}
                                keyExtractor={(item) => item.id}
                                extraData={this.state.selectedIdUsers}
                            />
                        
                        </ScrollView>
                    </View>



                    ) : (null)}

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
    },
    text_result: {
        position: 'absolute',
        top: 75,
        left:30,
    },
    container_result: {
        
        backgroundColor: "#fff",
        position: 'absolute',
        width: "90%",
        height: "84%",
        top: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
    },
    tabs_btn_container: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
    },
    tabs_btn_selected: {
        minWidth: "50%",
        height: 40,
        backgroundColor: "#6e3b6e",
        alignItems:"center",
        justifyContent: 'center',
        fontSize: 30,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
    },
    tabs_btn: {
        minWidth: "50%",
        height: 40,
        backgroundColor: "grey",
        alignItems:"center",
        justifyContent: 'center',
        fontSize:30,
        borderTopLeftRadius:12,
        borderTopRightRadius:12,
    }
});
