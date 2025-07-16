import messaging from '@react-native-firebase/messaging';
import { Linking, PermissionsAndroid, Platform } from 'react-native';
import notifee from '@notifee/react-native';
import { firebasemessage } from '../apis/api';
import DeviceInfo from 'react-native-device-info';

export const requestfirebasePermissions = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        Token()
        if (Platform.OS == 'android' && Platform.Version >= 33) {
            const check = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
            if (check) {
                Token()
            } else {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS)
                if (granted == 'granted') {
                    Token()
                } else {
                    Linking.openSettings()
                }
            }
        }

    }
}

export const Token = async () => {
    try {
        const token = await messaging().getToken();
        if (token && token != '') {
            await firebasemessage(token, Platform.OS, await DeviceInfo.getBuildNumber(), Platform.Version,)
        }
        console.log('FCM token:', token)
    } catch (error) {
        console.log('failed to get the FCM token', error)
    }
}
export const Foregroundmessage = async () => {
    messaging().onMessage(async remoteMessage => {
        const title = remoteMessage.notification?.title
        const body = remoteMessage.notification?.body
        await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await notifee.displayNotification({
            title: title,
            body: body,
            android: {
                channelId: 'default',
            },
        });
    }
    );

}
