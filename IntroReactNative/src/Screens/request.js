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
    // fetch('https://api.github.com/search/repositories?q=${name}+in:name/rate_limit')
    // .then((resp) => {
    //     console.log("SEARCH MORE REPOS RESP :")
    //     if (resp.redirected != false) {
    //         fetch(`https://api.github.com/search/users?q=${name}+in:login&page=${pages}`)
    //         .then((response) => {
    //             console.log("RESPONSE DANS SEARCH MORE REPOS")
    //             console.log(response)
    //             if(response.ok) {
    //                 console.log(response.ok)
    //                 return response.json();
    //             } else {
    //                 throw new Error('No users available to show, please verify the spelling');
    //             }
    //         })
    //         .then(data => {return (data?.items)})
    //         .catch( error => Alert.alert(
    //             "Error",
    //             error.message,
    //             [{text: "Try again", onPress: () => console.log("cancelled")}]
    //         ));
    //     } else {
    //         console.log("ERROR IN SEARCH MORE REPOS")
    //     }
    // })


    // console.log("DANS SEARCH MORE USERS AVANT FETCH")
    return fetch(`https://api.github.com/search/users?q=${name}+in:login&page=${pages}`)
    .then((response) => {
        console.log("RESPONSE IS :")
        console.log(response.status)
        if(response.ok) {
        console.log("DANS SEARCH USERS")
        console.log(response)
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
    // fetch('https://api.github.com/search/repositories?q=${name}+in:name/rate_limit')
    // .then((resp) => {
    //     console.log("SEARCH MORE REPOS RESP :")
    //     if (resp.redirected != false) {
    //         fetch(`https://api.github.com/search/repositories?q=${name}+in:name&page=${pages}`)
    //         .then((response) => {
    //             console.log("RESPONSE DANS SEARCH MORE REPOS")
    //             console.log(response)
    //             if(response.ok) {
    //                 console.log(response.ok)
    //                 return response.json();
    //             } else {
    //                 throw new Error('No repositories available to show, please verify the spelling');
    //             }
    //         })
    //         .then(data => {return (data?.items)})
    //         .catch( error => Alert.alert(
    //             "Error",
    //             error.message,
    //             [{text: "Try again", onPress: () => console.log("cancelled")}]
    //         ));
    //     } else {
    //         console.log("ERROR IN SEARCH MORE REPOS")
    //     }
    // })
    return fetch(`https://api.github.com/search/repositories?q=${name}+in:name&page=${pages}`)
    .then((response) => {
        console.log("RESPONSE IS :")
        console.log(response)
        if(response.status == 200) {
        return response.json();
    } else {
        console.log("ERROR")
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