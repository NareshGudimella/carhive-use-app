import { SafeAreaView } from "react-native-safe-area-context";
import { Baseprops } from "../utils/navigation";
import { Alert, Image, Linking, Modal, Platform, Text, View } from "react-native";
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
import { CenterModalView } from "../components/CenterModelView";
import PrimaryButton from "../components/PrimaryButton";
import FastImage from "react-native-fast-image";
import { APP_STORE_URL, PLAY_STORE_URL } from "../config";

class Componentprops extends Baseprops { }

const SplaceScreen: React.FC<Componentprops> = (props) => {

    const dispatch = useDispatch()
    const [versionmodal, setVersionmodal] = useState<any>(false)

    useFocusEffect(
        useCallback(() => {
            CheckMaintenance()
        }, []))

    const loadUserDetails = async () => {
        const token = await getToken()
        if (token && token != '') {
            const response = await excuteGetResponse('secure/profile')
            if (response.code == 0) {
                requestfirebasePermissions()
                Foregroundmessage()
                dispatch(updateProfile(response.data));
                props.navigation.navigate('HomeScreen')
            } else if (response.code == 2) {
                Alert.alert('Alert', 'Unable to get details')
                props.navigation.navigate('HomeScreen')
            } else {
                // 401/403 are handled by the request wrapper (session reset); otherwise continue.
                props.navigation.navigate('HomeScreen')
            }
        } else {
            props.navigation.navigate('HomeScreen')
        }
    }

    const CheckVersion = async () => {
        const response = await excuteGetResponse(`auth/versions`)
        if (response.code == 0 && response.data) {
            if (Platform.OS === 'android') {
                const buildNumber = DeviceInfo.getBuildNumber();
                if (Number(buildNumber) < Number(response.data.User_Android_Version)) {
                    setVersionmodal(true)
                } else {
                    loadUserDetails()
                }
            } else if (Platform.OS === 'ios') {
                const buildNumber = DeviceInfo.getBuildNumber();
                if (Number(buildNumber) < Number(response.data.User_IOS_Version)) {
                    setVersionmodal(true)
                } else {
                    loadUserDetails()

                }
            } else {
                loadUserDetails()
            }
        } else {
            // Version check unavailable: don't block startup on it.
            loadUserDetails()
        }
    }
    const CheckMaintenance = async () => {
        const response = await excuteGetResponse(`auth/maintenance`)
        if (response.code == 0) {
            if (response.data.user_maintenance == 0) {
                CheckVersion()
            } else {
                props.navigation.navigate('MaintenanceScreen')
            }
        } else {
            // Maintenance check unavailable: continue startup.
            CheckVersion()
        }
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>

            {versionmodal &&
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={versionmodal}
                        onRequestClose={() => {
                            setVersionmodal(!versionmodal);
                        }}>
                        <CenterModalView>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: hp(35)
                            }}>
                                <FastImage
                                    resizeMode='contain'
                                    style={{
                                        height: 70,
                                        width: 70
                                    }}
                                    source={require('../assets/update.gif')} />
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    marginVertical: hp(2),
                                    textAlign: 'center',
                                    maxWidth: wp(60)
                                }}>Please update the app to the latest version.</Text>
                                <View style={{
                                    width: wp(60)
                                }}>
                                    <PrimaryButton title='Update' onclick={() => {
                                        Linking.openURL(Platform.OS == 'android' ? PLAY_STORE_URL : APP_STORE_URL)
                                    }} />
                                </View>
                            </View>
                        </CenterModalView>
                    </Modal>
                </View>
            }
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