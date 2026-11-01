import { ActivityIndicator, Alert, Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import Textinput from "../components/TextInput";
import PrimaryButton from "../components/PrimaryButton";
import { Dropdown } from "react-native-element-dropdown";
import { useCallback, useState } from "react";
import { input } from "../styles/TextInputStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { excuteGetResponse, SignUp } from "../apis/api";
import dayjs from "../utils/date";
import { CenterModalView } from "../components/CenterModelView";
import { useFocusEffect } from "@react-navigation/native";
import { Asset, launchCamera } from "react-native-image-picker";
import { ensureCameraPermission } from "../utils/permissions";
class Componentprops extends Baseprops { }

const SignupScreen: React.FC<Componentprops> = (props) => {
    const [gender, setGender] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [profileImage, setProfileImage] = useState<Asset | null>(null)
    const [userDetailsObj, setUserDetailsObj] = useState<any>({})
    const [successKycModal, setSuccessKycModal] = useState(false)
    const [profilDetails, setProfileDetails] = useState<any>(null)
    const [indicator, setIndiCator] = useState(false)

    const genderData = [
        { label: "MALE", value: "MALE" },
        { label: "FEMALE", value: "FEMALE" },
        { label: "OTHERS", value: "OTHERS" },
    ];
    useFocusEffect(
        useCallback(() => {
            loadUserDetails()
        }, []))

    const handelSignup = async () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (userEmail.trim().length == 0) {
            Alert.alert('Alert', 'Enter your Email')
            return
        } else if (!regex.test(userEmail)) {
            Alert.alert('Alert', 'Invalid email format')
            return
        }
        if (profileImage == null) {
            Alert.alert('Alert', 'Upload your profile pic')
            return
        }

        const object = JSON.parse(JSON.stringify(userDetailsObj))
        object.name = profilDetails.name,
            object.email = userEmail,
            object.gender = profilDetails.gender,
            object.dob = dayjs(date).format('YYYY-MM-DD'),
            object.profile_pic = profileImage
        setIndiCator(true)
        const response = await SignUp(object);
        setIndiCator(false)
        if (response.code == 0) {
            // VehicleDetailsScreen sends either fromDate/toDate/lat/long or
            // from_date/to_date/latitude/longitude; accept both.
            const params = (props.route && props.route.params) || {}
            props.navigation.navigate('CarSummaryScreen',
                {
                    carid: params.carid,
                    fromDate: params.fromDate ?? params.from_date,
                    toDate: params.toDate ?? params.to_date,
                    lat: params.lat ?? params.latitude,
                    long: params.long ?? params.longitude
                })
        } else if (response.message == 'NAME_NOT_MATCH' && response.code == 1) {
            Alert.alert('Alert', 'Enter your name as per aadhar card')
            return
        } else if (response.code == 1 && response.message == 'DOB_NOT_MATCH') {
            Alert.alert('Alert', 'Enter your DOB as per driving licence')
            return
        } else if (response.code == 1 && response.message == 'EMAIL_EXIST') {
            Alert.alert('Alert', 'Email already exist');
            return
        } else {
            Alert.alert('Alert', 'Unable to get details');
            return
        }
    };
    const loadUserDetails = async () => {
        const response = await excuteGetResponse('secure/profile')
        if (response.code == 0) {
            setProfileDetails(response.data)
            handleInputChangeValue('name', response.data && response.data.name)
            handleInputChangeValue('gender', response.data && response.data.gender)
            setDate(response.data.dob)
        } else {
            Alert.alert('Alert', 'Login your account')
        }
    }
    const handleInputChangeValue = (key: string, value: any) => {
        setUserDetailsObj((e: any) => ({ ...e, [key]: value }))
    }

    const cameraPermissions = async () => {
        if (await ensureCameraPermission()) {
            cameraClick()
        }
    }

    const cameraClick = async () => {

        const result: any = await launchCamera({
            mediaType: 'photo',
            quality: 1,
            maxHeight: 600,
            maxWidth: 600
        })
        setProfileImage(result.assets[0])
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>

                {
                    successKycModal &&
                    <View>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={successKycModal}
                            onRequestClose={() => {
                                setSuccessKycModal(!successKycModal);
                            }}>
                            <CenterModalView>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: hp(2)
                                }}>
                                    <Image
                                        source={require('../assets/true.png')}
                                        style={{
                                            height: 180,
                                            width: 200
                                        }}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }}
                                    >Congratulations! 👍</Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '500',
                                            color: '#64748B',
                                            width: wp(70),
                                            textAlign: 'center',
                                            marginVertical: hp(1)
                                        }}
                                    >Your account is ready to use.
                                        You will be redirected to
                                        the Home page in a few seconds.</Text>
                                    <View style={{
                                        width: wp(40),
                                        marginTop: hp(2)
                                    }}>
                                        <PrimaryButton title='Back'
                                            onclick={() => {
                                                props.navigation.navigate('HomeScreen'),
                                                    setSuccessKycModal(false)
                                            }} />
                                    </View>
                                </View>
                            </CenterModalView>
                        </Modal>
                    </View>
                }

                <View style={{ marginHorizontal: wp(7) }}>
                    <Text style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        marginTop: hp(2)
                    }}>
                        Sign up to Ride a car
                    </Text>
                    <Text
                        style={{
                            fontSize: 17,
                            fontWeight: "400",
                            color: "#9CA3AF",
                            width: wp(70),
                            marginVertical: hp(1.5),
                        }}
                    >
                        Ready to hit the road? Signing up to book your ride is quick and
                        easy!
                    </Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Pressable
                        style={{
                            borderWidth: 2,
                            padding: 2,
                            borderColor: '#D9D9D9',
                            borderRadius: wp(12)
                        }}
                        onPress={() => cameraPermissions()}>
                        <Image
                            source={profileImage != null ?
                                { uri: profileImage?.uri }
                                : require('../assets/profile.png')}
                            style={{
                                height: wp(22),
                                width: wp(22),
                                borderRadius: wp(11)
                            }} />
                    </Pressable>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginTop: hp(2)
                    }}>Upload your selfie</Text>
                </View>
                <View style={{
                    marginHorizontal: wp(7),
                    marginTop: hp(2)
                }}>
                    <Textinput
                        image={require("../assets/users.png")}
                        placeholder="Your name in aadhar card"
                        keyboardtype="default"
                        edit={false}
                        value={userDetailsObj.name}
                        onChangeText={(text: any) => handleInputChangeValue('name', text)}
                        max={(40)}
                    />
                    <Textinput
                        image={require("../assets/sms.png")}
                        placeholder="Enter your email"
                        keyboardtype="default"
                        onChangeText={setUserEmail}
                        value={userEmail}
                        max={(50)}
                        edit={true}
                    />
                    <Dropdown
                        style={{
                            height: hp(6),
                            borderColor: "#E5E7EB",
                            borderWidth: 1,
                            borderRadius: 8,
                            paddingHorizontal: 15,
                            marginVertical: hp(1),
                            backgroundColor: "#EEEFF2",
                            flexDirection: "row",
                            alignItems: "center",
                            elevation: 1,
                        }}
                        containerStyle={{
                            borderRadius: 8,
                            backgroundColor: "#EEEFF2",
                        }}
                        placeholderStyle={{
                            fontSize: 16,
                            color: "#9CA3AF",
                        }}
                        selectedTextStyle={{
                            fontSize: 15,
                            color: "#000",
                            fontWeight: '500'
                        }}
                        iconStyle={{
                            width: 24,
                            height: 24,
                        }}
                        data={genderData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Gender"
                        value={userDetailsObj.gender}
                        disable={true}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(item) => {
                            setGender(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <Image
                                source={require("../assets/sms.png")}
                                style={[input.style, { marginRight: wp(4) }]}
                            />
                        )}
                        renderRightIcon={() => (
                            <Image
                                source={require("../assets/mingcute_down-fill.png")}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: isFocus ? "#FBC41D" : "#9CA3AF",
                                }}
                            />
                        )}
                    />
                    <Pressable
                        onPress={() => setOpen(true)}
                        style={input.continer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={require('../assets/sms.png')} style={input.style} />
                            <Text style={[input.textinput, { color: '#000' }]}>
                                {date ? dayjs(date).format('YYYY-MM-DD') : 'Date of birth'}
                            </Text>
                        </View>
                    </Pressable>
                    {/* <DatePicker
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
                    /> */}
                </View>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "flex-end",
                        marginHorizontal: wp(7),
                        marginVertical: hp(3),
                    }}
                >

                    {indicator &&
                        <ActivityIndicator color="#00354a" size="large" style={{ marginBottom: hp(1) }} />
                    }
                    <PrimaryButton
                        title="Submit"
                        onclick={() => {
                            handelSignup()
                        }}
                    />
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Text
                            style={{
                                color: "#9CA3AF",
                                width: wp(70),
                                textAlign: "center",
                                marginTop: hp(1.5),
                                lineHeight: hp(3)
                            }}
                        >
                            By signing up you agree to
                            <Text style={{ color: "#00354a" }}>
                                {" "}
                                Terms of Services & Privacy Policy.
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignupScreen;
