import { SafeAreaView } from "react-native-safe-area-context";
import { Baseprops } from "../utils/navigation";
import { Alert, Image, Linking, Platform } from "react-native";
import { hp, wp } from "../utils/ResponsiveScreen";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { updateProfile } from "../storage/redux";
import { useDispatch } from "react-redux";
import { getToken } from "../storage/AsyncStorage";
import { excuteGetResponse } from "../apis/api";
import DeviceInfo from 'react-native-device-info';
import {
    Foregroundmessage,
    requestfirebasePermissions
} from "../firebase/firebase";

class Componentprops extends Baseprops { }

const SplaceScreen: React.FC<Componentprops> = (props) => {
    const [versions, setVersions] = useState(null)

    const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {

            CheckVersion()
        }, []))

    const loadUserDetails = async () => {
        const token = await getToken()
        if (token && token != '') {
            const response = await excuteGetResponse('secure/profile')
            console.log('profile', response)
            if (response.code == 0) {
                requestfirebasePermissions()
                Foregroundmessage()
                dispatch(updateProfile(response.data));
                props.navigation.navigate('HomeScreen')
            } else {
                Alert.alert('Alert', 'Unable to get details')
            }
        } else {
            props.navigation.navigate('HomeScreen')
        }
    }

    const CheckVersion = async () => {
        const response = await excuteGetResponse(`auth/versions`)
        setVersions(response.data)
        console.log('versionsdata', response)
        if (response.code == 0) {
            if (Platform.OS === 'android') {
                const buildNumber = DeviceInfo.getBuildNumber();
                console.log('builddata', buildNumber)
                if (buildNumber === response.data.User_Android_Version) {
                    console.log('Android version matched');
                    loadUserDetails()
                } else {
                    Alert.alert(
                        'Update Required',
                        'Please update the app to the latest version.',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    Linking.openURL('https://play.google.com/store/apps/details?id=com.carhive.user&pcampaignid=web_share')
                                }
                            }
                        ]
                    );
                }
            } else if (Platform.OS === 'ios') {
                const buildNumber = DeviceInfo.getBuildNumber();
                console.log('builddata', buildNumber)
                if (buildNumber === response.data.User_IOS_Version) {
                    console.log('iOS version matched');
                    loadUserDetails()
                } else {
                    Alert.alert('Update Required', 'Please update the app to the latest version.',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    Linking.openURL('https://apps.apple.com/in/app/carhive-rentals/id6748205300')
                                }
                            }
                        ]);
                }
            }
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Image source={require('../assets/appicon.png')}
                style={{
                    height: hp(40),
                    width: wp(70),
                    alignSelf: 'center'
                }} />
        </SafeAreaView>
    )
}
export default SplaceScreen

