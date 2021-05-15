import { Alert } from 'react-native';

const searchUser = async (name) => {
    return fetch('https://api.github.com/users/'+name)
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No user available to show, please verify the spelling');
    }})
        .then(data => {return (data)})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}

const searchRepos = async (name) => {
    return fetch('https://api.github.com/search/repositories?q='+name+'+in:name')
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No repositories available to show, please verify the spelling');
    }})
        .then(data => {return (data?.items)})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}


const searchRepo = async (name) => {
    return fetch('https://api.github.com/search/repositories?q='+name+'+in:name')
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No repository available to show, please verify the spelling');
    }})
        .then(data => {return (data?.items[0])})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}

const searchUsers = async (name) => {
    return fetch(`https://api.github.com/search/users?q=${name}+in:login`)
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No users available to show, please verify the spelling');
    }})
        .then(data => {return (data?.items)})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}

const searchMoreUsers = async (name, pages) => {
    return fetch(`https://api.github.com/search/users?q=${name}+in:login&page=${pages}`)
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No users available to show, please verify the spelling');
    }})
        .then(data => {return (data?.items)})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}

const searchMoreRepos = async (name, pages) => {
    return fetch(`https://api.github.com/search/repositories?q=${name}+in:name&pages=${pages}`)
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No repositories available to show, please verify the spelling');
    }})
        .then(data => {return (data?.items)})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}

const searchInUser = async (name) => {
    return fetch(`https://api.github.com/search/users?q=${name}+in:login`)
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No user available to show, please verify the spelling');
    }})
        .then(data => {return (data?.items[0])})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}

const searchUserRepos = async (name) => {
    const tabs = []
    return fetch(`https://api.github.com/users/${name}/repos`)
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No user\'s repositories available to show, please verify the spelling');
    }})
        .then(data => {return (data)})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}


const searchRepoIssues = async (name, repo) => {
    return fetch(`https://api.github.com/repos/${name}/${repo}/issues`)
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No repositories\'s issues available to show, please verify the spelling');
    }})
        .then(data => {return (data)})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}
const searchIssue = async (owner, repo, issue_number) => {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`)
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No issues available to show, please verify the spelling');
    }})
        .then(data => {return (data)})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}

const searchUserFollowers = async (name) => {
    return fetch(`https://api.github.com/users/${name}/followers`)
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No user\'s followers available to show, please verify the spelling');
    }})
        .then(data => {return (data)})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}

const searchUserRepo = async (name, repo) => {
    return fetch(`https://api.github.com/repos/${name}/${repo}`)
    .then((response) => {if(response.ok) {
        return response.json();
    } else {
        throw new Error('No user\'s repository available to show, please verify the spelling');
    }})
        .then(data => {return (data)})
    .catch( error => Alert.alert(
        "Error",
        error.message,
        [{text: "Try again", onPress: () => console.log("cancelled")}]
    ));
}


const searchRepoContributors = async (name, repo) => {
    return fetch(`https://api.github.com/repos/${name}/${repo}/contributors`)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
}

const searchByUrl = async (requete) => {
    return fetch(requete)
        .then(response => response.json())
        .then(data => {return (data)})
    .catch( error => {console.error(error)});
}

export const Api = {
    searchUser,
    searchUsers,
    searchMoreUsers,
    searchRepo,
    searchRepos,
    searchMoreRepos,
    searchInUser,
    searchUserRepos,
    searchRepoIssues,
    searchUserFollowers,
    searchUserRepo,
    searchRepoContributors,
    searchByUrl,
    searchIssue
    
};