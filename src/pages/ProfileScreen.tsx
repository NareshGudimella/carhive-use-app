import {
    ActivityIndicator,
    Alert,
    Image,
    Linking,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Baseprops } from "../utils/navigation";
import BottomTabNavigation from "../components/BottomTab";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { useCallback, useState } from "react";
import { BottomModelView } from "../components/BottomModelView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { removeProfile, updateProfile } from "../storage/redux";
import { getCity, getToken, removeToken, setToken } from "../storage/AsyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";
import { style } from "../styles/OtpStyle";
import { OtpInput } from "react-native-otp-entry";
import { excuteGetResponse, Login, Otp } from "../apis/api";
import Textinput from "../components/TextInput";
import { Foregroundmessage, requestfirebasePermissions } from "../firebase/firebase";

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
    const [cityCustomerCare, setCityCustomerCare] = useState<null>(null)

    const [requestOtpLoading, setRequestOtpLoading] = useState(false)
    const [verifyOtpLoading, setVerifyOtpLoading] = useState(false)
    const [logoutLoading, setLogoutLoading] = useState(false)
    const [resendLoading, setResendLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [citys, setCitys] = useState<any>([])

    useFocusEffect(
        useCallback(() => {
            loadToken()
            loadCityName()
        }, [])
    )

    const loadCityName = async () => {
        try {
            const response = await excuteGetResponse('auth/cities')
            console.log('cities', response)
    
            if (response.code === 0) {
                setCitys(response.data)
    
                const cityStr = await getCity()
                if (!cityStr) return
    
                let city = null
                try {
                    city = JSON.parse(cityStr)
                } catch (e) {
                    console.log('JSON parse error', e)
                }
    
                console.log('city from storage', city)
    
                if (city?.cityId) {
    
                    const matchedCity = response.data.find(
                        (item:any) => item.cityId === city.cityId
                    )
    
                    console.log('matchedCity', matchedCity)
    
                    if (matchedCity?.number) {
                        setCityCustomerCare(matchedCity.number)
                    }
                }
            }
    
        } catch (e) {
            console.log('loadCityName error', e)
        }
    }
    
    const loadToken = async () => {
        const token = await getToken()
        setTokenFlag(!!(token && token !== ''))
    }

    const handelLogout = async () => {
        try {
            setLogoutLoading(true)
            dispatch(removeProfile(null))
            await removeToken()
            setLogoutModal(false)
            props.navigation.reset({
                index: 0,
                routes: [{ name: 'HomeScreen' }],
            })
        } catch (e) {
            Alert.alert('Error', 'Unable to logout. Please try again.')
        } finally {
            setLogoutLoading(false)
        }
    }

    const handelLogin = async () => {
        if (phoneNumber.trim().length !== 10) {
            Alert.alert('Alert', 'Invalid mobile number')
            return
        }
        try {
            setRequestOtpLoading(true)
            const response = await Login(phoneNumber)
            if (response.code === 0) {
                setMobileNumberModal(false)
                setOtpModal(true)
            } else {
                Alert.alert('Alert', 'Unable to send OTP. Please try again.')
            }
        } catch (e) {
            Alert.alert('Error', 'Something went wrong. Please try again.')
        } finally {
            setRequestOtpLoading(false)
        }
    }

    const handelResend = async () => {
        try {
            setResendLoading(true)
            await Login(phoneNumber)
        } catch (e) {
            Alert.alert('Error', 'Unable to resend OTP.')
        } finally {
            setResendLoading(false)
        }
    }

    const handelOtp = async () => {
        if (!otp || otp.length !== 4) {
            Alert.alert('Alert!', 'Enter a valid 4-digit OTP.')
            return
        }
        try {
            setVerifyOtpLoading(true)
            const response = await Otp(phoneNumber, otp)
            if (response.code === 0) {
                await setToken(response.data.token)
                if (response.data.token && response.data.token !== '') {
                    const profileresponse = await excuteGetResponse('secure/profile')
                    if (profileresponse.code === 0) {
                        requestfirebasePermissions()
                        Foregroundmessage()
                        setOtpModal(false)
                        dispatch(updateProfile(profileresponse.data))
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'HomeScreen' }],
                        })
                    } else {
                        Alert.alert('Alert', 'Unable to load profile details.')
                    }
                }
            } else {
                Alert.alert('Alert', 'Invalid OTP. Please try again.')
            }
        } catch (e) {
            Alert.alert('Error', 'Something went wrong. Please try again.')
        } finally {
            setVerifyOtpLoading(false)
        }
    }

    const handelDeleteAccount = () => {
        Alert.alert(
            'Alert!',
            'Are you sure you want to delete your account?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            setDeleteLoading(true)
                            dispatch(removeProfile(null))
                            await removeToken()
                            props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'HomeScreen' }],
                            })
                        } catch (e) {
                            Alert.alert('Error', 'Unable to delete account.')
                        } finally {
                            setDeleteLoading(false)
                        }
                    },
                },
            ]
        )
    }

    const iconContainer = {
        backgroundColor: '#F4F6FA',
        padding: hp(1.5),
        borderRadius: 22,
    }

    const divider = {
        borderWidth: 0.6,
        borderColor: '#F4F6FA',
        marginHorizontal: wp(2),
        marginVertical: hp(1.5),
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Modal
                animationType="slide"
                transparent
                visible={mobileNumberModal}
                onRequestClose={() => setMobileNumberModal(false)}
            >
                <BottomModelView onclick={() => setMobileNumberModal(false)}>
                    <View style={{ marginHorizontal: wp(5), marginVertical: hp(2) }}>
                        <Pressable
                            onPress={() => setMobileNumberModal(false)}
                            style={{
                                backgroundColor: '#EEEEEE80',
                                borderRadius: 20,
                                width: 35, height: 35,
                                justifyContent: 'center', alignItems: 'center',
                            }}
                        >
                            <Image
                                source={require('../assets/close.png')}
                                style={{ height: 15, width: 15 }}
                            />
                        </Pressable>

                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: hp(2) }}>
                            User Login
                        </Text>
                        <Text style={{
                            fontSize: 17, fontWeight: '400', color: '#64748B',
                            marginTop: hp(1), marginBottom: hp(1.5),
                        }}>
                            Please enter your mobile number to login into your account
                        </Text>

                        <Textinput
                            image={require('../assets/call.png')}
                            placeholder='Enter your mobile number'
                            keyboardtype='numeric'
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            max={10}
                        />

                        <Text style={{
                            fontSize: 15, lineHeight: hp(2.5), color: '#64748B',
                            marginVertical: hp(1), marginHorizontal: wp(2),
                        }}>
                            By continuing you agree to our{' '}
                            <Text style={{ color: '#00354a' }}>Terms of service</Text>
                            {' '}&{' '}
                            <Text style={{ color: '#00354a' }}>Privacy policy</Text>
                        </Text>

                        <View style={{ marginVertical: hp(2) }}>
                            {requestOtpLoading ? (
                                <View style={{
                                    paddingVertical: hp(1.8),
                                    justifyContent: 'center', alignItems: 'center',
                                }}>
                                    <ActivityIndicator size="large" color="#00354a" />
                                </View>
                            ) : (
                                <PrimaryButton
                                    title='Request OTP'
                                    onclick={handelLogin}
                                />
                            )}
                        </View>
                    </View>
                </BottomModelView>
            </Modal>

            <Modal
                animationType="slide"
                transparent
                visible={otpModal}
                onRequestClose={() => setOtpModal(false)}
            >
                <BottomModelView onclick={() => setOtpModal(false)}>
                    <View style={{ marginHorizontal: wp(5), marginVertical: hp(2) }}>
                        <Pressable
                            onPress={() => setOtpModal(false)}
                            style={{
                                backgroundColor: '#EEEEEE80',
                                borderRadius: 20,
                                width: 35, height: 35,
                                justifyContent: 'center', alignItems: 'center',
                            }}
                        >
                            <Image
                                source={require('../assets/close.png')}
                                style={{ height: 15, width: 15 }}
                            />
                        </Pressable>

                        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: hp(2) }}>
                            Enter OTP
                        </Text>
                        <Text style={{
                            fontSize: 17, fontWeight: '400', color: '#64748B',
                            marginTop: hp(1), marginBottom: hp(1.5), width: wp(80),
                        }}>
                            We've sent an SMS with an activation code to your phone
                            <Text style={{ color: '#00354a', fontSize: 16 }}>  +91 {phoneNumber}</Text>
                        </Text>

                        <OtpInput
                            numberOfDigits={4}
                            focusColor="#E8ECF4"
                            focusStickBlinkingDuration={500}
                            onTextChange={(text) => setOtp(text)}
                            onFilled={(text) => console.log(`OTP is ${text}`)}
                            textInputProps={{ accessibilityLabel: 'One-Time Password' }}
                            theme={{
                                containerStyle: style.otpContainer,
                                pinCodeContainerStyle: style.otp,
                                pinCodeTextStyle: style.otpText,
                            }}
                        />

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center', alignItems: 'center',
                            marginVertical: hp(3),
                        }}>
                            <Text style={{ fontSize: 16, color: '#64748B' }}>I didn't receive a code</Text>
                            {resendLoading ? (
                                <ActivityIndicator
                                    size="small"
                                    color="#00354a"
                                    style={{ marginHorizontal: wp(2) }}
                                />
                            ) : (
                                <TouchableOpacity onPress={handelResend}>
                                    <Text style={{
                                        color: '#00354a',
                                        marginHorizontal: wp(2),
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                    }}>
                                        Resend
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={{ marginBottom: hp(2) }}>
                            {verifyOtpLoading ? (
                                <View style={{
                                    paddingVertical: hp(1.8),
                                    justifyContent: 'center', alignItems: 'center',
                                }}>
                                    <ActivityIndicator size="large" color="#00354a" />
                                </View>
                            ) : (
                                <PrimaryButton
                                    title='Verify'
                                    onclick={handelOtp}
                                />
                            )}
                        </View>
                    </View>
                </BottomModelView>
            </Modal>

            <Modal
                animationType="slide"
                transparent
                visible={logoutModal}
                onRequestClose={() => setLogoutModal(false)}
            >
                <BottomModelView onclick={() => setLogoutModal(false)}>
                    <View style={{
                        justifyContent: 'center', alignItems: 'center',
                        marginVertical: hp(3),
                    }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Log out</Text>
                        <Text style={{
                            marginVertical: hp(2), fontWeight: '500', fontSize: 15,
                        }}>
                            Do you want to log out?
                        </Text>

                        {logoutLoading ? (
                            <ActivityIndicator
                                size="large"
                                color="#00354a"
                                style={{ marginTop: hp(1) }}
                            />
                        ) : (
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                justifyContent: 'space-between', marginTop: hp(1),
                            }}>
                                <Pressable
                                    onPress={handelLogout}
                                    style={{
                                        borderWidth: 1,
                                        paddingVertical: hp(1.2),
                                        width: wp(35),
                                        justifyContent: 'center', alignItems: 'center',
                                        marginHorizontal: wp(2),
                                        borderRadius: 10,
                                        borderColor: '#00354a',
                                    }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#00354a' }}>
                                        Yes
                                    </Text>
                                </Pressable>

                                <Pressable
                                    onPress={() => setLogoutModal(false)}
                                    style={{
                                        borderWidth: 1,
                                        paddingVertical: hp(1.2),
                                        width: wp(35),
                                        justifyContent: 'center', alignItems: 'center',
                                        marginHorizontal: wp(2),
                                        borderRadius: 10,
                                        borderColor: '#00354a',
                                        backgroundColor: '#00354a',
                                    }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#ffffff' }}>
                                        No
                                    </Text>
                                </Pressable>
                            </View>
                        )}
                    </View>
                </BottomModelView>
            </Modal>

            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: '#ffffff', padding: wp(5),
                    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: hp(1) }}>
                        Profile
                    </Text>
                </View>

                <View style={{ marginHorizontal: wp(5), marginVertical: hp(2) }}>

                    <Cardview>
                        <View style={{ marginHorizontal: wp(5), marginVertical: hp(1.5) }}>
                            <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: 'bold' }}>
                                Hi, {(user && user.name && user.name !== '') ? user.name : 'Guest'}
                            </Text>
                            <Text style={{
                                color: '#64748B', fontSize: 14,
                                fontWeight: '500', marginTop: hp(0.5),
                            }}>
                                Welcome to carhive
                            </Text>
                        </View>
                    </Cardview>

                    <View style={{ marginVertical: hp(2) }}>
                        <Cardview>
                            <View style={{ marginHorizontal: wp(4), marginVertical: hp(2) }}>

                                {tokenFlag && (
                                    <>
                                        <Pressable
                                            onPress={() => props.navigation.navigate('ProfileDetailsScreen')}
                                            style={{ flexDirection: 'row', alignItems: 'center' }}
                                        >
                                            <View style={iconContainer}>
                                                <Image
                                                    source={require('../assets/frame1.png')}
                                                    style={{ height: 22, width: 22, tintColor: '#000000' }}
                                                />
                                            </View>
                                            <View style={{ marginHorizontal: wp(3) }}>
                                                <Text style={{
                                                    fontSize: 16, fontWeight: 'bold',

                                                }}>
                                                    View profile
                                                </Text>
                                                <Text style={{
                                                    fontSize: 12, fontWeight: '500',
                                                    color: '#64748B', width: wp(55),
                                                }}>
                                                    Update your personal info conveniently
                                                </Text>
                                            </View>
                                        </Pressable>
                                        <View style={divider} />
                                    </>
                                )}

                                <Pressable
                                    onPress={() => props.navigation.navigate('HostScreen')}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                >
                                    <View style={iconContainer}>
                                        <Image
                                            source={require('../assets/gift.png')}
                                            style={{ height: 22, width: 22 }}
                                        />
                                    </View>
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                            Become a Host
                                        </Text>
                                        <Text style={{
                                            fontSize: 12, fontWeight: '500',
                                            color: '#64748B', width: wp(55),
                                        }}>
                                            You want to become a host for your car
                                        </Text>
                                    </View>
                                </Pressable>
                                <View style={divider} />

                                <Pressable
                                    onPress={() => {
                                        if (cityCustomerCare) {
                                            Linking.openURL(`tel:${cityCustomerCare}`)
                                        } else {
                                            Alert.alert('Alert', 'Customer care number not available.')
                                        }
                                    }}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                >
                                    <View style={iconContainer}>
                                        <Image
                                            source={require('../assets/Chat_Circle_Dots.png')}
                                            style={{ height: 22, width: 22 }}
                                        />
                                    </View>
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Get Help</Text>
                                        <Text style={{
                                            fontSize: 12, fontWeight: '500',
                                            color: '#64748B', width: wp(55),
                                        }}>
                                            Assistance at your fingertips, support just a click.
                                        </Text>
                                    </View>
                                </Pressable>
                                <View style={divider} />

                                <Pressable
                                    onPress={() => props.navigation.navigate('NotificationScreen')}
                                    style={{ flexDirection: 'row', alignItems: 'center' }}
                                >
                                    <View style={iconContainer}>
                                        <Image
                                            source={require('../assets/bell1.png')}
                                            style={{ height: 22, width: 22 }}
                                        />
                                    </View>
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Notifications</Text>
                                        <Text style={{
                                            fontSize: 12, fontWeight: '500', color: '#64748B',
                                        }}>
                                            Check your notifications
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>
                        </Cardview>
                    </View>

                    <View>
                        <Cardview>
                            <View style={{ marginHorizontal: wp(5), marginVertical: hp(2) }}>

                                <Text
                                    onPress={() => Linking.openURL('https://carhive.co.in/terms_conditions')}
                                    style={{ fontSize: 15, fontWeight: 'bold' }}
                                >
                                    Terms & Conditions
                                </Text>

                                <View style={{
                                    borderWidth: 0.3, borderColor: '#F4F6FA', marginVertical: hp(2),
                                }} />

                                <Text
                                    onPress={() => Linking.openURL('https://carhive.co.in/privacy_policy')}
                                    style={{ fontSize: 16, fontWeight: 'bold' }}
                                >
                                    Privacy policy
                                </Text>

                                {tokenFlag ? (
                                    <>
                                        <View style={{
                                            borderWidth: 0.3, borderColor: '#F4F6FA', marginVertical: hp(2),
                                        }} />

                                        <Text
                                            onPress={() => setLogoutModal(true)}
                                            style={{ fontSize: 16, fontWeight: 'bold' }}
                                        >
                                            Logout
                                        </Text>

                                        <View style={{
                                            borderWidth: 0.5, borderColor: '#F4F6FA', marginVertical: hp(2),
                                        }} />

                                        {deleteLoading ? (
                                            <ActivityIndicator size="small" color="#00354a" />
                                        ) : (
                                            <Text
                                                onPress={handelDeleteAccount}
                                                style={{
                                                    fontSize: 16, fontWeight: 'bold',
                                                }}
                                            >
                                                Delete Account
                                            </Text>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <View style={{
                                            borderWidth: 0.5, borderColor: '#F4F6FA', marginVertical: hp(2),
                                        }} />
                                        <Text
                                            onPress={() => setMobileNumberModal(true)}
                                            style={{ fontSize: 16, fontWeight: 'bold' }}
                                        >
                                            Login
                                        </Text>
                                    </>
                                )}
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