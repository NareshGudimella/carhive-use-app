import {
    ActivityIndicator, Alert, Image, Modal, Platform, Pressable,
    ScrollView, Text, TouchableOpacity, View
} from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { BackButtonStyle } from "../styles/BackButtonStyle";
import { Cardview } from "../components/Cardview";
import React, { useCallback, useState } from "react";
import { ImageStyle } from "../styles/ImageStyle";
import { Rating } from 'react-native-ratings';
import PrimaryButton from "../components/PrimaryButton";
import { BottomModelView } from "../components/BottomModelView";
import Textinput from "../components/TextInput";
import { OtpInput } from "react-native-otp-entry";
import { style } from "../styles/OtpStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    aadharnumberverify, aadharotpverify, carDetails,
    excuteGetResponse, licenceverify, Login, Otp,
    addFavouriteCar, getFavouriteCars, removeFavouriteCar,
} from "../apis/api";
import { getToken, setToken } from "../storage/AsyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { input } from "../styles/TextInputStyle";
//import DatePicker from "react-native-date-picker";
import moment from "moment";
import CameraModalScreen from "../components/CameraModel";
import { Asset } from "react-native-image-picker";
import { CameraView } from "../components/CameraView";
import { updateProfile } from "../storage/redux";
import { useDispatch } from "react-redux";
import { Foregroundmessage, requestfirebasePermissions } from "../firebase/firebase";
import CarViewScreen from "./CarViewScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReadMore from '@fawazahmed/react-native-read-more';
import DateTimePicker from '@react-native-community/datetimepicker';
import { showMessage } from "../components/MessageModal";
import { getFriendlyError } from "../utils/apiMessages";
import { showAccountRestored } from "../utils/session";

class Componentprops extends Baseprops { }

// KYC flags: 1 = verified by Cashfree, 2 = verified manually by admin.
const isVerified = (flag: any) => flag == 1 || flag == 2

