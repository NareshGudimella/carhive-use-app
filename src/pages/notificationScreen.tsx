import React, { useCallback, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Baseprops } from "../utils/navigation";
import {
    Image, Pressable, ScrollView, Text, View, Dimensions,
    Alert, Modal, TouchableOpacity
} from "react-native";
import AutoHeightImage from 'react-native-auto-height-image';
import { hp, wp } from "../utils/ResponsiveScreen";
import { excuteGetResponse, Login, Otp } from '../apis/api';
import { useFocusEffect } from '@react-navigation/native';
import { getToken, setToken } from '../storage/AsyncStorage';
import { BottomModelView } from '../components/BottomModelView';
import Textinput from '../components/TextInput';
import PrimaryButton from '../components/PrimaryButton';
import { OtpInput } from 'react-native-otp-entry';
import { style } from '../styles/OtpStyle';
import { updateProfile } from '../storage/redux';
import { useDispatch } from 'react-redux';
import {
    Foregroundmessage,
    requestfirebasePermissions
} from '../firebase/firebase';

class Componentprops extends Baseprops { }

const NotificationScreen: React.FC<Componentprops> = (props) => {

    const dispatch = useDispatch()
    const screenWidth = Dimensions.get('window').width - wp(18);
    const [notification, setNotification] = useState<any>([])
    const [mobileNumberModal, setMobileNumberModal] = useState(false)
    const [otpModal, setOtpModal] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState<any>('')
    const [otp, setOtp] = useState<any>('')

    useFocusEffect(
        useCallback(() => {
            loadNotification()
        }, [])
    )

    const loadNotification = async () => {
        const token = await getToken()
        if (token && token != '') {
            const response = await excuteGetResponse(`secure/notifications`)
            if (response.code == 0) {
                setNotification(response.data)
            } else {
                Alert.alert('Alert', 'Unable to get details')
                return
            }
        } else {
            setMobileNumberModal(true)
        }
    }

    const handelLogin = async () => {
        if (phoneNumber.trim().length != 10) {
            Alert.alert('Alert', 'Invalid mobile number')
            return
        }
        setMobileNumberModal(false)
        const response = await Login(phoneNumber)
        if (response.code == 0) {
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
        if (response.code == 0) {
            setToken(response.data.token)
            if (response.data.token && response.data.token != '') {
                const profileresponse = await excuteGetResponse('secure/profile')
                if (profileresponse.code == 0) {
                    requestfirebasePermissions()
                    Foregroundmessage()
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
                                        <Text style={{
                                            color: '#00354a',
                                            marginHorizontal: wp(2),
                                            fontSize: 16, fontWeight: 'bold'
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

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                paddingHorizontal: wp(5),
                paddingVertical: hp(2),
                elevation: 1
            }}>
                <Pressable onPress={() => props.navigation.goBack()}>
                    <Image
                        source={require('../assets/Back.png')}
                        style={{
                            height: 35,
                            width: 35
                        }}
                    />
                </Pressable>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginHorizontal: wp(2)
                }}>Notification</Text>
            </View>

            <ScrollView style={{
                flex: 1,
                marginHorizontal: wp(5),
                marginTop: hp(1)
            }}>
                {
                    notification && notification.map((e: any, index: any) => (
                        <View key={index}
                            style={{
                                backgroundColor: '#ffffff',
                                marginVertical: 4,
                                borderRadius: 10,
                                padding: wp(2)
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                marginVertical: 2.5
                            }}>
                                <View style={{
                                    backgroundColor: '#EEEEEE80',
                                    height: 40,
                                    width: 40,
                                    margin: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 20,
                                }}>
                                    <Image source={require('../assets/bell2.png')}
                                        style={{
                                            height: 16,
                                            width: 16
                                        }} />
                                </View>
                                <View style={{ marginHorizontal: wp(2) }}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: 'bold'
                                    }}>{e.title}</Text>
                                    <Text
                                        style={{
                                            color: '#64748B',
                                            fontWeight: '400',
                                            fontSize: 14,
                                            marginTop: 1,
                                            width: wp(70)
                                        }}>{e.message}</Text>
                                </View>
                            </View>
                            {e.image_path && <View style={{
                                marginTop: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginHorizontal: wp(2)
                            }}>
                                <AutoHeightImage
                                    width={screenWidth}
                                    source={{ uri: e.image_path }}
                                    style={{
                                        borderRadius: 10
                                    }}
                                />
                            </View>}
                            <View style={{
                                marginTop: 5,
                                alignItems: 'flex-end',
                                marginHorizontal: wp(2)
                            }}>
                                <Text style={{ fontWeight: 'bold' }}>{e.time}</Text>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default NotificationScreen;
