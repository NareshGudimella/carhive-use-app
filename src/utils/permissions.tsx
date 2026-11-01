import { Alert, Platform } from 'react-native';
import {
    check,
    checkMultiple,
    checkNotifications,
    openSettings,
    Permission,
    PERMISSIONS,
    request,
    requestMultiple,
    requestNotifications,
    RESULTS,
} from 'react-native-permissions';
import type { PermissionStatus } from 'react-native-permissions';
import { showMessage } from '../components/MessageModal';

type PermissionTexts = { title: string; blockedMessage: string };

export const isGranted = (status?: PermissionStatus) =>
    status === RESULTS.GRANTED || status === RESULTS.LIMITED;

// Shown only when the OS will no longer show its own prompt. Settings opens
// only when the user taps the button.
const showBlockedAlert = ({ title, blockedMessage }: PermissionTexts) => {
    Alert.alert(title, blockedMessage, [
        { text: 'Not now', style: 'cancel' },
        { text: 'Open Settings', onPress: () => openSettings().catch(() => { }) },
    ]);
};

const showUnavailable = (title: string) => {
    showMessage({
        kind: 'warning',
        title,
        message: 'This is not available on this device.',
    });
};

export const ensurePermission = async (
    permission: Permission,
    texts: PermissionTexts,
): Promise<boolean> => {
    let status = await check(permission);
    if (isGranted(status)) {
        return true;
    }
    if (status === RESULTS.UNAVAILABLE) {
        showUnavailable(texts.title);
        return false;
    }
    if (status === RESULTS.DENIED) {
        status = await request(permission);
        if (isGranted(status)) {
            return true;
        }
    }
    if (status === RESULTS.BLOCKED) {
        showBlockedAlert(texts);
    }
    return false;
};

export const ensureCameraPermission = () =>
    ensurePermission(
        Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
        {
            title: 'Camera permission',
            blockedMessage:
                'Camera access is needed to take photos of your documents. You can turn it on in Settings.',
        },
    );

const LOCATION_TEXTS: PermissionTexts = {
    title: 'Location Required',
    blockedMessage:
        'Location access is needed to find cars near you. You can turn it on in Settings.',
};

// Approximate location is enough for nearby-car search, so either Android
// permission counts as granted.
export const ensureLocationPermission = async (): Promise<boolean> => {
    if (Platform.OS !== 'android') {
        return ensurePermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE, LOCATION_TEXTS);
    }
    const list = [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    ];
    let statuses = await checkMultiple(list);
    if (list.some(p => isGranted(statuses[p]))) {
        return true;
    }
    if (list.every(p => statuses[p] === RESULTS.UNAVAILABLE)) {
        showUnavailable(LOCATION_TEXTS.title);
        return false;
    }
    if (list.some(p => statuses[p] === RESULTS.DENIED)) {
        statuses = await requestMultiple(list);
        if (list.some(p => isGranted(statuses[p]))) {
            return true;
        }
    }
    if (list.every(p => statuses[p] === RESULTS.BLOCKED)) {
        showBlockedAlert(LOCATION_TEXTS);
    }
    return false;
};

export const getNotificationStatus = async (): Promise<PermissionStatus> => {
    const { status } = await checkNotifications();
    return status;
};

// Prompts only while the OS still allows it. Never alerts, never opens Settings.
export const requestNotificationPermissionOnce = async (): Promise<boolean> => {
    let status = await getNotificationStatus();
    if (status === RESULTS.DENIED) {
        const result = await requestNotifications(['alert', 'sound', 'badge']);
        status = result.status;
    }
    return isGranted(status);
};
