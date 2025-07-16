import { SafeAreaView } from "react-native-safe-area-context";
import { Baseprops } from "../utils/navigation";
import { Alert, Image } from "react-native";
import { hp, wp } from "../utils/ResponsiveScreen";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { updateProfile } from "../storage/redux";
import { useDispatch } from "react-redux";
import { getToken } from "../storage/AsyncStorage";
import { excuteGetResponse } from "../apis/api";
import {
    Foregroundmessage,
    requestfirebasePermissions
} from "../firebase/firebase";

class Componentprops extends Baseprops { }

const SplaceScreen: React.FC<Componentprops> = (props) => {

    const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {
            loadUserDetails()
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

