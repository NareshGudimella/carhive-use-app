import { SafeAreaView } from "react-native-safe-area-context";
import { Baseprops } from "../utils/navigation";
import { Alert, Image, Platform } from "react-native";
import { hp, wp } from "../utils/ResponsiveScreen";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import { updateProfile } from "../storage/redux";
import { useDispatch } from "react-redux";
import { getToken } from "../storage/AsyncStorage";
import { excuteGetResponse, firebasemessage } from "../apis/api";
import { Foregroundmessage, requestfirebasePermissions } from "../firebase/firebase";
class Componentprops extends Baseprops { }

const SplaceScreen: React.FC<Componentprops> = (props) => {

    const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                props.navigation.navigate('HomeScreen')
                loadUserDetails()
                requestfirebasePermissions()
                Foregroundmessage()
            }, 1000);
        }, []))

    const loadUserDetails = async () => {
        const token = await getToken()
        if (token && token != '') {
            const response = await excuteGetResponse('secure/profile')
            console.log('profile', response)
            if (response.code == 0) {
                dispatch(updateProfile(response.data));
                const token = await getToken()
                console.log('token', response.data.token)
                if (token && token != '') {
                    const token = await messaging().getToken();
                    const response = await firebasemessage(token, Platform.OS,
                        await DeviceInfo.getBuildNumber(), Platform.Version,)
                    console.log('firebaser', response)
                }
            } else {
                Alert.alert('Alert', 'Unable to get details')
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
                    width: wp(70)
                }} />
        </SafeAreaView>
    )
}
export default SplaceScreen

