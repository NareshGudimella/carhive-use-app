import AsyncStorage from "@react-native-async-storage/async-storage"

export const setToken = async (token: any) => {
    try {
        await AsyncStorage.setItem('@token', token)
    } catch (e) { }
}

export const getToken = async () => {
    try {
        return AsyncStorage.getItem('@token')
    } catch (e) { }
}
export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('@token')
    } catch (e) { }
}