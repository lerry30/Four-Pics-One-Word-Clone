import AsyncStorage from '@react-native-async-storage/async-storage';

export const MY_STORAGE_ID = 'lerry_samson_30';

export const saveData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch(e) {}
}

export const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch(e) {}
}
  

export const getAllKeys = async (setKeys) => {
    try {
        setKeys(await AsyncStorage.getAllKeys());
    } catch(e) {}
}

export const getData = async (key, setList, defaultState) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        const data = jsonValue != null ? JSON.parse(jsonValue) : defaultState;
        setList(data);
    } catch(e) {}
}

export const removeValue = async(id) => {
    try {
      await AsyncStorage.removeItem(id)
    } catch(e) {}
  }
