import AsyncStorage from '@react-native-async-storage/async-storage';

const initUsers = async () => {
    try {
      await AsyncStorage.setItem(
        'users',
        JSON.stringify([])
      );
    } catch (error) {
      alert("Bad Users favorites initialisation")
    }
};

const initRepos = async () => {
    try {
      await AsyncStorage.setItem(
        'repos',
        JSON.stringify([])
      );
    } catch (error) {
      alert("Bad repositories favorites initialisation")
    }
};


const getUsers = async () => {
  var a
  try {
    var value = await AsyncStorage.getItem('users');
    if (value !== null) {
      a = value;
    }
  } catch (error) {
    alert("Bad Getting Users favorites")
  }
  return a
};

const getRepos = async () => {
  var a
  try {
    var value = await AsyncStorage.getItem('repos');
    if (value !== null) {
      a = value;
    }
  } catch (error) {
    alert("Bad Getting repositories favorites")
  }
  return a
};


const addUser = async (user) => {
    var tab = await getUsers()
    tab = JSON.parse(tab)
    tab.push(user)

    try {
      await AsyncStorage.setItem(
        'users',
        JSON.stringify(tab)
      );
     // console.log(tab)
    } catch (error) {
      alert("Bad adding Users in favorites")
    }
};

const addRepo = async (repo) => {
  var tab = await getUsers()
  tab = JSON.parse(tab)
  tab.push(repo)

  try {
    await AsyncStorage.setItem(
      'repos',
      JSON.stringify(tab)
    );
   // console.log(tab)
  } catch (error) {
    alert("Bad adding repositories favorites")
  }
};

const delRepo = async (repo) => {
    const tab = getRepos()
    tab = JSON.parse(tab)
    var ntab = tab.filter(item => item.full_name !== repo)

    try {
      await AsyncStorage.setItem(
        'repos',
        JSON.stringify(ntab)
      );
    } catch (error) {
      alert("Bad deleting Repositories favorites")
    }
};

const delUser = async (user) => {
  var tab = await getUsers()
  tab = JSON.parse(tab)
  var ntab = tab.filter(item => item.login !== user)

    try {
      await AsyncStorage.setItem(
        'users',
        JSON.stringify(ntab)
      );
    } catch (error) {
      alert("Bad deleting Users favorites")
    }
};



export const Store = {
    initUsers,
    initRepos,
    getUsers,
    getRepos,
    addUser,
    addRepo,
    delRepo,
    delUser,
};