const VehicleDetailsScreen: React.FC<Componentprops> = (props) => {

    const [textExpanded, setTextExpanded] = useState(false);
    const [mobileNumberModal, setMobileNumberModal] = useState(false)
    const [otpModal, setOtpModal] = useState(false)
    const [otp, setOtp] = useState<any>('')
    const [phoneNumber, setPhoneNumber] = useState<any>('')
    const [carData, setCarData] = useState<any>(null)
    const ref = React.useRef<ICarouselInstance>(null);
    const [aadharmodal, setAadharmodal] = useState(false)
    const [aadharnumber, setAadharnumber] = useState<any>('')
    const [licencemodal, setLicencemodal] = useState<any>(false)
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [aadharotpmodal, setAadharotpmodal] = useState(false);
    const [aadharotp, setAadharotp] = useState<any>('')
    const [licencenumber, setlicencenumber] = useState<any>('')
    const [cameraModal, SetCaremaModal] = useState(false)
    const [aadharfront, setAadharfront] = useState<Asset | null>(null)
    const [aadharback, setAadharBack] = useState<Asset | null>(null)
    const [licenseback, setlicenseBack] = useState<Asset | null>(null)
    const [licensefront, setlicensefront] = useState<Asset | null>(null)
    const [targetType, setTargetType] = useState('');
    const [userDetailsObj, setUserDetailsObj] = useState<any>({})
    const [indicator, setIndiCator] = useState(false)
    const dispatch = useDispatch()
    const [carImageVisible, setCarImageVisible] = useState(false)
    const [selectedImage, setSelectedImage] = useState<any>(null)

    const [loginIndicator, setLoginIndicator] = useState(false)
    const [otpIndicator, setOtpIndicator] = useState(false)

    // FIX 1: Added carLoadingIndicator for initial vehicle details fetch
    const [carLoadingIndicator, setCarLoadingIndicator] = useState(false)

    // FIX 2: Added licenceIndicator for licence submit separately from aadhar indicator
    const [licenceIndicator, setLicenceIndicator] = useState(false)

    // Favourites (only shown when logged in)
    const [loggedIn, setLoggedIn] = useState(false)
    const [favourite, setFavourite] = useState(false)
    const [favouriteLoading, setFavouriteLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            if (props.route.params && props.route.params?.id) {
                handelVicheDetails(props.route.params?.id)
                loadFavourite(props.route.params?.id)
            }
        }, [])
    )

    const loadFavourite = async (carid: any) => {
        const token = await getToken()
        const hasToken = !!(token && token != '')
        setLoggedIn(hasToken)
        if (!hasToken) {
            return
        }
        const response = await getFavouriteCars()
        if (response.code == 0 && Array.isArray(response.data)) {
            setFavourite(response.data.some((e: any) => e.carid == carid))
        }
    }

    const handelFavourite = async () => {
        const carid = props.route.params?.id
        if (!carid || favouriteLoading) {
            return
        }
        setFavouriteLoading(true)
        const response = favourite ? await removeFavouriteCar(carid) : await addFavouriteCar(carid)
        setFavouriteLoading(false)
        if (response.code == 0 || (!favourite && response.message == 'ALREADY_EXIST')) {
            setFavourite(!favourite)
        } else {
            showMessage(getFriendlyError(response))
        }
    }

    const handleInputChangeValue = (key: string, value: any) => {
        setUserDetailsObj((e: any) => ({ ...e, [key]: value }))
    }

    const handelButtonSubmit = async () => {
        const token = await getToken()
        if (token && token != '') {
            setIndiCator(true)
            const response = await excuteGetResponse('secure/profile')
            setIndiCator(false)
            if (response.code != 0 || !response.data) {
                showMessage(getFriendlyError(response))
                return
            }
            if (!isVerified(response.data.aadhar_verfy_flag)) {
                setAadharmodal(true)
                setIndiCator(false)
            } else if (!isVerified(response.data.driving_licence_flag)) {
                setLicencemodal(true)
                setIndiCator(false)
            } else if (response.data.profile_flag == 0) {
                props.navigation.navigate('SignupScreen', {
                    carid: carData && carData.carid,
                    from_date: carData && carData.from_date,
                    to_date: carData && carData.to_date,
                    latitude: carData && carData.latitude,
                    longitude: carData && carData.longitude
                })
                setIndiCator(false)
            } else if (response.data.profile_flag == 1) {
                props.navigation.navigate('CarSummaryScreen',
                    {
                        carid: carData.carid,
                        fromDate: carData.from_date,
                        toDate: carData.to_date,
                        lat: carData.latitude,
                        long: carData.longitude
                    })
                setIndiCator(false)
            }
        } else {
            setMobileNumberModal(true)
        }
    }

    // FIX 3: handelLogin no longer closes the modal before calling the API.
    // The modal stays open so loginIndicator is visible to the user during the request.
    const handelLogin = async () => {
        if (phoneNumber.trim().length != 10) {
            showMessage({ kind: 'warning', title: 'Invalid mobile number', message: 'Please enter a valid 10-digit mobile number.' })
            return
        }
        setLoginIndicator(true)
        const response = await Login(phoneNumber)
        setLoginIndicator(false)
        if (response.code == 0) {
            setMobileNumberModal(false)
            setOtpModal(true)
        } else {
            showMessage(getFriendlyError(response, 'login'))
        }
    }

    const handelOtp = async () => {
        if (!otp || otp.length !== 4) {
            showMessage({ kind: 'warning', title: 'Enter the OTP', message: 'Please enter the 4-digit OTP sent to your mobile number.' });
            return;
        }
        setOtpIndicator(true)
        const response = await Otp(phoneNumber, otp)
        if (response.code == 0) {
            setToken(response.data.token)
            const token = await getToken()
            if (token && token != '') {
                const profileresponse = await excuteGetResponse('secure/profile')
                setOtpIndicator(false)
                if (profileresponse.code == 0) {
                    requestfirebasePermissions()
                    Foregroundmessage()
                    dispatch(updateProfile(profileresponse.data));
                    showAccountRestored(response)
                    setLoggedIn(true)
                    loadFavourite(props.route.params?.id)
                    if (!isVerified(profileresponse.data.aadhar_verfy_flag)) {
                        setOtpModal(false)
                        setTimeout(() => {
                            setAadharmodal(true)
                        }, 1000);
                    } else if (!isVerified(profileresponse.data.driving_licence_flag)) {
                        setOtpModal(false)
                        setLicencemodal(true)
                    } else if (profileresponse.data.profile_flag == 0) {
                        setOtpModal(false)
                        props.navigation.navigate('SignupScreen', {
                            carid: carData.carid,
                            fromDate: carData.from_date,
                            toDate: carData.to_date,
                            lat: carData.latitude,
                            long: carData.longitude
                        })
                    } else if (profileresponse.data.profile_flag == 1) {
                        setOtpModal(false)
                        props.navigation.navigate('CarSummaryScreen',
                            {
                                carid: carData.carid,
                                fromDate: carData.from_date,
                                toDate: carData.to_date,
                                lat: carData.latitude,
                                long: carData.longitude
                            })
                    }
                } else {
                    setOtpIndicator(false)
                    showMessage(getFriendlyError(profileresponse))
                }
            }
        } else {
            setOtpIndicator(false)
            showMessage(getFriendlyError(response, 'loginOtp'))
        }
    }

    // FIX 4: Added carLoadingIndicator around the vehicle details fetch
    const handelVicheDetails = async (carid: any) => {
        setCarLoadingIndicator(true)
        const response1 = await carDetails(carid,
            props.route.params.fromdate,
            props.route.params.todate
        );
        setCarLoadingIndicator(false)
        if (response1.code == 0) {
            setCarData(response1.data)
        } else {
            Alert.alert('Alert', 'Unable to get Vechile details')
        }

    }

    const handelAadhardetails = async () => {
        if (aadharnumber.trim().length != 12) {
            showMessage({ kind: 'warning', title: 'Invalid Aadhaar number', message: 'Please enter your 12-digit Aadhaar number.' })
            return
        }
        if (aadharfront == null) {
            showMessage({ kind: 'info', title: 'Aadhaar front photo needed', message: 'Please upload a clear photo of the front of your Aadhaar card.' })
            return
        }
        if (aadharback == null) {
            showMessage({ kind: 'info', title: 'Aadhaar back photo needed', message: 'Please upload a clear photo of the back of your Aadhaar card.' })
            return
        }
        setIndiCator(true)
        const response = await aadharnumberverify(aadharnumber)
        setIndiCator(false)
        if (response.code == 0 && response.message == 'ALREADY_VERIFIED') {
            // This Aadhaar was verified on this account before: the server reused it, no OTP is sent.
            setAadharmodal(false)
            setTimeout(() => {
                setLicencemodal(true)
            }, 1000);
        } else if (response.code == 0) {
            setAadharmodal(false)
            setTimeout(() => {
                setAadharotpmodal(true)
            }, 1000);
        } else {
            showMessage(getFriendlyError(response, 'aadharSend'))
        }
    }

    const handelAadharotp = async () => {
        if (aadharotp.trim().length != 6) {
            showMessage({ kind: 'warning', title: 'Enter the OTP', message: 'Please enter the 6-digit OTP sent to your Aadhaar-linked mobile number.' })
            return
        }
        const object = JSON.parse(JSON.stringify(userDetailsObj))
        object.aadhar_front_image = aadharfront
        object.aadhar_back_image = aadharback
        object.aadharnumber = aadharnumber
        object.otp = aadharotp
        setIndiCator(true)
        const response = await aadharotpverify(object)
        setIndiCator(false)
        if (response.code == 0) {
            setAadharotpmodal(false)
            setOtpModal(false)
            setTimeout(() => {
                setLicencemodal(true)
            }, 1000);
        } else {
            showMessage(getFriendlyError(response, 'aadharOtp'))
            return
        }
    }

    const handelLicencedata = async () => {
        // Indian DL numbers are 15-16 characters (e.g. MH14 20110062821); allow some
        // older state formats, the server verifies the number itself.
        const dlLength = String(licencenumber || '').replace(/[\s-]/g, '').length
        if (dlLength == 0) {
            showMessage({ kind: 'warning', title: 'Enter licence number', message: 'Please enter your driving licence number.' })
            return
        }
        if (dlLength < 10 || dlLength > 20) {
            showMessage({ kind: 'warning', title: 'Invalid licence number', message: 'Please enter your driving licence number exactly as shown on your licence, e.g. MH14 20110062821.' })
            return
        }
        if (licensefront == null) {
            showMessage({ kind: 'info', title: 'Licence front photo needed', message: 'Please upload a clear photo of the front of your driving licence.' })
            return
        }
        if (licenseback == null) {
            showMessage({ kind: 'info', title: 'Licence back photo needed', message: 'Please upload a clear photo of the back of your driving licence.' })
            return
        }
        const object = JSON.parse(JSON.stringify(userDetailsObj))
        object.driving_licence_front = licensefront
        object.driving_licence_back = licenseback
        object.dl_number = licencenumber
        object.dob = moment(date).format('YYYY-MM-DD')
        // FIX 5: Use licenceIndicator so aadhar modal indicator is not affected
        setLicenceIndicator(true)
        const response = await licenceverify(object)
        setLicenceIndicator(false)
        if (response.code == 0) {
            setLicencemodal(false)
            props.navigation.reset({
                index: 0,
                routes: [{
                    name: 'SignupScreen', params: {
                        carid: carData.carid,
                        from_date: carData.from_date,
                        to_date: carData.to_date,
                        latitude: carData.latitude,
                        longitude: carData.longitude
                    },
                }]
            })
        } else {
            showMessage(getFriendlyError(response, 'licence'))
        }
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            {Platform.OS === 'ios' ? (
                <Modal
                    visible={open}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setOpen(false)}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                        }}>
                        <View
                            style={{
                                backgroundColor: '#fff',
                                borderTopLeftRadius: 15,
                                borderTopRightRadius: 15,
                                paddingVertical: 10,
                            }}>
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="spinner"
                                themeVariant="light"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        setDate(selectedDate);
                                        setIsDateSelected(true);
                                    }
                                }}
                            />
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    borderTopWidth: 1,
                                    borderColor: '#ddd',
                                    paddingVertical: 10,
                                }}>
                                <Text
                                    onPress={() => setOpen(false)}
                                    style={{ fontSize: 16, color: 'red' }}>
                                    Cancel
                                </Text>
                                <Text
                                    onPress={() => {
                                        setOpen(false)
                                        setTimeout(() => {
                                            setLicencemodal(true)
                                        }, 500);
                                    }}
                                    style={{ fontSize: 16, color: '#00354a' }}>
                                    Confirm
                                </Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            ) :
                <>
                    {open && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            themeVariant="light"
                            onChange={(event, selectedDate) => {
                                setOpen(false);
                                if (event.type === 'set' && selectedDate) {
                                    setDate(selectedDate);
                                    setIsDateSelected(true);
                                }
                            }}
                        />
                    )}
                </>
            }

            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <View>
                        {cameraModal && (
                            <CameraModalScreen
                                close={() => SetCaremaModal(false)}
                                cameraModal={cameraModal}
                                setImages={(image: Asset) => {
                                    switch (targetType) {
                                        case 'aadharfront':
                                            setAadharfront(image);
                                            SetCaremaModal(false);
                                            setTimeout(() => {
                                                setAadharmodal(true)
                                            }, 500);
                                            break;
                                        case 'aadharback':
                                            setAadharBack(image);
                                            SetCaremaModal(false);
                                            setTimeout(() => {
                                                setAadharmodal(true)
                                            }, 500);
                                            break;
                                        case 'licensefront':
                                            setlicensefront(image);
                                            SetCaremaModal(false);
                                            setTimeout(() => {
                                                setLicencemodal(true)
                                            }, 500);
                                            break;
                                        case 'licenseback':
                                            setlicenseBack(image);
                                            SetCaremaModal(false);
                                            setTimeout(() => {
                                                setLicencemodal(true)
                                            }, 500);
                                            break;
                                    }
                                }}
                            />
                        )}
                    </View>

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
                                            >Please enter  your mobile number
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
                                            >By continuing, you agree to our <Text
                                                style={{
                                                    color: '#00354a',
                                                    fontWeight: '500'
                                                }}> Terms of service
                                                </Text> ,   &
                                                <Text
                                                    style={{
                                                        color: '#00354a',
                                                        fontWeight: '500'
                                                    }}>  Privacy policy</Text>
                                            </Text>
                                            {/* FIX 3: loginIndicator now shows inside the modal while the API is running */}
                                            {loginIndicator && <ActivityIndicator color='#00354a' size="large" />}
                                            <View style={{ marginVertical: hp(2) }}>
                                                <PrimaryButton title='Request OTP'
                                                    // FIX 3: Do NOT close the modal here. handelLogin closes it after success.
                                                    onclick={() => handelLogin()}
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
                                            >We've sent an SMS with an activation
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
                                                }}>I didn't receive a code</Text>
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
                                            {/* otpIndicator is already correct — modal stays open during verify */}
                                            {otpIndicator && <ActivityIndicator color='#00354a' size="large" />}
                                            <View style={{ marginBottom: hp(2), marginTop: hp(2) }}>
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
                        {aadharmodal &&
                            <View>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={aadharmodal}
                                    onRequestClose={() => {
                                        setAadharmodal(!aadharmodal);
                                    }}
                                >
                                    <BottomModelView>
                                        <View style={{
                                            marginHorizontal: wp(5),
                                            marginVertical: hp(2)
                                        }}>
                                            <Pressable
                                                onPress={() => setAadharmodal(false)}
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

                                            }}>User Aadhar number</Text>
                                            <Text
                                                style={{
                                                    fontSize: 17,
                                                    fontWeight: '400',
                                                    color: '#64748B',
                                                    marginTop: hp(1),
                                                    marginBottom: hp(1.5)
                                                }}
                                            >Please enter a your aadhar card number
                                                for verification</Text>
                                            <Textinput
                                                image={require('../assets/users.png')}
                                                placeholder='Enter your aadhar Card number'
                                                keyboardtype='numeric'
                                                value={aadharnumber}
                                                onChangeText={setAadharnumber}
                                                max={12}
                                            />
                                            <View>
                                                <View style={{
                                                    marginHorizontal: wp(4),
                                                    marginVertical: hp(1)
                                                }}>
                                                    <Text style={{
                                                        fontSize: 18,
                                                        fontWeight: 'bold',
                                                        marginVertical: hp(1)
                                                    }}>Aadhar card</Text>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        marginVertical: hp(1)
                                                    }}>
                                                        <View style={{
                                                            width: wp(38)
                                                        }}>
                                                            <Cardview>
                                                                {aadharfront ?
                                                                    <Pressable
                                                                        onPress={() => {
                                                                            setAadharmodal(false)
                                                                            setTargetType('aadharfront');
                                                                            setTimeout(() => {
                                                                                SetCaremaModal(true);
                                                                            }, 500);
                                                                        }}
                                                                        style={{
                                                                            justifyContent: 'center', alignItems: 'center',
                                                                            paddingVertical: hp(2)
                                                                        }}>
                                                                        <Image
                                                                            source={{ uri: aadharfront?.uri }}
                                                                            style={{
                                                                                width: 110,
                                                                                height: 75,
                                                                                resizeMode: 'cover',
                                                                                borderRadius: 10
                                                                            }}
                                                                        />
                                                                    </Pressable>
                                                                    :
                                                                    <CameraView
                                                                        image={require('../assets/Huge.png')}
                                                                        title="Upload Front"
                                                                        onclick={() => {
                                                                            setAadharmodal(false)
                                                                            setTimeout(() => {
                                                                                SetCaremaModal(true);
                                                                            }, 500);
                                                                            setTargetType('aadharfront');
                                                                        }}
                                                                    />}
                                                            </Cardview>
                                                        </View>
                                                        <View style={{
                                                            width: wp(38)
                                                        }}>
                                                            <Cardview>
                                                                {aadharback ?
                                                                    <Pressable
                                                                        onPress={() => {
                                                                            setAadharmodal(false)
                                                                            setTargetType('aadharback');
                                                                            setTimeout(() => {
                                                                                SetCaremaModal(true);
                                                                            }, 500);
                                                                        }}
                                                                        style={{
                                                                            justifyContent: 'center', alignItems: 'center',
                                                                            paddingVertical: hp(2)
                                                                        }}>
                                                                        <Image
                                                                            source={{ uri: aadharback?.uri }}
                                                                            style={{
                                                                                width: 110,
                                                                                height: 75,
                                                                                resizeMode: 'cover',
                                                                                borderRadius: 10
                                                                            }}
                                                                        />
                                                                    </Pressable>
                                                                    :
                                                                    <CameraView
                                                                        image={require('../assets/Huge.png')}
                                                                        title="Upload Back"
                                                                        onclick={() => {
                                                                            setAadharmodal(false)
                                                                            setTargetType('aadharback');
                                                                            setTimeout(() => {
                                                                                SetCaremaModal(true);
                                                                            }, 500);
                                                                        }}

                                                                    />}
                                                            </Cardview>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
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
                                            {indicator && <ActivityIndicator color='#00354a' size="large" />}
                                            <View style={{ marginVertical: hp(2) }}>
                                                <PrimaryButton title='Request OTP'
                                                    onclick={() => {
                                                        handelAadhardetails()
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
                        {licencemodal &&
                            <View>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={licencemodal}
                                    onRequestClose={() => {
                                        setLicencemodal(!licencemodal);
                                    }}
                                >
                                    <BottomModelView>
                                        <View style={{
                                            marginHorizontal: wp(5),
                                            marginVertical: hp(2)
                                        }}>
                                            <Pressable
                                                onPress={() => setLicencemodal(false)}
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

                                            }}>User driving licence number</Text>
                                            <Text
                                                style={{
                                                    fontSize: 17,
                                                    fontWeight: '400',
                                                    color: '#64748B',
                                                    marginTop: hp(1),
                                                    marginBottom: hp(1.5)
                                                }}
                                            >Please enter a your Driving licence number
                                                for verification</Text>
                                            <Textinput
                                                image={require('../assets/users.png')}
                                                placeholder='Enter your driving licence number'
                                                keyboardtype='ascii-capable'
                                                value={licencenumber}
                                                onChangeText={setlicencenumber}
                                                max={20}
                                                autoCapitalize="characters"
                                            />
                                            <Pressable
                                                onPress={() => {
                                                    setLicencemodal(false)
                                                    setTimeout(() => {
                                                        setOpen(true)
                                                    }, 500);

                                                }}
                                                style={input.continer}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image
                                                        source={require('../assets/sms.png')}
                                                        style={input.style} />
                                                    <Text
                                                        style={[input.textinput,
                                                        { color: isDateSelected ? '#000' : '#9CA3AF' }]}>
                                                        {isDateSelected ?
                                                            moment(date).format('YYYY-MM-DD')
                                                            : 'Date of birth'}
                                                    </Text>
                                                </View>
                                            </Pressable>
                                            <Text style={{ color: '#000000', fontWeight: 'bold', fontSize: 16, opacity: 0.7, marginStart: wp(3) }}>Date of Birth ( as per Driving Licence )</Text>
                                            {/* {Platform.OS == 'android' &&
                                                <DatePicker
                                                    modal
                                                    open={open}
                                                    date={date}
                                                    mode="date"
                                                    dividerColor="#00354a"
                                                    onConfirm={(selectedDate) => {
                                                        setOpen(false);
                                                        setDate(selectedDate);
                                                        setIsDateSelected(true);
                                                    }}
                                                    onCancel={() => {
                                                        setOpen(false);
                                                    }}
                                                    theme="light"
                                                />} */}
                                            <Text style={{
                                                fontSize: 18,
                                                fontWeight: 'bold',
                                                marginVertical: hp(1)
                                            }}>Driving License</Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginVertical: hp(1),
                                                marginBottom: hp(2)
                                            }}>
                                                <View style={{ width: wp(38) }}>
                                                    <Cardview>
                                                        {licensefront ?
                                                            <Pressable
                                                                onPress={() => {
                                                                    setLicencemodal(false)
                                                                    setTimeout(() => {
                                                                        SetCaremaModal(true);
                                                                    }, 500);
                                                                    setTargetType('licensefront')
                                                                }}
                                                                style={{
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    paddingVertical: hp(2)
                                                                }}>
                                                                <Image
                                                                    source={{ uri: licensefront?.uri }}
                                                                    style={{
                                                                        width: 110,
                                                                        height: 75,
                                                                        resizeMode: 'cover',
                                                                        borderRadius: 10
                                                                    }}
                                                                />
                                                            </Pressable>
                                                            :
                                                            <CameraView
                                                                image={require('../assets/Huge.png')}
                                                                title="Upload Front"
                                                                onclick={() => {
                                                                    setLicencemodal(false)
                                                                    setTimeout(() => {
                                                                        SetCaremaModal(true);
                                                                    }, 500);
                                                                    setTargetType('licensefront')
                                                                }}
                                                            />}
                                                    </Cardview>
                                                </View>
                                                <View style={{ width: wp(38) }}>
                                                    <Cardview>
                                                        {licenseback ?
                                                            <Pressable onPress={() => {
                                                                setLicencemodal(false)
                                                                setTimeout(() => {
                                                                    SetCaremaModal(true);
                                                                }, 500);
                                                                setTargetType('licenseback')
                                                            }} style={{
                                                                justifyContent: 'center', alignItems: 'center',
                                                                paddingVertical: hp(2)
                                                            }}>
                                                                <Image
                                                                    source={{ uri: licenseback?.uri }}
                                                                    style={{
                                                                        width: 110,
                                                                        height: 75,
                                                                        resizeMode: 'cover',
                                                                        borderRadius: 10
                                                                    }}
                                                                />
                                                            </Pressable>
                                                            :
                                                            <CameraView
                                                                image={require('../assets/Huge.png')}
                                                                title="Upload Back"
                                                                onclick={() => {
                                                                    setLicencemodal(false)
                                                                    setTimeout(() => {
                                                                        SetCaremaModal(true);
                                                                    }, 500);
                                                                    setTargetType('licenseback')
                                                                }}
                                                            />}
                                                    </Cardview>
                                                </View>
                                            </View>
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
                                            {/* FIX 5: licenceIndicator is now separate from aadhar indicator */}
                                            {licenceIndicator && <ActivityIndicator color='#00354a' size="large" />}
                                            <View style={{ marginVertical: hp(2) }}>
                                                <PrimaryButton title='Submit'
                                                    onclick={() => {
                                                        handelLicencedata()
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
                        {aadharotpmodal &&
                            <View>
                                <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={aadharotpmodal}
                                    onRequestClose={() => {
                                        setAadharotpmodal(!aadharotpmodal);
                                    }}>
                                    {/* FIX 6: onclick on BottomModelView now correctly closes aadharotpmodal */}
                                    <BottomModelView onclick={() => setAadharotpmodal(false)}>
                                        <View style={{
                                            marginHorizontal: wp(5),
                                            marginVertical: hp(2)
                                        }}>
                                            <Pressable
                                                onPress={() => {
                                                    // FIX 6: Close button correctly closes aadharotpmodal (not otpModal)
                                                    setAadharotpmodal(false)
                                                    setAadharmodal(true)
                                                    setAadharotp('')
                                                }}
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
                                            >We've sent an SMS with an activation
                                                code to your phone

                                            </Text>
                                            <View style={{
                                                marginVertical: hp(2),
                                                marginBottom: hp(3)
                                            }}>
                                                <OtpInput
                                                    numberOfDigits={6}
                                                    focusColor="#E8ECF4"
                                                    focusStickBlinkingDuration={500}
                                                    onTextChange={(text) => setAadharotp(text)}
                                                    textInputProps={{
                                                        accessibilityLabel: "One-Time Password",
                                                    }}
                                                    theme={{
                                                        pinCodeContainerStyle: style.otpBox,
                                                        pinCodeTextStyle: style.otpText,
                                                        containerStyle: style.otpContainer,
                                                    }}
                                                />

                                            </View>
                                            <Text
                                                style={{
                                                    fontSize: 15,
                                                    lineHeight: hp(2.5),
                                                    color: '#64748B',
                                                    marginVertical: hp(2),
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
                                            {indicator && <ActivityIndicator color='#00354a' size="large" />}
                                            <View style={{ marginBottom: hp(2) }}>
                                                <PrimaryButton
                                                    title='Verify'
                                                    onclick={() => {
                                                        handelAadharotp()
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </BottomModelView>
                                </Modal>
                            </View>
                        }
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    {carImageVisible ?
                        <View style={{ height: hp(100), justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>
                            <CarViewScreen uri={selectedImage} onClose={() => setCarImageVisible(false)} />
                        </View>
                        :
                        <>
                            {/* FIX 4: Show full-screen loader while car data is being fetched */}
                            {carLoadingIndicator ? (
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator color='#00354a' size="large" />
                                </View>
                            ) : (
                                <>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        {carData && <Carousel
                                            autoPlay={false}
                                            ref={ref}
                                            width={wp(94)}
                                            style={{}}
                                            height={hp(23)}
                                            data={carData.gallery}
                                            renderItem={({ item }: { item: any; }) => (
                                                <View style={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center'
                                                }}>
                                                    <Image source={{ uri: item.image }}
                                                        style={{
                                                            height: hp(22),
                                                            width: wp(92),
                                                            borderRadius: 20,
                                                            marginTop: hp(1)
                                                        }} />
                                                </View>
                                            )} />}
                                    </View>
                                    <View style={{
                                        position: 'absolute',
                                        top: hp(3),
                                        marginHorizontal: wp(7),
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: wp(86)
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Pressable onPress={() => props.navigation.goBack()}>
                                                <Image
                                                    source={require('../assets/Back.png')}
                                                    style={BackButtonStyle.style}
                                                    tintColor='#ffffff' />
                                            </Pressable>
                                        </View>
                                        {loggedIn && carData &&
                                            <Pressable
                                                onPress={handelFavourite}
                                                hitSlop={10}
                                                style={{
                                                    backgroundColor: '#ffffff',
                                                    borderRadius: 20,
                                                    width: 38, height: 38,
                                                    justifyContent: 'center', alignItems: 'center',
                                                }}>
                                                {favouriteLoading ?
                                                    <ActivityIndicator size="small" color="#E53935" /> :
                                                    <Text style={{ fontSize: 22, color: favourite ? '#E53935' : '#64748B' }}>
                                                        {favourite ? '♥' : '♡'}
                                                    </Text>}
                                            </Pressable>}
                                    </View>
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{ paddingBottom: hp(3), }}
                                        style={{
                                            flex: 1,
                                            marginHorizontal: wp(5),
                                            paddingVertical: hp(2),
                                        }}>
                                        <Cardview>
                                            <View style={{
                                                paddingVertical: hp(1),
                                                paddingHorizontal: hp(2),
                                            }}>
                                                <Text
                                                    style={{
                                                        fontSize: 17,
                                                        fontWeight: 'bold'
                                                    }}
                                                >{carData && carData.brand_name} {carData && carData.model_name}</Text>
                                                <ReadMore
                                                    numberOfLines={3}
                                                    seeLessText="See Less"
                                                    seeMoreText="See More"
                                                    seeMoreStyle={{ color: "#00354a", fontWeight: "bold" }}
                                                    seeLessStyle={{ color: "#00354a", fontWeight: "bold" }}
                                                    style={{ color: '#00354a' }}>
                                                    {carData && carData.car_description}
                                                </ReadMore>
                                            </View>
                                        </Cardview>
                                        <View style={{ marginVertical: hp(1.3) }}>
                                            <Cardview>
                                                <View style={{
                                                    paddingVertical: hp(1),
                                                    paddingHorizontal: hp(2)
                                                }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 17,
                                                            fontWeight: 'bold'
                                                        }}>Equipment</Text>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        marginVertical: wp(2)
                                                    }}>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            flexWrap: 'wrap'
                                                        }}>
                                                            {carData && carData.features.map((e: any, index: any) => (
                                                                <View key={index} style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    width: wp(40),
                                                                    marginVertical: hp(0.5)
                                                                }}>
                                                                    <Image
                                                                        source={{ uri: e.featureIcon }}
                                                                        style={ImageStyle.style}
                                                                        tintColor='#8A8A8F' />
                                                                    <Text style={[ImageStyle.text, { textTransform: 'uppercase', width: wp(22) }]}>{e.feature}</Text>
                                                                </View>
                                                            ))}

                                                        </View>
                                                    </View>
                                                </View>
                                            </Cardview>
                                        </View>
                                        <View>
                                            <Text style={{
                                                fontSize: 17,
                                                fontWeight: 'bold',
                                                marginBottom: hp(1)
                                            }}>Host Details</Text>
                                            <Cardview>
                                                <View style={{
                                                    paddingVertical: hp(1),
                                                    paddingHorizontal: hp(2),
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Image
                                                        source={require('../assets/user.png')}
                                                        style={{
                                                            height: 60,
                                                            width: 60,
                                                            borderRadius: 30
                                                        }} />
                                                    <View style={{ width: wp(60), marginStart: wp(3) }}>
                                                        <Text style={{
                                                            fontSize: 18,
                                                            fontWeight: 'bold'
                                                        }}>{carData && carData.hosted_by}</Text>
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            alignItems: 'center'
                                                        }}>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Cardview>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 17,
                                                    fontWeight: 'bold',
                                                    marginVertical: hp(1)
                                                }}>Documents required</Text>
                                            <Cardview>
                                                <View style={{
                                                    paddingVertical: hp(2),
                                                    paddingHorizontal: hp(2)
                                                }}>
                                                    <View style={{ marginHorizontal: wp(3) }}>
                                                        <Text style={{
                                                            fontSize: 14,
                                                            fontWeight: '500'
                                                        }}>{carData && carData.user_documents}</Text>
                                                    </View>
                                                </View>
                                            </Cardview>
                                        </View>
                                        <View style={{ marginVertical: hp(1.5) }}>
                                            <Cardview>
                                                <View style={{
                                                    paddingVertical: hp(2),
                                                    paddingHorizontal: hp(2)
                                                }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 17,
                                                            fontWeight: 'bold'
                                                        }}>Images</Text>
                                                    <ScrollView
                                                        horizontal
                                                        showsHorizontalScrollIndicator={false}
                                                        style={{ marginTop: hp(1) }}>
                                                        {carData && carData.gallery.map((e: any, index: any) => (
                                                            <TouchableOpacity onPress={() => { setCarImageVisible(true), setSelectedImage(e.image) }} key={index}>
                                                                <Image
                                                                    source={{ uri: e.image }}
                                                                    style={{
                                                                        height: 75,
                                                                        width: 120,
                                                                        marginRight: wp(2),
                                                                        borderRadius: 15
                                                                    }} />
                                                            </TouchableOpacity>

                                                        ))}
                                                    </ScrollView>
                                                </View>
                                            </Cardview>
                                        </View>

                                        {carData && carData.reviews && carData.reviews.length > 0 && (
                                            <View>
                                                <Cardview>
                                                    <Carousel
                                                        autoPlay={false}
                                                        ref={ref}
                                                        width={wp(87)}
                                                        height={hp(15)}
                                                        data={carData.reviews}
                                                        renderItem={({ item }: { item: any; }) => (
                                                            <View style={{ paddingVertical: hp(1), marginHorizontal: hp(2), width: wp(87) }}>
                                                                <Text style={{
                                                                    fontSize: 17,
                                                                    fontWeight: 'bold',
                                                                    marginBottom: hp(1)
                                                                }}>Reviews</Text>

                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Image
                                                                        source={require('../assets/user.png')}
                                                                        style={{
                                                                            height: 45,
                                                                            width: 45,
                                                                            borderRadius: 22
                                                                        }} />
                                                                    <View style={{ marginHorizontal: wp(3) }}>
                                                                        <Text style={{
                                                                            fontSize: 16,
                                                                            fontWeight: 'bold',
                                                                            width: wp(60),
                                                                        }}>{item.name}</Text>
                                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                            <Rating
                                                                                readonly
                                                                                startingValue={item.rating}
                                                                                imageSize={11}
                                                                                ratingCount={5}
                                                                                fractions={1}
                                                                                style={{ marginLeft: 8 }} />
                                                                            <Text style={{
                                                                                fontSize: 12,
                                                                                fontWeight: '500',
                                                                                color: '#8A8A8F',
                                                                                marginHorizontal: wp(2)
                                                                            }}>
                                                                                {item.time || '15 minutes ago'}
                                                                            </Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                                <Text
                                                                    numberOfLines={1}
                                                                    style={{
                                                                        fontWeight: '500',
                                                                        marginVertical: hp(2),
                                                                    }}>{item.review}</Text>
                                                            </View>
                                                        )} />
                                                </Cardview>
                                            </View>
                                        )}
                                    </ScrollView>
                                </>
                            )}
                        </>
                    }
                    <View style={{
                        marginTop: hp(1),
                        marginBottom: hp(5),
                        marginHorizontal: wp(5)
                    }}>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(1),
                                paddingHorizontal: hp(2),
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'flex-end'
                                }}>
                                    <Text style={{
                                        fontSize: 24,
                                        fontWeight: 'bold'
                                    }}>₹{carData && carData.total_price}</Text>
                                    <Text style={{
                                        color: '#64748B',
                                        top: (-3),
                                        marginHorizontal: wp(2)
                                    }}>/ {carData && carData.total_kms} kms</Text>
                                </View>


                            </View>
                        </Cardview>
                        <View style={{ marginTop: hp(2) }}>
                            {indicator ?
                                <ActivityIndicator color='#00354a' size="large" /> :
                                <PrimaryButton
                                    title='Book Now'
                                    onclick={() => {
                                        handelButtonSubmit()
                                    }} />}
                        </View>

                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
export default VehicleDetailsScreen