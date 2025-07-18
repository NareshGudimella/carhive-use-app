import {
    Alert,
    Image, Linking, Modal, Platform, Pressable,
    ScrollView, Text, TextInput, TouchableOpacity, View
} from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { input } from "../styles/TextInputStyle";
import BottomTabNavigation from "../components/BottomTab";
import { Cardview } from "../components/Cardview";
import { RadioButton } from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { CenterModalView } from "../components/CenterModelView";
import { SafeAreaView } from "react-native-safe-area-context";
import { excuteGetResponse, firebasemessage, Login, Otp } from "../apis/api";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import { getToken, setToken } from "../storage/AsyncStorage";
import { BottomModelView } from "../components/BottomModelView";
import Textinput from "../components/TextInput";
import { OtpInput } from "react-native-otp-entry";
import { style } from "../styles/OtpStyle";
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from "react-native-device-info";
import { updateProfile } from "../storage/redux";
import { useDispatch, useSelector } from "react-redux";
//@ts-ignore
import RazorpayCheckout from 'react-native-razorpay';
import { Foregroundmessage, requestfirebasePermissions } from "../firebase/firebase";

class Componentprops extends Baseprops { }

const RentalsScreen: React.FC<Componentprops> = (props) => {

    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.profile)
    const [addressChecked, setAddressChecked] = useState('address');
    const [extendServiceModal, setExtendServiceModal] = useState(false)
    const [rentalData, setRentalData] = useState<any>([])
    const [price, setPrice] = useState<any>('')
    const [carId, setCarId] = useState<any>('')
    const [searchData, setSearchData] = useState<any>('')
    const [mobileNumberModal, setMobileNumberModal] = useState(false)
    const [otpModal, setOtpModal] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState<any>('')
    const [otp, setOtp] = useState<any>('')
    const [bookingd, setBookingId] = useState('')

    useFocusEffect(
        useCallback(() => {
            handelRentalDetails()
        }, [])
    )

    const handelRentalDetails = async () => {
        const token = await getToken()
        if (token && token != '') {
            const response = await excuteGetResponse(`secure/cars/bookings`)
            console.log('Rental details', response)
            if (response.code == 0) {
                setRentalData(response.data)
            } else {
                Alert.alert(
                    'Alert',
                    'Unable to get Rental Details',
                );
            }
        } else {
            setMobileNumberModal(true)
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

    const handelCancel = async (car_booking_id: any) => {
        Alert.alert('Alert', 'Are you sure do you want to cancel the booking', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: "cancel",
            },
            {
                text: 'OK',
                onPress: async () => {
                    const response = await excuteGetResponse(`secure/cars/bookings/cancel/${car_booking_id}`)
                    console.log('cancel', response)
                    if (response.code == 0) {
                        handelRentalDetails()
                    } else {
                        Alert.alert('Alert', 'Unable to get details')
                    }
                }
            }
        ])
        return
    }

    const openLocationInGoogleMaps = (lat: number, lng: number) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        Linking.openURL(url).catch(err => {
            Alert.alert('Error', 'Could not open the map. Please try again.');
        });
    };

    const handelExtendPayment = async (booking_car_id: any) => {
        const response = await excuteGetResponse(`secure/cars/extended_payment/${booking_car_id}`)
        if (response.code == 0) {
            var options = {
                description: 'Payment for booking',
                image: response.data.image,
                currency: 'INR',
                key: response.data.key,
                amount: response.data.amount,
                name: 'CARHIVE SERVICES',
                prefill: {
                    email: user.email,
                    contact: user.mobile,
                    name: user.name
                },
                order_id: response.data.id,
                theme: { color: '#F37254' }
            }
            RazorpayCheckout.open(options).then((data: any) => {
                console.log('data', data)
                props.navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'PaymentSuccessScreen',
                            params: { amount: response.data.actual_amount }
                        }
                    ],
                });
            }).catch((error: any) => {
                console.log('ERROR', error)
                Alert.alert('Payment failed', 'Please try again.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                );
            });
        } else {
            Alert.alert('Alert', 'unable to get Booking Payment Details')
        }

    }

    const handelExtendKms = async (booking_car_id: any) => {
        const response = await excuteGetResponse(`secure/cars/extra_payment/${booking_car_id}`)
        if (response.code == 0) {
            setBookingId(response.data.booking_id)
            var options = {
                description: 'Payment for booking',
                image: response.data.image,
                currency: 'INR',
                key: response.data.key,
                amount: response.data.amount,
                name: 'CARHIVE SERVICES',
                prefill: {
                    email: user.email,
                    contact: user.mobile,
                    name: user.name
                },
                order_id: response.data.id,
                theme: { color: '#F37254' }
            }
            RazorpayCheckout.open(options).then((data: any) => {
                console.log('data', data)
                props.navigation.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'PaymentSuccessScreen',
                            params: { amount: response.data.actual_amount }
                        }
                    ],
                });
            }).catch((error: any) => {
                console.log('ERROR', error)
                Alert.alert('Payment failed', 'Please try again.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') }
                    ],
                );
            });
        } else {
            Alert.alert('Alert', 'unable to get Booking Payment Details')
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
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
            </View>

            <View>
                {otpModal &&
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
            </View>

            <View>
                {extendServiceModal &&
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={extendServiceModal}
                            onRequestClose={() => {
                                setExtendServiceModal(!extendServiceModal);
                            }}
                        >
                            <CenterModalView>
                                <View style={{
                                    padding: hp(2),
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingVertical: hp(3)
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        width: wp(60),
                                        textAlign: 'center'
                                    }}>Are you sure want to extend your service?</Text>
                                    <Text style={{
                                        fontSize: 22,
                                        fontWeight: '500',
                                        marginVertical: hp(2)
                                    }}>₹{price}<Text
                                        style={{ color: '#64748B' }}>/Km</Text></Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginVertical: hp(0.5),
                                        marginTop: hp(2)
                                    }}>
                                        <Pressable
                                            onPress={() => setExtendServiceModal(false)}
                                            style={{
                                                borderWidth: 1,
                                                paddingHorizontal: wp(7),
                                                paddingVertical: hp(1.3),
                                                borderRadius: 10,
                                                borderColor: '#00354a',
                                                marginHorizontal: wp(2)
                                            }}>
                                            <Text style={{
                                                color: '#00354a',
                                                fontWeight: 'bold'
                                            }}>No, Continue</Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => {
                                                props.navigation.navigate('ExtendServiceRequestScreen', { id: carId }),
                                                    setExtendServiceModal(false)
                                            }}
                                            style={{
                                                borderWidth: 1,
                                                paddingHorizontal: wp(7),
                                                paddingVertical: hp(1.3),
                                                borderRadius: 10,
                                                borderColor: '#00354a',
                                                backgroundColor: '#00354a',
                                                marginHorizontal: wp(2)
                                            }}>
                                            <Text style={{
                                                fontWeight: '500',
                                                color: '#ffffff'
                                            }}>Extend Now</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </CenterModalView>
                        </Modal>
                    </View>
                }
            </View>

            <View style={{
                backgroundColor: '#ffffff',
                padding: hp(2),
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20
            }}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginVertical: hp(1)
                }}>Rentals</Text>
            </View>
            <View style={{
                backgroundColor: '#ffffff',
                borderRadius: 10,
                elevation: 1,
                height: hp(6),
                marginVertical: hp(1),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: wp(5),
                marginHorizontal: wp(5)
            }}>
                <Image source={require('../assets/search.png')}
                    style={input.imgstyle} />
                <TextInput
                    placeholder="Search by Vehicle..."
                    placeholderTextColor='#64748B'
                    onChangeText={setSearchData}
                    value={searchData}
                    style={{
                        fontSize: 15,
                        fontWeight: '500',
                        width: wp(70),
                        marginHorizontal: wp(2)
                    }} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    marginHorizontal: wp(5),
                    marginVertical: hp(1)
                }}>
                {rentalData && rentalData.filter((e1: any) => searchData.trim === '' ||
                    e1.brand?.toLowerCase().includes(searchData.toLowerCase())).map((e: any, index: any) => (
                        <View key={index}>
                            {
                                e.status == 'PENDING' ?
                                    <Pressable
                                        onPress={() => props.navigation.navigate('OrderDetailsScreen', { Id: e.car_booking_id })}
                                        style={{ marginVertical: hp(0.5) }}>
                                        <Cardview>
                                            <View>
                                                <View style={{
                                                    backgroundColor: '#FBC41D',
                                                    width: wp(25),
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    paddingVertical: hp(1),
                                                    alignSelf: 'flex-end',
                                                    borderTopRightRadius: 15,
                                                    borderBottomLeftRadius: 10
                                                }}>
                                                    <Text
                                                        style={{
                                                            color: '#ffffff',
                                                            fontSize: 13,
                                                            fontWeight: 'bold'
                                                        }}
                                                    >{e.status}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginHorizontal: wp(4)
                                                }}>
                                                    <Image
                                                        source={{ uri: e.car_image }}
                                                        style={{
                                                            height: 50,
                                                            width: 70
                                                        }} />
                                                    <View style={{
                                                        marginHorizontal: wp(3)
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            fontWeight: 'bold'
                                                        }}>
                                                            Booking ID : {e.booking_id}</Text>
                                                        <Text
                                                            style={{
                                                                color: '#64748B',
                                                                fontSize: 13,
                                                                fontWeight: '500',
                                                                marginTop: 2
                                                            }}>{e.brand} {e.model} - {e.registeration_number}</Text>
                                                    </View>
                                                </View>
                                                <Text
                                                    style={{
                                                        fontSize: 12,
                                                        fontWeight: 'bold',
                                                        marginHorizontal: wp(5),
                                                        marginVertical: hp(2),
                                                        textAlign: 'center'
                                                    }}>{moment(e.from_date).format('DD MMM YYYY HH:mm A')} -
                                                    {moment(e.to_date).format('DD MMM YYYY HH:mm A')}</Text>
                                            </View>
                                            <Pressable
                                                onPress={() => {
                                                    handelCancel(e.car_booking_id)
                                                }}
                                                style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    backgroundColor: '#E34234',
                                                    height: hp(6),
                                                    marginHorizontal: wp(10),
                                                    marginBottom: hp(1.4),
                                                    borderRadius: 10
                                                }}>
                                                <Text
                                                    style={{
                                                        color: '#ffffff',
                                                        fontWeight: 'bold',
                                                        fontSize: 15
                                                    }}
                                                >Cancel</Text>
                                            </Pressable>
                                        </Cardview>
                                    </Pressable> :
                                    e.status == 'ACCEPTED' ?
                                        <Pressable
                                            onPress={() => props.navigation.navigate('OrderDetailsScreen', { Id: e.car_booking_id })}
                                            style={{ marginVertical: hp(0.5) }}
                                        >
                                            <Cardview>
                                                <View>
                                                    <View style={{
                                                        backgroundColor: '#1D85FB',
                                                        width: wp(25),
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        paddingVertical: hp(1),
                                                        alignSelf: 'flex-end',
                                                        borderTopRightRadius: 15,
                                                        borderBottomLeftRadius: 10
                                                    }}>
                                                        <Text
                                                            style={{
                                                                color: '#ffffff',
                                                                fontSize: 13,
                                                                fontWeight: 'bold'
                                                            }}
                                                        >{e.status}</Text>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        marginHorizontal: wp(4)
                                                    }}>
                                                        <Image
                                                            source={{ uri: e.car_image }}
                                                            style={{
                                                                height: 50,
                                                                width: 70
                                                            }} />
                                                        <View style={{
                                                            marginHorizontal: wp(3)
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 16,
                                                                fontWeight: 'bold'
                                                            }}>Booking ID :
                                                                {e.booking_id}</Text>
                                                            <Text
                                                                style={{
                                                                    color: '#64748B',
                                                                    fontSize: 13,
                                                                    fontWeight: '500',
                                                                    marginTop: 2
                                                                }}>{e.brand} {e.model} - {e.registeration_number}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        marginHorizontal: wp(5),
                                                        marginVertical: hp(1.5)
                                                    }}>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                fontWeight: 'bold',
                                                                color: '#64748B'
                                                            }}>
                                                            Delivery date :{moment(e.to_date).format('DD MMM YYYY HH:mm A')}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                fontSize: 12,
                                                                fontWeight: 'bold',

                                                            }}> {e.date}</Text>
                                                    </View>
                                                    <View style={{
                                                        marginHorizontal: wp(5)
                                                    }}>
                                                        <Text style={{
                                                            fontSize: 13,
                                                            fontWeight: 'bold',
                                                            color: '#64748B'
                                                        }}>Host Details</Text>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            marginVertical: hp(1.5)
                                                        }}>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center'
                                                            }}>
                                                                <Image
                                                                    source={require('../assets/user.png')}
                                                                    style={{
                                                                        height: 50,
                                                                        width: 50
                                                                    }} />
                                                                <Text
                                                                    style={{
                                                                        fontSize: 16,
                                                                        fontWeight: 'bold',
                                                                        marginHorizontal: wp(4)
                                                                    }}>{e.vendor_name
                                                                    }</Text>
                                                            </View>
                                                            <Pressable onPress={() => Linking.openURL(`tel: ${e.vendor_mobile}`)}>
                                                                <Image
                                                                    source={require('../assets/call1.png')}
                                                                    style={{
                                                                        height: 40,
                                                                        width: 40
                                                                    }} />
                                                            </Pressable>
                                                        </View>
                                                        <Text
                                                            style={{
                                                                fontSize: 13,
                                                                fontWeight: '500',
                                                                color: '#64748B'
                                                            }}>Pickup Location</Text>
                                                        <Pressable
                                                            onPress={() => {
                                                                openLocationInGoogleMaps(e.latitude, e.longitude),
                                                                setAddressChecked('address')
                                                            } }
                                                            style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                marginVertical: hp(1),
                                                                marginBottom: hp(2)
                                                            }}>
                                                            <RadioButton
                                                                value="address"
                                                                status={addressChecked === 'address' ? 'checked' : 'unchecked'}
                                                                onPress={() => setAddressChecked('address')}
                                                                color="#34C759"
                                                                uncheckedColor="#13131380"
                                                            />
                                                            <Text
                                                                style={{
                                                                    width: wp(60),
                                                                    fontSize: 13,
                                                                    fontWeight: '500'
                                                                }}>{e.location}</Text>
                                                        </Pressable>
                                                    </View>
                                                </View>
                                                <Pressable
                                                    onPress={() => {
                                                        handelCancel(e.car_booking_id)
                                                    }}
                                                    style={{
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: '#E34234',
                                                        height: hp(6),
                                                        marginHorizontal: wp(10),
                                                        marginBottom: hp(1.4),
                                                        borderRadius: 10
                                                    }}>
                                                    <Text
                                                        style={{
                                                            color: '#ffffff',
                                                            fontWeight: 'bold',
                                                            fontSize: 15
                                                        }}
                                                    >Cancel</Text>
                                                </Pressable>
                                            </Cardview>
                                        </Pressable> :
                                        e.status == 'ONGOING' ?
                                            <Pressable
                                                onPress={() => props.navigation.navigate('OrderDetailsScreen', { Id: e.car_booking_id })}
                                                style={{ marginVertical: hp(0.5) }}>
                                                <Cardview>
                                                    <View>
                                                        <View style={{
                                                            backgroundColor: '#FF8300',
                                                            width: wp(25),
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            paddingVertical: hp(1),
                                                            alignSelf: 'flex-end',
                                                            borderTopRightRadius: 15,
                                                            borderBottomLeftRadius: 10
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    color: '#ffffff',
                                                                    fontSize: 13,
                                                                    fontWeight: 'bold'
                                                                }}
                                                            >{e.status}</Text>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            marginHorizontal: wp(4)
                                                        }}>
                                                            <Image
                                                                source={{ uri: e.car_image }}
                                                                style={{
                                                                    height: 50,
                                                                    width: 70
                                                                }} />
                                                            <View style={{
                                                                marginHorizontal: wp(3)
                                                            }}>
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    fontWeight: 'bold'
                                                                }}>
                                                                    Booking ID :
                                                                    {e.booking_id}
                                                                </Text>
                                                                <Text
                                                                    style={{
                                                                        color: '#64748B',
                                                                        fontSize: 13,
                                                                        fontWeight: '500',
                                                                        marginTop: 2
                                                                    }}>{e.brand} {e.model} - {e.registeration_number}
                                                                </Text>
                                                            </View>
                                                        </View>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            marginHorizontal: wp(5),
                                                            marginVertical: hp(2)
                                                        }}>
                                                            <Text
                                                                style={{
                                                                    fontSize: 12,
                                                                    fontWeight: 'bold',
                                                                    color: '#64748B'
                                                                }}>
                                                                Expected Return on :
                                                            </Text>
                                                            <Text
                                                                style={{
                                                                    fontSize: 12,
                                                                    fontWeight: 'bold',

                                                                }}> {moment(e.to_date).format('DD MMM YYYY HH:mm A')}
                                                            </Text>
                                                        </View>

                                                        {
                                                            e.pay_flag == 1 ?
                                                                <View>
                                                                    <View style={{
                                                                        marginHorizontal: wp(4)
                                                                    }}>
                                                                        <View
                                                                            style={{
                                                                                borderWidth: 0.5,
                                                                                borderColor: '#64748B29',
                                                                                borderStyle: 'dashed',
                                                                                marginBottom: hp(1)
                                                                            }} />
                                                                        <View>
                                                                            <Text
                                                                                style={{
                                                                                    fontSize: 13,
                                                                                    fontWeight: 'bold'
                                                                                }}
                                                                            >Actual Kms to drive :
                                                                                <Text
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        fontWeight: '500',
                                                                                        color: '#525252'
                                                                                    }}
                                                                                > {e.total_kms
                                                                                    }</Text></Text>
                                                                            <Text
                                                                                style={{
                                                                                    fontSize: 13,
                                                                                    fontWeight: 'bold'
                                                                                }}
                                                                            >Kms driven :
                                                                                <Text
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        fontWeight: '500',
                                                                                        color: '#525252'
                                                                                    }}
                                                                                > {e.total_kms_driven}
                                                                                </Text>
                                                                            </Text>
                                                                            <Text
                                                                                style={{
                                                                                    fontSize: 13,
                                                                                    fontWeight: 'bold'
                                                                                }}
                                                                            >Extra Kms driven :
                                                                                <Text
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        fontWeight: '500',
                                                                                        color: '#525252'
                                                                                    }}
                                                                                > {e.extra_kms}</Text></Text>
                                                                        </View>
                                                                        <View
                                                                            style={{
                                                                                borderWidth: 0.5,
                                                                                borderColor: '#64748B29',
                                                                                borderStyle: 'dashed',
                                                                                marginVertical: hp(1)
                                                                            }} />
                                                                    </View>
                                                                    <View style={{
                                                                        marginBottom: hp(2),
                                                                        marginHorizontal: wp(10)
                                                                    }}>
                                                                        <Pressable
                                                                            onPress={() => {
                                                                                handelExtendKms(e.car_booking_id)
                                                                            }}
                                                                            style={{
                                                                                backgroundColor: '#FBC41D',
                                                                                justifyContent: 'center',
                                                                                alignItems: 'center',
                                                                                height: hp(6),
                                                                                borderRadius: 10
                                                                            }}>
                                                                            <Text style={{
                                                                                color: '#000000',
                                                                                fontWeight: 'bold'
                                                                            }}>Pay   ₹{e.extra_charges}</Text>
                                                                        </Pressable>
                                                                    </View>
                                                                </View> :
                                                                <>
                                                                    {
                                                                        e.submit_flag == 1 ?
                                                                            <View style={{
                                                                                marginBottom: hp(2),
                                                                                marginHorizontal: wp(10)
                                                                            }}>
                                                                                <PrimaryButton
                                                                                    title='Extend Service'
                                                                                    onclick={() => {
                                                                                        setExtendServiceModal(true)
                                                                                        setCarId(e.car_booking_id)
                                                                                        setPrice(e.pirce_per_hour)
                                                                                    }} />
                                                                            </View> : <></>

                                                                    }
                                                                </>

                                                        }
                                                    </View>
                                                </Cardview>
                                            </Pressable>
                                            : e.status == 'COMPLETED' ?
                                                <Pressable
                                                    onPress={() => props.navigation.navigate('OrderDetailsScreen', { Id: e.car_booking_id })}
                                                    style={{ marginVertical: hp(0.5) }}>
                                                    <Cardview>
                                                        <View>
                                                            <View style={{
                                                                backgroundColor: '#0BB335',
                                                                width: wp(25),
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                paddingVertical: hp(1),
                                                                alignSelf: 'flex-end',
                                                                borderTopRightRadius: 15,
                                                                borderBottomLeftRadius: 10
                                                            }}>
                                                                <Text
                                                                    style={{
                                                                        color: '#ffffff',
                                                                        fontSize: 13,
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                >{e.status}</Text>
                                                            </View>
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                marginHorizontal: wp(4)
                                                            }}>
                                                                <Image
                                                                    source={{ uri: e.car_image }}
                                                                    style={{
                                                                        height: 50,
                                                                        width: 70
                                                                    }} />
                                                                <View style={{
                                                                    marginHorizontal: wp(3)
                                                                }}>
                                                                    <Text style={{
                                                                        fontSize: 16,
                                                                        fontWeight: 'bold'
                                                                    }}>
                                                                        Booking ID :
                                                                        {e.booking_id}</Text>
                                                                    <Text
                                                                        style={{
                                                                            color: '#64748B',
                                                                            fontSize: 13,
                                                                            fontWeight: '500',
                                                                            marginTop: 2
                                                                        }}>{e.brand} {e.model} - {e.registeration_number}</Text>
                                                                </View>
                                                            </View>
                                                            <Text
                                                                style={{
                                                                    fontSize: 12,
                                                                    fontWeight: 'bold',
                                                                    marginHorizontal: wp(5),
                                                                    marginVertical: hp(2),
                                                                    textAlign: 'center'
                                                                }}>{moment(e.from_date).format('DD MMM YYYY HH:mm A')}
                                                                - {moment(e.to_date).format('DD MMM YYYY HH:mm A')}</Text>
                                                            {e.rating_flag == 1 ? <View style={{
                                                                marginBottom: hp(2),
                                                                marginHorizontal: wp(10)
                                                            }}>
                                                                <PrimaryButton
                                                                    title='Rate your Experience'
                                                                    onclick={() => props.navigation.navigate('RattingScreen', { id: e.car_booking_id })} />
                                                            </View> : <></>}
                                                        </View>
                                                    </Cardview>
                                                </Pressable>
                                                : e.status == 'EXTEND' ?
                                                    <Pressable
                                                        onPress={() => props.navigation.navigate('OrderDetailsScreen', { Id: e.car_booking_id })}
                                                        style={{ marginVertical: hp(0.5) }}>
                                                        <Cardview>
                                                            <View>
                                                                <View style={{
                                                                    backgroundColor: '#FF0000',
                                                                    width: wp(25),
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    paddingVertical: hp(1),
                                                                    alignSelf: 'flex-end',
                                                                    borderTopRightRadius: 15,
                                                                    borderBottomLeftRadius: 10
                                                                }}>
                                                                    <Text
                                                                        style={{
                                                                            color: '#ffffff',
                                                                            fontSize: 13,
                                                                            fontWeight: 'bold'
                                                                        }}
                                                                    >{e.status}</Text>
                                                                </View>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    marginHorizontal: wp(4)
                                                                }}>
                                                                    <Image
                                                                        source={{ uri: e.car_image }}
                                                                        style={{
                                                                            height: 50,
                                                                            width: 70
                                                                        }} />
                                                                    <View style={{
                                                                        marginHorizontal: wp(3)
                                                                    }}>
                                                                        <Text style={{
                                                                            fontSize: 16,
                                                                            fontWeight: 'bold'
                                                                        }}>
                                                                            Booking ID :
                                                                            {e.booking_id}
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                color: '#64748B',
                                                                                fontSize: 13,
                                                                                fontWeight: '500',
                                                                                marginTop: 2
                                                                            }}>{e.brand} {e.model} - {e.registeration_number}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    marginHorizontal: wp(5),
                                                                    marginVertical: hp(2)
                                                                }}>
                                                                    <Text
                                                                        style={{
                                                                            fontSize: 12,
                                                                            fontWeight: 'bold',
                                                                            color: '#64748B'
                                                                        }}>
                                                                        Extended Time :
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            fontSize: 12,
                                                                            fontWeight: 'bold',

                                                                        }}> {moment(e.extended_date).format('DD MMM YYYY HH:mm A')}
                                                                    </Text>
                                                                </View>
                                                                {
                                                                    e.pay_flag
                                                                        == 1 ?
                                                                        <View style={{
                                                                            marginBottom: hp(2),
                                                                            marginHorizontal: wp(10)
                                                                        }}>
                                                                            <Pressable
                                                                                onPress={() => {
                                                                                    handelExtendPayment(e.car_booking_id)
                                                                                }}
                                                                                style={{
                                                                                    backgroundColor: '#FBC41D',
                                                                                    justifyContent: 'center',
                                                                                    alignItems: 'center',
                                                                                    height: hp(6),
                                                                                    borderRadius: 10
                                                                                }}>
                                                                                <Text style={{
                                                                                    color: '#000000',
                                                                                    fontWeight: 'bold'
                                                                                }}>Pay</Text>
                                                                            </Pressable>
                                                                        </View> :
                                                                        <></>
                                                                }
                                                            </View>
                                                        </Cardview>
                                                    </Pressable>
                                                    : e.status == 'EXTENDED' ?
                                                        <Pressable
                                                            onPress={() => props.navigation.navigate('OrderDetailsScreen', { Id: e.car_booking_id })}
                                                            style={{ marginVertical: hp(0.5) }}>
                                                            <Cardview>
                                                                <View>
                                                                    <View
                                                                        style={{
                                                                            backgroundColor: '#FF8300',
                                                                            width: wp(25),
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                            paddingVertical: hp(1),
                                                                            alignSelf: 'flex-end',
                                                                            borderTopRightRadius: 15,
                                                                            borderBottomLeftRadius: 10
                                                                        }}>
                                                                        <Text
                                                                            style={{
                                                                                color: '#ffffff',
                                                                                fontSize: 13,
                                                                                fontWeight: 'bold'
                                                                            }}
                                                                        >{e.status}</Text>
                                                                    </View>
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        marginHorizontal: wp(4)
                                                                    }}>
                                                                        <Image
                                                                            source={{ uri: e.car_image }}
                                                                            style={{
                                                                                height: 50,
                                                                                width: 70
                                                                            }} />
                                                                        <View style={{
                                                                            marginHorizontal: wp(3)
                                                                        }}>
                                                                            <Text style={{
                                                                                fontSize: 16,
                                                                                fontWeight: 'bold'
                                                                            }}>
                                                                                Booking ID :
                                                                                {e.booking_id}
                                                                            </Text>
                                                                            <Text
                                                                                style={{
                                                                                    color: '#64748B',
                                                                                    fontSize: 13,
                                                                                    fontWeight: '500',
                                                                                    marginTop: 2
                                                                                }}>{e.brand} {e.model} - {e.registeration_number}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        alignItems: 'center',
                                                                        marginHorizontal: wp(5),
                                                                        marginVertical: hp(2)
                                                                    }}>
                                                                        <Text
                                                                            style={{
                                                                                fontSize: 12,
                                                                                fontWeight: 'bold',
                                                                                color: '#64748B'
                                                                            }}>
                                                                            Extended Time :
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                fontSize: 12,
                                                                                fontWeight: 'bold',

                                                                            }}> {moment(e.extended_date).format('DD MMM YYYY HH:mm A')}
                                                                        </Text>
                                                                    </View>
                                                                    {e.pay_flag == 1 ?
                                                                        <View>
                                                                            <View style={{
                                                                                marginHorizontal: wp(4)
                                                                            }}>
                                                                                <View
                                                                                    style={{
                                                                                        borderWidth: 0.5,
                                                                                        borderColor: '#64748B29',
                                                                                        borderStyle: 'dashed',
                                                                                        marginBottom: hp(1)
                                                                                    }} />
                                                                                <View>
                                                                                    <Text
                                                                                        style={{
                                                                                            fontSize: 13,
                                                                                            fontWeight: 'bold'
                                                                                        }}
                                                                                    >Actual Kms to drive :
                                                                                        <Text
                                                                                            style={{
                                                                                                fontSize: 14,
                                                                                                fontWeight: '500',
                                                                                                color: '#525252'
                                                                                            }}
                                                                                        > {e.total_kms
                                                                                            }</Text></Text>
                                                                                    <Text
                                                                                        style={{
                                                                                            fontSize: 13,
                                                                                            fontWeight: 'bold'
                                                                                        }}
                                                                                    >Kms driven :
                                                                                        <Text
                                                                                            style={{
                                                                                                fontSize: 14,
                                                                                                fontWeight: '500',
                                                                                                color: '#525252'
                                                                                            }}
                                                                                        > {e.total_kms_driven}
                                                                                        </Text>
                                                                                    </Text>
                                                                                    <Text
                                                                                        style={{
                                                                                            fontSize: 13,
                                                                                            fontWeight: 'bold'
                                                                                        }}
                                                                                    >Extra Kms driven :
                                                                                        <Text
                                                                                            style={{
                                                                                                fontSize: 14,
                                                                                                fontWeight: '500',
                                                                                                color: '#525252'
                                                                                            }}
                                                                                        > {e.extra_kms}</Text></Text>
                                                                                </View>
                                                                                <View
                                                                                    style={{
                                                                                        borderWidth: 0.5,
                                                                                        borderColor: '#64748B29',
                                                                                        borderStyle: 'dashed',
                                                                                        marginVertical: hp(1)
                                                                                    }} />
                                                                            </View>
                                                                            <View style={{
                                                                                marginBottom: hp(2),
                                                                                marginHorizontal: wp(10)
                                                                            }}>
                                                                                <Pressable
                                                                                    onPress={() => {
                                                                                        handelExtendKms(e.car_booking_id)
                                                                                    }}
                                                                                    style={{
                                                                                        backgroundColor: '#FBC41D',
                                                                                        justifyContent: 'center',
                                                                                        alignItems: 'center',
                                                                                        height: hp(6),
                                                                                        borderRadius: 10
                                                                                    }}>
                                                                                    <Text style={{
                                                                                        color: '#000000',
                                                                                        fontWeight: 'bold'
                                                                                    }}>Pay   ₹{e.extra_charges}</Text>
                                                                                </Pressable>
                                                                            </View>
                                                                        </View> : <></>}

                                                                </View>
                                                            </Cardview>
                                                        </Pressable> : <></>
                            }
                        </View>
                    ))}
            </ScrollView>
            <BottomTabNavigation step={2} navigation={props.navigation} />
        </SafeAreaView>
    )
}
export default RentalsScreen