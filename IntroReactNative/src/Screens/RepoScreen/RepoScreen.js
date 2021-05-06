import React, { useState } from "react";
import { StyleSheet, FlatList, SafeAreaView, TouchableOpacity  ,ScrollView, Text, View, Image,Dimensions  } from 'react-native';
import { Api } from '../request'

const SCREEN_WIDTH = Dimensions.get('window').width;
const ItemIssue = ({ item, onPress, backgroundColor, textColor, titleColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text>
            <Text style={[styles.title, titleColor]}>{item.title}</Text>
            <Text style={[styles.text, textColor]}>: ({item.state}) by </Text>
            <Text style={[styles.textUsername, textColor]}>{item.user?.login}</Text>
        </Text>
        {(item.body) ? (
            <Text style={[styles.text, textColor]}>{item.body.substring(0,8)} ...</Text>
        ) : (null)}


    </TouchableOpacity>
)
//itemContributors

// , state, body and user 
const ItemContributor = ({ item, onPress, backgroundColor, textColor }) => (
     <TouchableOpacity onPress={onPress} style={[styles.itemContributors, backgroundColor]}>
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
export default class RepoScreen extends React.Component {

    searchByUrl = async (url) => {
        try {
            const rep = await Api.searchByUrl(url);
            return rep
        } catch (err) {
            console.log("err", err)
        }
    }


    componentDidMount() {

        this.searchByUrl(this.props.route.params.repoData?.issues_url.split("{/number}")[0]).then((issues) => {
            this.setState({ issues })
        });
        
        this.searchByUrl(this.props.route.params.repoData?.contributors_url).then((contributors) => {
            this.setState({ contributors })
        })

        this.setState({ loading: false })
    }



    touchItemIssue = async (item) => {
        this.setState({ selectedIdIssue: item.id })
        const issueData = await Api.searchIssue(this.props.route.params.repoData.owner.login,this.props.route.params.repoData.name, item.number )
        this.props.navigation.navigate('IssueScreen', { issueData})
    }
    
    touchItemContributor = async (item) => {
        this.setState({ selectedIdContributor: item.id })
        
        const userData = await Api.searchInUser(item.login)
        console.log(userData)
        this.props.navigation.push('ProfileScreen', { userData })
    }
    constructor(props) {
        super(props);
        
        this.state = {
            fav: false,
            loading: true,
            selectedIdIssue:null,
            selectedIdContributor: null,
			enableScrollViewScroll: true,
            issues: null,         
            contributors: null, 
            
            // No need to touch renderIssue & renderContributor
            renderIssue : ({ item }) => {
                const backgroundColor = item.id === this.state.selectedIdIssue ? "#6e3b6e" : "#ffffff";
                const color = item.id === this.state.selectedIdIssue ? 'white' : 'black';
                const colorT = item.id === this.state.selectedIdIssue ? 'white' : '#6e3b6e';
                
                return (
                <ItemIssue
                    item={item}
                    onPress={() => this.touchItemIssue(item)}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                    titleColor={{ color:colorT }}
                />
                );
            },
            renderContributor : ({ item }) => {
                const backgroundColor = item.id === this.state.selectedIdContributor ? "#6e3b6e" : "#ffffff";
                const color = item.id === this.state.selectedIdContributor ? 'white' : 'black';
                return (
                <ItemContributor
                    item={item}
                    onPress={() => this.touchItemContributor(item)}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
                />
                );
            }
        }
       // console.log(this.props.route.params.repoData)
    }
    

    loadingList = () => {
            return (
                <Image
                    style={{ width: 100, height:100, alignSelf:"center"}}
                        source={{ uri: "https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif" }} />
                        //source={{ uri: "https://cdn.dribbble.com/users/1133112/screenshots/3164394/__.gif" }} />
                    
            )
    }


    changeFavRepo = async () => {
        if (this.state.fav) {
            Store.delRepo(this.props.route.params.repoData.name)
            this.setState({fav: false})
        }
        else {
            Store.addRepo(this.props.route.params.repoData)
            this.setState({fav: true})
        }
    }

    //Name, is private, is a fork, description, size and default branch name
    render() {
        if(this.state.loading) {
            return (
                <Image
                    style={{ width: 300, height:200}}
                        //source={{ uri: "https://miro.medium.com/max/1600/1*CsJ05WEGfunYMLGfsT2sXA.gif" }} />
                        source={{ uri: "https://cdn.dribbble.com/users/1133112/screenshots/3164394/__.gif" }} />
            )
        } 
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
                            <TouchableOpacity
                                style={this.state.pressed ? styles.btn_fav : styles.btn_fav}
                                onPress={() => { this.changeFavRepo()}}>
                                <Image
                                style={this.state.fav ? styles.icon_fav : styles.icon_unfav}
                                source={{uri:"https://cdn.iconscout.com/icon/free/png-256/heart-56-76703.png"}} />
                            </TouchableOpacity>
                            <Text style={styles.flex_text_info}>
                                <Text style={styles.flex_name}>{ this.props.route.params.repoData.name} </Text>
                            </Text>
                            <Text style={styles.flex_text_info}>
                            
                                <Text>{this.props.route.params.repoData.size} KB - </Text>
                                <Image
                                    style={{ width: 17, height:17, alignSelf:"center"}}
                                    source={{ uri: "https://icons-for-free.com/iconfiles/png/128/bx+git+repo+forked-1325051881625929746.png" }} />
                                <Text>{ this.props.route.params.repoData.forks_count ? 'Forked '+ this.props.route.params.repoData.forks_count +' times': 'Not forked' } </Text>

                            </Text>
                            {(this.props.route.params.repoData.description) ? (
                                <Text style={styles.flex_text_info}>
                                    <Text style={styles.flex_descrition}> {this.props.route.params.repoData.description}</Text>
                                </Text>
                            ) : (null)
                            }
                            <Text style={styles.flex_text_info_fin}>
                                <Text>{this.props.route.params.repoData.private ? 'Private' : 'Not Private' }  - </Text>
                                
                                <Image
                                    style={{ width: 20, height:20, alignSelf:"center"}}
                                    source={{ uri: "https://cdn.iconscout.com/icon/free/png-256/git-branch-458285.png" }} />
                                <Text>{ this.props.route.params.repoData.default_branch}</Text>
                            </Text>
                    
                        </View>
                        
                        <View style={styles.flex_container_list}>
                            <Text style={styles.flex_text_list_title}>Issues </Text>
                            {(this.state.issues) ? (
                            <View   onStartShouldSetResponderCapture={() => {
                                        this.setState({ enableScrollViewScroll: false });
                                        if (this._myScroll.contentOffset === 0 && this.state.enableScrollViewScroll === false) {
                                            this.setState({ enableScrollViewScroll: true });
                                        }}}
                                style={styles.container}>
                                <FlatList
                                    data={this.state.issues}
                                    renderItem={this.state.renderIssue}
                                    keyExtractor={(item) => item.id}
                                    extraData={this.state.selectedIdIssue}
                                />
                            </View>
                            ) : (
                                this.loadingList()
                            )}
                        </View>
                        
                        <View style={styles.flex_container_list}>
                            <Text style={styles.flex_text_list_title}>Contributors </Text>
                            {(this.state.contributors) ? (
                                <View onStartShouldSetResponderCapture={() => {
                                            this.setState({ enableScrollViewScroll: false });
                                            if (this._myScroll.contentOffset === 0 && this.state.enableScrollViewScroll === false) {
                                                this.setState({ enableScrollViewScroll: true });
                                            }}}
                                    style={styles.container}>
                                    <FlatList
                                    scrollEnabled={true}
                                        data={this.state.contributors}
                                        renderItem={this.state.renderContributor}
                                        keyExtractor={(item) => item.id}
                                        extraData={this.state.selectedIdContributor}
                                    />
                                </View>
                            ) : (
                                this.loadingList()
                            )}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    
    icon_fav: {
        width: 60,
        height: 60,
        alignSelf: "flex-end",
        tintColor:"red"
    },
    icon_unfav: {
        width: 60,
        height: 60,
        alignSelf: "flex-end",
        tintColor:"grey"
    },
    btn_fav: {
        width: 60,
        height: 60,
        position: 'absolute',
        top: 10,
        right: 20,
    },
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
        
        borderBottomWidth:0.4,
        borderBottomColor:"#a1adc2",
    },
    
    itemContributors: {
        padding: 10,
        fontSize: 16,
        height: 44,
        
    flexDirection: 'row',
    justifyContent: 'flex-start',
        fontWeight: "bold",
        borderBottomWidth:0.4,
        borderBottomColor:"#a1adc2",
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
        alignItems: "center",
        alignSelf: "center",
    },
    flex_text_info_fin: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom:20,
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
    flex_descrition: {
        fontWeight: "normal",
        fontSize: 16,
        fontVariant: ["small-caps"],
    },
    flex_name: {
        fontWeight: "bold",
        fontSize: 19,
        color:"#6e3b6e",
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
    views: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: SCREEN_WIDTH,
        marginTop:30,
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
        fontSize: 16,
        fontWeight: "bold"
    },
});