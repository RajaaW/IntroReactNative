const searchUser = async (name) => {
    return fetch('https://api.github.com/users/'+name)
    .then(response => response.json())
        .then(data => { return (data)})
        .catch(error => console.error(error));
}

const searchRepos = async (name) => {
    return fetch('https://api.github.com/search/repositories?q='+name+'+in:name')
    .then(response => response.json())
        .then(data => { return (data?.items)})
        .catch(error => console.error(error));
}


const searchUsers = async (name) => {
    return fetch(`https://api.github.com/search/users?q=${name}+in:login`)
    .then(response => response.json())
        .then(data => {return (data?.items)})
    .catch( error => console.error(error));
}
const searchInUser = async (name) => {
    return fetch(`https://api.github.com/search/users?q=${name}+in:login`)
    .then(response => response.json())
        .then(data => {return (data?.items[0])})
    .catch( error => console.error(error));
}

const searchUserRepos = async (name) => {
    const tabs = []
    return fetch(`https://api.github.com/users/${name}/repos`)
    .then(response => response.json())
    .then(data => {return (data)})
    .catch( error => console.error(error));
}


const searchRepoIssues = async (name, repo) => {
    return fetch(`https://api.github.com/repos/${name}/${repo}/issues`)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
}
const searchIssue = async (owner, repo, issue_number) => {
    return fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
}

const searchUserFollowers = async (name) => {
    return fetch(`https://api.github.com/users/${name}/followers`)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
}

const searchUserRepo = async (name, repo) => {
    return fetch(`https://api.github.com/repos/${name}/${repo}`)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
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
    searchRepos,
    searchInUser,
    searchUserRepos,
    searchRepoIssues,
    searchUserFollowers,
    searchUserRepo,
    searchRepoContributors,
    searchByUrl,
    searchIssue
    
};