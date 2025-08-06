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

class Componentprops extends Baseprops { }

const SplaceScreen: React.FC<Componentprops> = (props) => {

    const [versionmodal, setVersionmodal] = useState<any>(false)
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
        console.log(response)
        if (response.code == 0) {
            if (Platform.OS === 'android') {
                const buildNumber = DeviceInfo.getBuildNumber();
                console.log(buildNumber)
                if (buildNumber !== response.data.User_Android_Version) {
                    setVersionmodal(true)
                } else {
                    loadUserDetails()
                }
            } else if (Platform.OS === 'ios') {
                const buildNumber = DeviceInfo.getBuildNumber();
                console.log(buildNumber)
                if (buildNumber === response.data.User_IOS_Version) {
                    setVersionmodal(true)
                } else {
                    loadUserDetails()

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
                                        Linking.openURL(Platform.OS == 'android' ?
                                            'https://play.google.com/store/apps/details?id=com.carhive.user&pcampaignid=web_share' :
                                            'https://apps.apple.com/in/app/carhive-rentals/id6748205300')
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

