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
export const setCity = async (city: any) => {
    try {
        return AsyncStorage.setItem('city', city)
    } catch (e) { }
}
export const getCity = async () => {
    try {
        return AsyncStorage.getItem('city')
    } catch (e) { }
}

