import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Octokit } from "@octokit/core";


export default class ApiScreen extends React.Component {
    constructor(props) {
        
        super(props);
        this.state = {
            profil: {}
        }
    }

    createRepo (name, priv, fork, desc, size, dbn) {
        const repo = {name : name, priv : priv, fork : fork, desc : desc, size: size, dbn : dbn}
        return (repo)
    }
    
    async searchUser (name) {
        fetch('https://api.github.com/users/'+name)
		.then(response => response.json())
		.then( data => console.log(data))
		.catch( error => console.error(error));
    }

    async searchInUser (name) {
        fetch(`https://api.github.com/search/users?q=${name}+in:login`)
		.then(response => response.json())
		.then( data => console.log(data))
		.catch( error => console.error(error));
    }

    async searchUserRepos (name) {
        const tabs = []
        fetch(`https://api.github.com/users/${name}/repos`)
		.then(response => response.json())
        .then(data => console.log(data))
		.catch( error => console.error(error));
    }


    async searchRepoIssus (name, repo) {
        fetch(`https://api.github.com/repos/${name}/${repo}/issues`)
		.then(response => response.json())
		.then( data => console.log(data))
		.catch( error => console.error(error));
    }

    async searchUserFollowers (name) {
        fetch(`https://api.github.com/users/${name}/followers`)
		.then(response => response.json())
		.then( data => console.log(data))
		.catch( error => console.error(error));
    }

    async searchUserRepo (name, repo) {
        fetch(`https://api.github.com/repos/${name}/${repo}`)
		.then(response => response.json())
		.then( data => console.log(data))
		.catch( error => console.error(error));
    }


    async searchRepoContributors (name, repo) {
        fetch(`https://api.github.com/repos/${name}/${repo}/contributors`)
		.then(response => response.json())
		.then( data => console.log(data))
		.catch( error => console.error(error));
    }

    render() {
        return (
        <View style={styles.container}>
            <Text>Open up ApiScreen</Text>
            {console.log(this.profil)}
            <Button
                title="user"
                onPress={() => this.searchUser("benjaminrenaud3")}
            />
            <Button
                title="user in list"
                onPress={() => this.searchInUser("benjamin")}
            />
            <Button
                title="repos"
                onPress={() => this.searchUserRepos("benjaminrenaud3")}
            />
            <Button
                title="user follower"
                onPress={() => this.searchUserFollowers("benjaminrenaud3")}
            />
            <Button
                title="repo"
                onPress={() => this.searchUserRepo("benjaminrenaud3", "tetris")}
            />
            <Button
                title="repo contrib"
                onPress={() => this.searchRepoContributors("benjaminrenaud3", "tetris")}
            />

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
});
