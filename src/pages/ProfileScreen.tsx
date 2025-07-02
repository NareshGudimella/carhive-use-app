import { Alert, Image, Linking, Modal, Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import BottomTabNavigation from "../components/BottomTab";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { useCallback, useState } from "react";
import { BottomModelView } from "../components/BottomModelView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { removeProfile, updateProfile } from "../storage/redux";
import { getToken, removeToken, setToken } from "../storage/AsyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
import { style } from "../styles/OtpStyle";
import { OtpInput } from "react-native-otp-entry";
import { excuteGetResponse, firebasemessage, Login, Otp } from "../apis/api";
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from "react-native-device-info";
import Textinput from "../components/TextInput";

class Componentprops extends Baseprops { }

const ProfileScreen: React.FC<Componentprops> = (props) => {

    const [logoutModal, setLogoutModal] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.profile)
    const [tokenFlag, setTokenFlag] = useState(false)
    const [mobileNumberModal, setMobileNumberModal] = useState(false)
    const [otpModal, setOtpModal] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState<any>('')
    const [otp, setOtp] = useState<any>('')

    useFocusEffect(
        useCallback(() => {
            loadToken()
        }, [])
    )

    const handelLogout = async () => {
        dispatch(removeProfile(null))
        await removeToken()
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }]
        })
    }

    const handelLogin = async () => {
        if (phoneNumber.trim().length != 10) {
            Alert.alert('Alert', 'Invalid mobile number')
            return
        }
        const response = await Login(phoneNumber)
        console.log('Login', response)
        if (response.code == 0) {
            setMobileNumberModal(false)
            setOtpModal(true)
        } else {
            Alert.alert('Alert', 'Unable to get Phone number')
        }
    }

    const handelOtp = async () => {
        if (!otp || otp.length !== 4) {
            Alert.alert('Alert!', 'Enter a valid 4-digit OTP.');
            return;
        }
        const response = await Otp(phoneNumber, otp)
        console.log('otp', response)
        if (response.code == 0) {
            setToken(response.data.token)
            if (response.data.token && response.data.token != '') {
                const token = await messaging().getToken();
                await firebasemessage(token, Platform.OS, await DeviceInfo.getBuildNumber(), Platform.Version,)
                const profileresponse = await excuteGetResponse('secure/profile')
                if (profileresponse.code == 0) {
                    setOtpModal(false)
                    dispatch(updateProfile(profileresponse.data));
                    props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }]
                    })
                } else {
                    Alert.alert('Alert', 'Unable to profile details.')
                }
            }
        } else {
            Alert.alert('Alert', 'Invalid OTP')
        }
    }


    const loadToken = async () => {
        const token = await getToken();
        if (token && token != '') {
            setTokenFlag(true)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>


            {mobileNumberModal &&
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={mobileNumberModal}
                        onRequestClose={() => {
                            setMobileNumberModal(!mobileNumberModal);
                        }}>
                        <BottomModelView onclick={() => setMobileNumberModal(false)}>
                            <View style={{
                                marginHorizontal: wp(5),
                                marginVertical: hp(2)
                            }}>
                                <Pressable
                                    onPress={() => setMobileNumberModal(false)}
                                    style={{
                                        backgroundColor: '#EEEEEE80',
                                        borderRadius: 20,
                                        width: 35,
                                        height: 35,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        source={require('../assets/close.png')}
                                        style={{
                                            height: 15,
                                            width: 15
                                        }} />
                                </Pressable>
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    marginTop: hp(2),

                                }}>User Login</Text>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontWeight: '400',
                                        color: '#64748B',
                                        marginTop: hp(1),
                                        marginBottom: hp(1.5)
                                    }}
                                >Please enter a your mobile number
                                    to login into your account</Text>
                                <Textinput
                                    image={require('../assets/call.png')}
                                    placeholder='Enter your mobile number'
                                    keyboardtype='numeric'
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    max={10}
                                />
                                <Text
                                    style={{
                                        fontSize: 15,
                                        lineHeight: hp(2.5),
                                        color: '#64748B',
                                        marginVertical: hp(1),
                                        marginHorizontal: wp(2)
                                    }}
                                >By continuing you agree
                                    to our <Text
                                        style={{
                                            color: '#00354a'
                                        }}> Terms of service
                                    </Text> ,   &
                                    <Text
                                        style={{
                                            color: '#00354a'
                                        }}>  Privacy policy</Text>
                                </Text>
                                <View style={{ marginVertical: hp(2) }}>
                                    <PrimaryButton title='Request OTP'
                                        onclick={() => {
                                            handelLogin()
                                        }}
                                    />
                                </View>
                            </View>
                        </BottomModelView>
                    </Modal>
                </View>
            }


            {
                otpModal &&
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={otpModal}
                        onRequestClose={() => {
                            setOtpModal(!otpModal);
                        }}>
                        <BottomModelView onclick={() => setOtpModal(false)}>
                            <View style={{
                                marginHorizontal: wp(5),
                                marginVertical: hp(2)
                            }}>
                                <Pressable
                                    onPress={() => setOtpModal(false)}
                                    style={{
                                        backgroundColor: '#EEEEEE80',
                                        borderRadius: 20,
                                        width: 35,
                                        height: 35,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Image
                                        source={require('../assets/close.png')}
                                        style={{
                                            height: 15,
                                            width: 15
                                        }} />
                                </Pressable>
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    marginTop: hp(2),

                                }}>Enter OTP</Text>
                                <Text
                                    style={{
                                        fontSize: 17,
                                        fontWeight: '400',
                                        color: '#64748B',
                                        marginTop: hp(1),
                                        marginBottom: hp(1.5),
                                        width: wp(80)
                                    }}
                                >We’ve sent an SMS with an activation
                                    code to your phone
                                    <Text
                                        style={{
                                            color: '#00354a',
                                            fontSize: 16
                                        }}>  +91 {phoneNumber}</Text>
                                </Text>
                                <OtpInput
                                    numberOfDigits={4}
                                    focusColor="#E8ECF4"
                                    focusStickBlinkingDuration={500}
                                    onTextChange={(text) => setOtp(text)}
                                    onFilled={(text) => console.log(`OTP is ${text}`)}
                                    textInputProps={{
                                        accessibilityLabel: "One-Time Password",
                                    }}
                                    theme={{
                                        containerStyle: style.otpContainer,
                                        pinCodeContainerStyle: style.otp,
                                        pinCodeTextStyle: style.otpText,
                                    }}
                                />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginVertical: hp(3)
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#64748B'
                                    }}>I didn’t receive a code</Text>
                                    <TouchableOpacity onPress={async () => {
                                            const response = await Login(phoneNumber)
                                        }}>
                                        <Text  style={{
                                            color: '#00354a',
                                            marginHorizontal: wp(2),
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Resend</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginBottom: hp(2) }}>
                                    <PrimaryButton
                                        title='Verify'
                                        onclick={() => {
                                            handelOtp()

                                        }}
                                    />
                                </View>
                            </View>
                        </BottomModelView>
                    </Modal>
                </View>
            }


            {
                logoutModal &&
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={logoutModal}
                        onRequestClose={() => {
                            setLogoutModal(!logoutModal);
                        }}>
                        <BottomModelView onclick={() => setLogoutModal(false)}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: hp(3)
                            }}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                }}>Log out</Text>
                                <Text
                                    style={{
                                        marginVertical: hp(2),
                                        fontWeight: '500',
                                        fontSize: 15
                                    }}>Do you want to log out ?</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: hp(1)
                                }}>
                                    <Pressable
                                        onPress={() => handelLogout()}
                                        style={{
                                            borderWidth: 1,
                                            paddingVertical: hp(1.2),
                                            width: wp(35),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginHorizontal: wp(2),
                                            borderRadius: 10,
                                            borderColor: '#00354a'
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                color: '#00354a'
                                            }}>Yes</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => setLogoutModal(false)}
                                        style={{
                                            borderWidth: 1,
                                            paddingVertical: hp(1.2),
                                            width: wp(35),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginHorizontal: wp(2),
                                            borderRadius: 10,
                                            borderColor: '#00354a',
                                            backgroundColor: '#00354a'
                                        }}>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold',
                                                color: '#ffffff'
                                            }}>No</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </BottomModelView>
                    </Modal>
                </View>
            }
            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: '#ffffff',
                    padding: wp(5),
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginVertical: hp(1)
                        }}>Profile</Text>
                </View>
                <View style={{
                    marginHorizontal: wp(5),
                    marginVertical: hp(2)
                }}>
                    <Cardview>
                        <View style={{
                            marginHorizontal: wp(5),
                            marginVertical: hp(1.5)
                        }}>
                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                }}>Hi, {user && user.aadharcard_name}</Text>
                            <Text
                                style={{
                                    color: '#64748B',
                                    fontSize: 14,
                                    fontWeight: 500,
                                    marginTop: hp(0.5)
                                }}>Welcome to our App.....</Text>
                        </View>
                    </Cardview>
                    <View style={{
                        marginVertical: hp(2)
                    }}>
                        <Cardview>
                            <View style={{
                                marginHorizontal: wp(4),
                                marginVertical: hp(2)
                            }}>
                                <Pressable
                                    onPress={() => props.navigation.navigate('ProfileDetailsScreen')}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                    }}>
                                    <View style={{
                                        backgroundColor: '#F4F6FA',
                                        padding: hp(1.5),
                                        borderRadius: 22
                                    }}>
                                        <Image
                                            source={require('../assets/frame1.png')}
                                            style={{
                                                height: 22,
                                                width: 22,
                                                tintColor: '#000000'
                                            }} />
                                    </View>
                                    <View style={{
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>View profile</Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                color: '#64748B'
                                            }}>Update your personal
                                            info conveniently</Text>
                                    </View>
                                </Pressable>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#F4F6FA',
                                        marginHorizontal: wp(2),
                                        marginVertical: hp(1.5)
                                    }} />
                                <Pressable
                                    onPress={() => props.navigation.navigate('HostScreen')}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                    }}>
                                    <View style={{
                                        backgroundColor: '#F4F6FA',
                                        padding: hp(1.5),
                                        borderRadius: 22
                                    }}>
                                        <Image
                                            source={require('../assets/gift.png')}
                                            style={{
                                                height: 22,
                                                width: 22
                                            }} />
                                    </View>
                                    <View style={{
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Become a Host</Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                color: '#64748B'
                                            }}>You want to become a
                                            host for your car...</Text>
                                    </View>
                                </Pressable>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#F4F6FA',
                                        marginHorizontal: wp(2),
                                        marginVertical: hp(1.5)
                                    }} />
                                <Pressable
                                    onPress={() => Linking.openURL(`tel: ${8143993222}`)} style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                    }}>
                                    <View style={{
                                        backgroundColor: '#F4F6FA',
                                        padding: hp(1.5),
                                        borderRadius: 22
                                    }}>
                                        <Image
                                            source={require('../assets/Chat_Circle_Dots.png')}
                                            style={{
                                                height: 22,
                                                width: 22
                                            }} />
                                    </View>
                                    <View style={{
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Get Help</Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                color: '#64748B'
                                            }}>Assistance at your fingertips,
                                            support just a click.</Text>
                                    </View>
                                </Pressable>
                                <View
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#F4F6FA',
                                        marginHorizontal: wp(2),
                                        marginVertical: hp(1.5)
                                    }} />
                                <Pressable
                                    onPress={() => props.navigation.navigate('NotificationScreen')}
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',

                                    }}>
                                    <View style={{
                                        backgroundColor: '#F4F6FA',
                                        padding: hp(1.5),
                                        borderRadius: 22
                                    }}>
                                        <Image
                                            source={require('../assets/bell1.png')}
                                            style={{
                                                height: 22,
                                                width: 22
                                            }} />
                                    </View>
                                    <View style={{
                                        marginHorizontal: wp(3)
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Notifications</Text>
                                        <Text
                                            style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                color: '#64748B'
                                            }}>Check your Notification</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </Cardview>
                    </View>
                    <View>
                        <Cardview>
                            <View style={{
                                marginHorizontal: wp(5),
                                marginVertical: hp(2)
                            }}>
                                <Text
                                    onPress={() => {
                                        Linking.openURL('https://carhive.co.in/terms_conditions')
                                    }}
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>
                                    Terms & Conditions
                                </Text>
                                <View
                                    style={{
                                        borderWidth: 0.5,
                                        borderColor: '#F4F6FA',
                                        marginVertical: hp(2)
                                    }} />
                                <Text
                                    onPress={() => {
                                        Linking.openURL('https://carhive.co.in/privacy_policy')
                                    }}
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>Privacy policy</Text>
                                {tokenFlag ? <><View
                                    style={{
                                        borderWidth: 0.5,
                                        borderColor: '#F4F6FA',
                                        marginVertical: hp(2)
                                    }} /><Text
                                        onPress={() => setLogoutModal(true)}
                                        style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Logout</Text></>
                                    :
                                    <><View
                                        style={{
                                            borderWidth: 0.5,
                                            borderColor: '#F4F6FA',
                                            marginVertical: hp(2)
                                        }} /><Text
                                            onPress={() => setMobileNumberModal(true)}
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 'bold'
                                            }}>Login</Text></>
                                }

                            </View>
                        </Cardview>
                    </View>
                </View>
            </ScrollView>
            <BottomTabNavigation step={3} navigation={props.navigation} />
        </SafeAreaView>
    )
}
export default ProfileScreen