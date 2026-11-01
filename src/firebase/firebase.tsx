import {
    getMessaging,
    getToken as getFcmToken,
    onTokenRefresh,
    onMessage,
    getInitialNotification,
    onNotificationOpenedApp,
} from '@react-native-firebase/messaging';
import type { RemoteMessage } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import { firebasemessage } from '../apis/api';
import DeviceInfo from 'react-native-device-info';
import { getToken } from '../storage/AsyncStorage';
import { navigateTo } from '../utils/session';
import { requestNotificationPermissionOnce } from '../utils/permissions';

let tokenRefreshUnsubscribe: (() => void) | null = null
let foregroundUnsubscribe: (() => void) | null = null
let tapListenersRegistered = false
let pendingTap: any = null
let loggedInReady = false

// FCM tokens work without the notification permission, so the device is
// registered regardless and starts receiving once the user enables
// notifications in Settings.
export const registerForPush = async () => {
    const authToken = await getToken()
    if (!authToken || authToken == '') {
        return
    }
    Token()
    if (!tokenRefreshUnsubscribe) {
        tokenRefreshUnsubscribe = onTokenRefresh(getMessaging(), async (token: string) => {
            const latestAuthToken = await getToken()
            if (latestAuthToken && latestAuthToken != '' && token && token != '') {
                registerFcmToken(token)
            }
        })
    }
}

// Prompts only if the OS still allows it, then registers the device.
export const requestfirebasePermissions = async () => {
    await requestNotificationPermissionOnce()
    await registerForPush()
}

const registerFcmToken = async (token: string) => {
    await firebasemessage(token, Platform.OS, await DeviceInfo.getBuildNumber(), Platform.Version,)
}

export const Token = async () => {
    try {
        const token = await getFcmToken(getMessaging());
        if (token && token != '') {
            await registerFcmToken(token)
        }
    } catch (error) {
        console.log('failed to get the FCM token', error)
    }
}

// Called after every login and on startup when logged in. Registers the
// foreground handler only once, then opens any notification tapped earlier.
export const Foregroundmessage = async () => {
    if (!foregroundUnsubscribe) {
        foregroundUnsubscribe = onMessage(getMessaging(), async (remoteMessage: RemoteMessage) => {
            const title = remoteMessage.notification?.title
            const body = remoteMessage.notification?.body
            await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });

            await notifee.displayNotification({
                title: title,
                body: body,
                data: remoteMessage.data,
                android: {
                    channelId: 'default',
                    pressAction: { id: 'default' },
                },
            });
        });
    }
    loggedInReady = true
    openPendingNotification()
}

// Notification taps: push data has type ('booking' | 'general') and booking_id.
export const handleNotificationTap = (data: any) => {
    if (!data) {
        return
    }
    pendingTap = data
    openPendingNotification()
}

const openPendingNotification = async () => {
    if (!pendingTap || !loggedInReady) {
        return
    }
    const token = await getToken()
    if (!token || token == '') {
        return
    }
    // Let the login/startup navigation (reset to HomeScreen) finish first.
    setTimeout(() => {
        if (!pendingTap) {
            return
        }
        const route = pendingTap.type == 'booking' ? 'RentalsScreen' : 'NotificationScreen'
        if (navigateTo(route)) {
            pendingTap = null
        }
    }, 300)
}

// Registered once from App.tsx.
export const registerNotificationTapHandlers = () => {
    if (tapListenersRegistered) {
        return () => { }
    }
    tapListenersRegistered = true
    // Cold start from a system (FCM) notification.
    getInitialNotification(getMessaging()).then((remoteMessage: RemoteMessage | null) => {
        if (remoteMessage) {
            handleNotificationTap(remoteMessage.data || {})
        }
    }).catch(() => { })
    // Cold start from a Notifee (foreground-displayed) notification.
    notifee.getInitialNotification().then(initial => {
        if (initial && initial.notification) {
            handleNotificationTap(initial.notification.data || {})
        }
    }).catch(() => { })
    // App in background, system notification tapped.
    const unsubscribeOpened = onNotificationOpenedApp(getMessaging(), (remoteMessage: RemoteMessage) => {
        handleNotificationTap(remoteMessage.data || {})
    })
    // App in foreground, Notifee notification tapped.
    const unsubscribeNotifee = notifee.onForegroundEvent(({ type, detail }) => {
        if (type === EventType.PRESS) {
            handleNotificationTap(detail.notification?.data || {})
        }
    })
    return () => {
        unsubscribeOpened()
        unsubscribeNotifee()
        tapListenersRegistered = false
    }
}

// Registered in index.js: Notifee notification pressed while the app is in the background.
export const notifeeBackgroundHandler = async ({ type, detail }: any) => {
    if (type === EventType.PRESS) {
        handleNotificationTap(detail.notification?.data || {})
    }
}
