const searchUser = async (name) => {
    fetch('https://api.github.com/users/'+name)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
}

const searchInUser = async (name) => {
    fetch(`https://api.github.com/search/users?q=${name}+in:login`)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
}

const searchUserRepos = async (name) => {
    const tabs = []
    fetch(`https://api.github.com/users/${name}/repos`)
    .then(response => response.json())
    .then(data => {return (data)})
    .catch( error => console.error(error));
}


const searchRepoIssus = async (name, repo) => {
    fetch(`https://api.github.com/repos/${name}/${repo}/issues`)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
}

const searchUserFollowers = async (name) => {
    fetch(`https://api.github.com/users/${name}/followers`)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
}

const searchUserRepo = async (name, repo) => {
    fetch(`https://api.github.com/repos/${name}/${repo}`)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
}


const searchRepoContributors = async (name, repo) => {
    fetch(`https://api.github.com/repos/${name}/${repo}/contributors`)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
}

const searchUserParam = async (requete) => {
    fetch(requete)
    .then(response => response.json())
    .then( data => {return (data)})
    .catch( error => console.error(error));
}


export const Api = {
    searchUser,
    searchInUser,
    searchUserRepos,
    searchRepoIssus,
    searchUserFollowers,
    searchUserRepo,
    searchRepoContributors,
    searchUserParam
};