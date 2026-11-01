import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Keychain from 'react-native-keychain'

const TOKEN_SERVICE = 'com.carhive.user.token'

export const setToken = async (token: any) => {
    try {
        await Keychain.setGenericPassword('token', String(token), { service: TOKEN_SERVICE })
        // Drop any legacy plain-text copy.
        await AsyncStorage.removeItem('@token')
    } catch (e) { }
}

export const getToken = async () => {
    try {
        const stored = await Keychain.getGenericPassword({ service: TOKEN_SERVICE })
        if (stored) {
            return stored.password
        }
        // Migrate tokens saved by older versions so users stay logged in.
        const legacy = await AsyncStorage.getItem('@token')
        if (legacy) {
            await Keychain.setGenericPassword('token', legacy, { service: TOKEN_SERVICE })
            await AsyncStorage.removeItem('@token')
            return legacy
        }
        return null
    } catch (e) {
        // Keychain unavailable (some Android keystores fail): fall back to a legacy copy if any.
        try {
            return await AsyncStorage.getItem('@token')
        } catch { }
    }
}
export const removeToken = async () => {
    try {
        await Keychain.resetGenericPassword({ service: TOKEN_SERVICE })
    } catch (e) { }
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
export const removeCity = async () => {
    try {
        await AsyncStorage.removeItem('city')
    } catch (e) { }
}
