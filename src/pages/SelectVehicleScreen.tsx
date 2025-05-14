import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Baseprops } from "../utils/navigation";
import {
    Alert,
    Image, Modal, Pressable, ScrollView, Text,
    TextInput, View
} from "react-native";
import { BackButtonStyle } from "../styles/BackButtonStyle";
import { wp, hp } from "../utils/ResponsiveScreen";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import React, { useCallback, useState } from "react";
import { BottomModelView } from "../components/BottomModelView";
import FilterButton from "../components/FilterButton";
import PrimaryButton from "../components/PrimaryButton";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { CarsList, excuteGetResponse, Login, LoginCarsList, Otp, removeWishlist, wishlist } from "../apis/api";
import LinearGradient from "react-native-linear-gradient";
import moment from "moment";
import Textinput from "../components/TextInput";
import { OtpInput } from "react-native-otp-entry";
import { style } from "../styles/OtpStyle";
import { useSelector } from "react-redux";
import { getToken, setToken } from "../storage/AsyncStorage";

class Componentprops extends Baseprops { }

const segment = [
    { id: 1, model: 'Hatchback' },
    { id: 2, model: 'Sedan' },
    { id: 3, model: 'SUV' },
    { id: 4, model: 'Muv' }]

const Brand = [
    { id: 1, model: 'Maruti' },
    { id: 2, model: 'Tata' },
    { id: 3, model: 'Hyundai' },
    { id: 4, model: 'Honda' },
    { id: 5, model: 'Mahindra' }]
