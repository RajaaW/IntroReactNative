import React, { useState } from "react";
import { StyleSheet, FlatList, SafeAreaView, TouchableOpacity  ,ScrollView, Text, View, Image,Dimensions  } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ItemIssue = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text>
            <Text style={[styles.title, textColor]}>{item.title}</Text>
            <Text style={[styles.text, textColor]}>: ({item.state}) by </Text>
            <Text style={[styles.textUsername, textColor]}>{item.user?.login}</Text>
        </Text>
        {(item.body) ? 
        <Text style={[styles.text, textColor]}>{item.body}</Text>
        : (null)}


    </TouchableOpacity>
)

// , state, body and user 
const ItemContributor = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
        <Text style={[styles.text, textColor]}>{item.login}</Text>
    </TouchableOpacity>
)
export default class RepoScreen extends React.Component {
    touchItemIssue = (item) => {
        this.setState({ selectedIdIssue: item.id })
        // get issue info
        // move to another issue page and passing issue value in params
        this.props.navigation.navigate('IssueScreen', { issueData:item})
       // alert("go to page of the issue") 
    }
    
    touchItemContributor = (item) => {
        this.setState({ selectedIdContributor: item.id })
        // get user info
        // move to another user page and passing user value in params
        alert("go to page of the contributor")
    }
    constructor(props) {
        super(props);
        
        this.state = {
            selectedIdIssue:null,
            selectedIdContributor: null,
			enableScrollViewScroll: true,
            issues: this.props.route.params.repoData?.issues_url,         // replace by request
            contributors: this.props.route.params.repoData?.contributors_url, // replace by request
            
            // No need to touch renderIssue & renderContributor
            renderIssue : ({ item }) => {
                const backgroundColor = item.id === this.state.selectedIdIssue ? "#6e3b6e" : "#ffffff";
                const color = item.id === this.state.selectedIdIssue ? 'white' : 'black';
                
                return (
                <ItemIssue
                    item={item}
                    onPress={() => this.touchItemIssue(item)}
                    backgroundColor={{ backgroundColor }}
                    textColor={{ color }}
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
                        
                        <Text>name:  { this.props.route.params.repoData.name}</Text>
                        <Text>isPrivate:  { this.props.route.params.repoData.private ? 'yes' : 'no' }</Text>
                        <Text>isFork:  { this.props.route.params.repoData.fork ? 'yes' : 'no' }</Text>
                        <Text>description:  { this.props.route.params.repoData.description}</Text>
                        <Text>size:  { this.props.route.params.repoData.size}</Text>
                        <Text>default branch name:  { this.props.route.params.repoData.default_branch}</Text>
                        <Text>issues: </Text>
                        <View   onStartShouldSetResponderCapture={() => {
                                    this.setState({ enableScrollViewScroll: false });
                                    if (this._myScroll.contentOffset === 0 && this.state.enableScrollViewScroll === false) {
                                        this.setState({ enableScrollViewScroll: true });
                                    }}}
                            style={styles.containerBig}>
                            <FlatList
                                data={this.state.issues}
                                renderItem={this.state.renderIssue}
                                keyExtractor={(item) => item.id}
                                extraData={this.state.selectedIdIssue}
                            />
                        </View>

                        <Text>contributors: </Text>
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