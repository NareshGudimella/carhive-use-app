// Session helpers shared by the request wrappers, login flows and notification taps.
// App.tsx registers the navigation container here, so src/apis/api.tsx never has to
// import App.tsx (which would be a circular import).

import { NavigationContainerRefWithCurrent } from "@react-navigation/native";
import { store, removeProfile } from "../storage/redux";
import { removeToken, removeCity } from "../storage/AsyncStorage";
import { showMessage } from "../components/MessageModal";

let navigationRef: NavigationContainerRefWithCurrent<any> | null = null
let handlingInvalidSession = false

export const registerNavigation = (ref: NavigationContainerRefWithCurrent<any>) => {
    navigationRef = ref
}

export const navigateTo = (name: string, params?: any) => {
    if (navigationRef && navigationRef.isReady()) {
        (navigationRef as any).navigate(name, params)
        return true
    }
    return false
}

export const resetTo = (name: string, params?: any) => {
    if (navigationRef && navigationRef.isReady()) {
        navigationRef.reset({ index: 0, routes: [{ name, params }] })
    }
}

// Clears the stored token and the Redux profile (local logout).
export const clearSession = async () => {
    store.dispatch(removeProfile(null))
    await removeToken()
    await removeCity()
}

// Called by the request wrappers on HTTP 401 (expired/invalid token) or
// 403 ACCOUNT_BLOCKED. Runs once even if several requests fail together.
export const handleInvalidSession = async (reason: 'expired' | 'blocked') => {
    if (handlingInvalidSession) {
        return
    }
    handlingInvalidSession = true
    try {
        await clearSession()
        resetTo('HomeScreen')
        showMessage(reason === 'blocked'
            ? { kind: 'error', title: 'Account blocked', message: 'Your account is blocked. Contact support.' }
            : { kind: 'warning', title: 'Session expired', message: 'Your session has expired. Please log in again.' })
    } finally {
        setTimeout(() => { handlingInvalidSession = false }, 3000)
    }
}

// OTP verify returns data.account_restored when a pending account deletion was cancelled.
export const showAccountRestored = (otpResponse: any) => {
    if (otpResponse && otpResponse.data && otpResponse.data.account_restored) {
        showMessage({
            kind: 'success',
            title: 'Welcome back',
            message: 'Welcome back — your account deletion has been cancelled.',
        })
    }
}
