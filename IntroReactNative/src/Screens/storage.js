import AsyncStorage from '@react-native-async-storage/async-storage';

const initUsers = async () => {
    try {
      await AsyncStorage.setItem(
        'users',
        JSON.stringify([])
      );
    } catch (error) {
      console.log("bad fav users init", error)
    }
};

const initRepos = async () => {
    try {
      await AsyncStorage.setItem(
        'repos',
        JSON.stringify([])
      );
    } catch (error) {
      console.log("bad fav repos init", error)
    }
};


const getUsers = async () => {
  var a
  try {
    var value = await AsyncStorage.getItem('users');
    if (value !== null) {
      a = value;
    }
  } catch (error) {}
  return a
};

const getRepos = async () => {
  var a
  try {
    var value = await AsyncStorage.getItem('repos');
    if (value !== null) {
      a = value;
    }
  } catch (error) {}
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
      console.log(tab)
    } catch (error) {
      console.log("bad fav users add")
    }
};

const addRepo = async (repo) => {
  var tab = await getUsers()
  tab = JSON.parse(tab)
  tab.push(user)

  try {
    await AsyncStorage.setItem(
      'repos',
      JSON.stringify(tab)
    );
    console.log(tab)
  } catch (error) {
    console.log("bad fav repos add")
  }
};

const delRepo = async (repo) => {
    const tab = getRepos()
    tab = tab.filter(item => item.full_name !== repo.full_name)

    try {
      await AsyncStorage.setItem(
        'repos',
        JSON.stringify(tab)
      );
    } catch (error) {
      console.log("bad fav repo del")
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
      console.log(ntab)
    } catch (error) {
      console.log("bad fav user del")
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