const FuelType = [
    { id: 1, type: 'Diesel' },
    { id: 1, type: 'Petrol' },
    { id: 1, type: 'Electric' },

]
const TransmissionType = [
    { id: 1, type: 'Automatic' },
    { id: 2, type: 'Manual' }
]
const SeatingCapacity = [
    { id: 1, type: '5 Seats' },
    { id: 2, type: '7 Seats' }
]
const short = [
    { id: 1, type: 'Low to High' },
    { id: 2, type: 'High to Low' }
]
const SelectVehicleScreen: React.FC<Componentprops> = (props) => {
    const ref = React.useRef<ICarouselInstance>(null);
    const [filterModel, setFilterModal] = useState(false);
    const [selectfilter, setSelectfilter] = useState<any>('')
    const [carsList, setCarsList] = useState<any>(null)
    const [mobileNumberModal, setMobileNumberModal] = useState(false)
    const [otpModal, setOtpModal] = useState(false)
    const [otp, setOtp] = useState<any>('')
    const [phoneNumber, setPhoneNumber] = useState<any>('')
    const [search, SetSearch] = useState('')

    useFocusEffect(
        useCallback(() => {
            usergetprofile()
        }, [])
    )
    const usergetprofile = async () => {
        const token = await getToken()
        console.log('myuser', token)

        if (token && token != '') {
            const response = await LoginCarsList(
                props.route.params.pickdate,
                props.route.params.drop,
                props.route.params.addressid,
                props.route.params.lat,
                props.route.params.long)

            console.log('logincarresponse', response)

            if (response.code == 0) {
                setCarsList(response.data)
            } else {
                Alert.alert('Alert', 'Unable to get Login details')
            }
        } else {
            const response = await CarsList(
                props.route.params.pickdate,
                props.route.params.drop,
                props.route.params.addressid,
                props.route.params.lat,
                props.route.params.long)

            console.log('carresponse', response)

            if (response.code == 0) {
                setCarsList(response.data)
            } else {
                Alert.alert('Alert', 'unable to get details of unlogin')
            }
        }
    }

    const handelWishlist = async (carId: any) => {
        const token = await getToken()
        if (token && token != '') {
            const response = await wishlist(carId)
            console.log('fav', response)
            if (response.code == 0) {
                usergetprofile()
            } else {
                Alert.alert('Alert', 'unable to get wishlist details')
            }
        } else {
            setMobileNumberModal(true)
        }
    }
    const removeWishlistbutton = async (carId: any) => {
        const response = await removeWishlist(carId)
        console.log('remove', response)
        if (response.code == 0) {
            usergetprofile()
        } else {
            Alert.alert('Alert', 'unable to get remove wishlist details')
        }

    }
    const handelLogin = async () => {
        if (phoneNumber.trim().length == 0 &&
            phoneNumber.trim().length != 10) {
            Alert.alert('Alert', 'Invalid mobile number')
            return
        }
        const response = await Login(phoneNumber)
        console.log('Login', response)
        if (response.code == 0) {
            setOtpModal(true)
        } else {
            Alert.alert('Alert', 'Unable to get details of Login')
        }
    }

    const handelOTP = async () => {
        if (!otp || otp.length !== 4) {
            Alert.alert('Alert!', 'Enter a valid 4-digit OTP.');
            return;
        }
        const response = await Otp(phoneNumber, otp)
        console.log('otp', response)
        if (response.code == 0) {
            setToken(response.data.token)
            if (response.data.profile_flag == 0) {
                console.log('yes', response.data.profile_flag)
                props.navigation.navigate('SignupScreen')
                setOtpModal(false)
            } else if (response.data.profile_flag == 1) {
                usergetprofile()
            }
        }
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
                                                color: '#FBC41D'
                                            }}> Terms of service
                                        </Text> ,   &
                                        <Text
                                            style={{
                                                color: '#FBC41D'
                                            }}>  Privacy policy</Text>
                                    </Text>
                                    <View style={{ marginVertical: hp(2) }}>
                                        <PrimaryButton title='Request OTP'
                                            onclick={() => {
                                                setMobileNumberModal(false),
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

                                    }}>Enter Otp</Text>
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
                                                color: '#FBC41D',
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
                                        <Text style={{
                                            color: '#FBC41D',
                                            marginHorizontal: wp(2),
                                            fontSize: 16
                                        }}>Resend</Text>
                                    </View>
                                    <View style={{ marginBottom: hp(2) }}>
                                        <PrimaryButton
                                            title='Verify'
                                            onclick={() => {
                                                setOtpModal(false)
                                                handelOTP()
                                            }}
                                        />
                                    </View>
                                </View>
                            </BottomModelView>
                        </Modal>
                    </View>
                }
                {
                    filterModel && <View style={{}}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={filterModel}
                            onRequestClose={() => {
                                setFilterModal(!filterModel);
                            }}>
                            <BottomModelView>
                                <View style={{
                                    marginHorizontal: wp(5),
                                    marginVertical: hp(2)
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 'bold'
                                            }}>Filter</Text>
                                    </View>
                                    <View style={{
                                        borderWidth: 0.5,
                                        borderColor: '#EEEEEE',
                                        backgroundColor: '#EEEEEE',
                                        marginVertical: hp(1.5)
                                    }} />
                                    <ScrollView>
                                        <Text style={{
                                            color: '#64748B',
                                            fontSize: 17,
                                            fontWeight: 'bold'
                                        }}>Sort by</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginVertical: hp(1)
                                        }}>
                                            {
                                                short.map((e: any, index: any) => (
                                                    <FilterButton
                                                        title={e.type}
                                                        onclick={() => setSelectfilter(e.id)} />
                                                ))
                                            }
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontSize: 17,
                                                    fontWeight: 'bold'
                                                }}
                                            >Segment</Text>
                                            <View
                                                style={{
                                                    flexWrap: 'wrap',
                                                    flexDirection: 'row',
                                                }}>
                                                {
                                                    segment.map((e: any, index: any) => (
                                                        <FilterButton
                                                            title={e.model}
                                                            onclick={() => setSelectfilter(e.id)} />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontSize: 17,
                                                    fontWeight: 'bold', marginTop: hp(1)
                                                }}
                                            >Brand</Text>
                                            <View
                                                style={{
                                                    flexWrap: 'wrap',
                                                    flexDirection: 'row',
                                                }}>
                                                {
                                                    Brand.map((e: any, index: any) => (
                                                        <FilterButton
                                                            title={e.model}
                                                            onclick={() => setSelectfilter(e.id)} />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontSize: 17,
                                                    fontWeight: 'bold', marginTop: hp(1)
                                                }}
                                            >Fuel Type</Text>
                                            <View
                                                style={{
                                                    flexWrap: 'wrap',
                                                    flexDirection: 'row',
                                                }}>
                                                {
                                                    FuelType.map((e: any, index: any) => (
                                                        <FilterButton
                                                            title={e.type}
                                                            onclick={() => setSelectfilter(e.id)} />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontSize: 17,
                                                    fontWeight: 'bold', marginTop: hp(1)
                                                }}
                                            >Transmission Type</Text>
                                            <View
                                                style={{
                                                    flexWrap: 'wrap',
                                                    flexDirection: 'row',
                                                }}>
                                                {
                                                    TransmissionType.map((e: any, index: any) => (
                                                        <FilterButton
                                                            title={e.type}
                                                            onclick={() => setSelectfilter(e.id)} />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    color: '#64748B',
                                                    fontSize: 17,
                                                    fontWeight: 'bold', marginTop: hp(1)
                                                }}
                                            >Seating Capacity</Text>
                                            <View
                                                style={{
                                                    flexWrap: 'wrap',
                                                    flexDirection: 'row',
                                                }}>
                                                {
                                                    SeatingCapacity.map((e: any, index: any) => (
                                                        <FilterButton
                                                            title={e.type}
                                                            onclick={() => setSelectfilter(e.id)} />
                                                    ))
                                                }
                                            </View>
                                        </View>
                                        <View style={{ marginTop: hp(2) }}>
                                            <PrimaryButton title='Apply filter' />
                                        </View>
                                    </ScrollView>
                                </View>
                            </BottomModelView>
                        </Modal>

                    </View>
                }
                <View style={{ flex: 1 }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: wp(5),
                        marginVertical: hp(3),
                    }}>
                        <Pressable onPress={() => props.navigation.goBack()}>
                            <Image source={require('../assets/Back.png')}
                                style={BackButtonStyle.style}
                            />
                        </Pressable>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginHorizontal: wp(2)
                        }}>
                            Select vehicle
                        </Text>
                    </View>
                    <View style={{
                        marginHorizontal: wp(5),
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{
                            backgroundColor: '#FFFFFF',
                            borderRadius: 10,
                            padding: hp(2),
                            elevation: 1,
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={{
                                    fontSize: 16,
                                    fontWeight: 'bold'
                                }}> {carsList && moment(carsList.from_date).format('DD MMM YYYY')}</Text>
                                <Text style={{
                                    color: '#13131380',
                                    fontSize: 13,
                                    fontWeight: '500'
                                }}>{carsList && carsList.from_date?.slice(10, 16)}</Text>
                            </View>
                            <Image
                                source={require('../assets/arrow.png')}
                                style={[BottomTabstyles.selectedstyle, {
                                    marginHorizontal: wp(6)
                                }]}
                            />
                            <View style={{ alignItems: 'center' }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>{carsList && moment(carsList.to_date).format('DD MMM YYYY')}</Text>
                                <Text
                                    style={{
                                        color: '#13131380',
                                        fontSize: 13,
                                        fontWeight: '500'
                                    }}>{carsList && carsList.to_date?.slice(10, 16)}</Text>
                            </View>
                        </View>
                        <Pressable>
                            <Image source={require('../assets/edit.png')}
                                style={{ height: 25, width: 25 }}
                            />
                        </Pressable>
                    </View>
                    <View style={{
                        backgroundColor: '#ffffff',
                        flex: 1,
                        marginTop: hp(2),
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            height: hp(6),
                            backgroundColor: '#F7F8F9',
                            elevation: 1, marginHorizontal: wp(5),
                            borderRadius: 10,
                            paddingHorizontal: wp(3),
                            alignItems: 'center',
                            marginVertical: hp(2)
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={require('../assets/search.png')}
                                    style={BottomTabstyles.selectedstyle}
                                />
                                <TextInput
                                    placeholder="Search any car..."
                                    placeholderTextColor='#000000'
                                    onChangeText={SetSearch}
                                    value={search}
                                    style={{
                                        marginHorizontal: wp(2),
                                        width: wp(60)
                                    }}
                                />
                            </View>
                            <Pressable onPress={() => setFilterModal(true)}>
                                <Image source={require('../assets/filter-list.png')}
                                    style={BottomTabstyles.selectedstyle}
                                />
                            </Pressable>
                        </View>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            style={{
                                flex: 1,
                                marginHorizontal: wp(5),
                                marginBottom: hp(2)
                            }}>


                            {carsList && carsList.cars.filter((e1: any) =>
                                search.trim() === '' || e1.brand_name?.toLowerCase().
                                    includes(search.toLowerCase())).
                                map((e: any, index: any) => (
                                    <Pressable
                                        onPress={() =>
                                            props.navigation.navigate('VehicleDetailsScreen',
                                                { fromdate: carsList.from_date, todate: carsList.to_date, id: e.carid })}
                                        key={index}>
                                        <Carousel
                                            ref={ref}
                                            width={wp(90)}
                                            style={{ marginTop: hp(2) }}
                                            height={hp(28)}
                                            data={e.images}
                                            renderItem={({ item }: { item: any }) => (
                                                <View>
                                                    <Image
                                                        source={{ uri: item.image }}
                                                        style={{
                                                            justifyContent: "center",
                                                            height: hp(28),
                                                            width: wp(89),
                                                            alignSelf: 'center',
                                                            borderRadius: 20,

                                                        }} />
                                                </View>
                                            )}
                                        />
                                        <View style={{
                                            position: 'absolute',

                                        }}>
                                            <View style={{
                                                left: wp(75),
                                                top: hp(4)
                                            }}>
                                                <View />
                                                {e.favorite_flag == 1
                                                    ?
                                                    <Pressable
                                                        onPress={() => {
                                                            removeWishlistbutton(e.carid)
                                                            console.log('flag', e.favorite_flag)
                                                        }}
                                                        style={{
                                                            justifyContent: 'center',
                                                            backgroundColor: '#ffffff',
                                                            alignItems: 'center',
                                                            height: hp(4),
                                                            width: hp(4),
                                                            borderRadius: 20,
                                                        }}
                                                    >
                                                        <Image
                                                            source={require('../assets/shop.png')}
                                                            style={BottomTabstyles.nonselectedstyle}
                                                            tintColor='red'
                                                        />
                                                    </Pressable> :
                                                    <Pressable
                                                        onPress={() => {
                                                            handelWishlist(e.carid)
                                                            console.log('flag', e.favorite_flag)
                                                        }}
                                                        style={{
                                                            justifyContent: 'center',
                                                            backgroundColor: '#ffffff',
                                                            alignItems: 'center',
                                                            height: hp(4),
                                                            width: hp(4),
                                                            borderRadius: 20,
                                                        }}
                                                    >
                                                        <Image
                                                            source={require('../assets/shop1.png')}
                                                            style={BottomTabstyles.nonselectedstyle}
                                                        />
                                                    </Pressable>}
                                            </View>
                                            <View style={{

                                                justifyContent: 'flex-end'
                                            }}>
                                                <LinearGradient
                                                    colors={['transparent', '#000000', '#000000']}
                                                    start={{ x: 0, y: 0 }}
                                                    end={{ x: 0, y: 1 }}
                                                    style={{
                                                        top: hp(19.5),
                                                        width: wp(89.5),
                                                        flexDirection: 'row',
                                                        paddingHorizontal: wp(5),
                                                        paddingVertical: 2,
                                                        borderBottomLeftRadius: 20,
                                                        borderBottomRightRadius: 20,
                                                    }}
                                                >
                                                    <View>
                                                        <Text
                                                            style={{
                                                                color: '#FBC41D',
                                                                fontSize: 24,
                                                                fontWeight: 'bold',

                                                            }}

                                                        >
                                                            ₹{e.total_price}
                                                        </Text>
                                                        <Text
                                                            style={{
                                                                color: '#FFFFFF',
                                                                fontSize: 18,
                                                            }}
                                                        >
                                                            ₹{e.price}
                                                        </Text>
                                                    </View>

                                                    <View
                                                        style={{
                                                            borderWidth: 0.2,
                                                            borderColor: '#666666',
                                                            backgroundColor: '#666666',
                                                            marginHorizontal: wp(5),
                                                        }}
                                                    />

                                                    <View
                                                        style={{
                                                            flexDirection: 'row',
                                                            flexWrap: 'wrap',
                                                        }}
                                                    >
                                                        {e.features.map((item: any, index: any) => (
                                                            <View
                                                                key={index}
                                                                style={{
                                                                    marginHorizontal: wp(1),
                                                                    alignItems: 'center',
                                                                }}
                                                            >
                                                                <Image
                                                                    source={{ uri: item.icon }}
                                                                    style={{
                                                                        height: 20,
                                                                        width: 20,
                                                                        tintColor: '#ffffff',
                                                                    }}
                                                                />
                                                                <Text
                                                                    style={{
                                                                        fontSize: 13,
                                                                        fontWeight: '500',
                                                                        color: '#ffffff',
                                                                        top: hp(1.5),
                                                                    }}
                                                                >
                                                                    {item.name}
                                                                </Text>
                                                            </View>
                                                        ))}
                                                    </View>
                                                </LinearGradient>
                                            </View>
                                        </View>
                                        <View style={{ marginHorizontal: wp(2), }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginVertical: hp(1)
                                            }}>
                                                <Text style={{
                                                    fontSize: 17,
                                                    fontWeight: 'bold'
                                                }}>{e.brand_name}  {e.model_name}</Text>
                                                <Image
                                                    source={require('../assets/fastag.png')}
                                                    style={{
                                                        height: hp(2),
                                                        width: wp(15)
                                                    }}
                                                />
                                            </View>
                                            <View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center'
                                                }}>
                                                    <Image
                                                        source={
                                                            require('../assets/Location.png')
                                                        }
                                                        style={{
                                                            height: 20,
                                                            width: 20,
                                                            tintColor: '#000000'
                                                        }} />
                                                    <Text style={{
                                                        marginHorizontal: 1,
                                                        fontWeight: '500'
                                                    }}>{e.distance} away</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginVertical: wp(1)
                                                }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 16,
                                                            fontWeight: '400',
                                                            color: '#666666'
                                                        }}>
                                                        {e.rating}
                                                    </Text>
                                                    <Rating
                                                        readonly
                                                        startingValue={e.rating}
                                                        imageSize={13}
                                                        ratingCount={5}
                                                        fractions={1}
                                                        style={{ marginLeft: 8 }}
                                                    />
                                                    <Text>
                                                        - <Text style={{
                                                            fontSize: 16,
                                                            fontWeight: '400',
                                                            color: '#666666'
                                                        }}>{e.year_of_registeration}
                                                        </Text> - <Text
                                                            style={{
                                                                fontSize: 16,
                                                                fontWeight: '400',
                                                                color: '#666666'
                                                            }}>{e.seating} seats
                                                        </Text>
                                                    </Text>
                                                </View>
                                                <Text style={{ fontWeight: 'bold' }}>
                                                    <Text
                                                        style={{
                                                            color: '#64748B',
                                                        }}>Note </Text>
                                                    : For Documents Aadhar,
                                                    Driving License, Bike</Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                ))}
                        </ScrollView>
                    </View>
                </View>
            </SafeAreaView>
        </GestureHandlerRootView>
    )
}
export default SelectVehicleScreen