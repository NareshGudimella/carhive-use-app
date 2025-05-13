import { Alert, Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { BackButtonStyle } from "../styles/BackButtonStyle";
import { BottomTabstyles } from "../styles/BottomTabstyles";
import { Cardview } from "../components/Cardview";
import React, { useCallback, useEffect, useState } from "react";
import { ImageStyle } from "../styles/ImageStyle";
import { Rating } from 'react-native-ratings';
import PrimaryButton from "../components/PrimaryButton";
import { BottomModelView } from "../components/BottomModelView";
import Textinput from "../components/TextInput";
import { OtpInput } from "react-native-otp-entry";
import { style } from "../styles/OtpStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { carDetails, excuteGetResponse, excuteResponse, Login, Otp, removeWishlist, wishlist } from "../apis/api";
import { getToken, setToken } from "../storage/AsyncStorage";
import { useFocusEffect } from "@react-navigation/native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { useDispatch } from "react-redux";
import { updateProfile } from "../storage/redux";

class Componentprops extends Baseprops { }

const VehicleDetailsScreen: React.FC<Componentprops> = (props) => {
    const [textExpanded, setTextExpanded] = useState(false);
    const [mobileNumberModal, setMobileNumberModal] = useState(false)
    const [otpModal, setOtpModal] = useState(false)
    const [otp, setOtp] = useState<any>('')
    const [phoneNumber, setPhoneNumber] = useState<any>('')
    const [carData, setCarData] = useState<any>(null)
    const ref = React.useRef<ICarouselInstance>(null);
    useFocusEffect(
        useCallback(() => {
            if (props.route.params && props.route.params?.id) {
                handelVicheDetails(props.route.params?.id)
            }
        }, [])
    )
    const handelButtonSubmit = async () => {
        const token = await getToken()
        console.log('token', token)
        if (token && token != '') {
            const response = await excuteGetResponse('secure/profile')
            console.log('usertoken', response)
            if (response.data.profile_flag == 0) {
                props.navigation.navigate('SignupScreen')
            } else if (response.data.documents.aadhar_back == null ||
                response.data.documents.aadhar_front == null ||
                response.data.documents.license_back == null ||
                response.data.documents.license_front == null
            ) {
                props.navigation.navigate('KycDetailsScreen')
            } else {
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
            setMobileNumberModal(true)
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
            console.log('token', response.data.token)
            if (response.data.profile_flag == 0) {
                console.log('yes', response.data.profile_flag)
                props.navigation.navigate('SignupScreen')
                setOtpModal(false)
            } else if (response.data.profile_flag == 1) {
                console.log('no', response.data.profile_flag)
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
            Alert.alert('Alert', 'Unable to get OTP')
        }
    }
    const handelVicheDetails = async (carid: any) => {
        const response = await carDetails(carid,
            props.route.params.fromdate,
            props.route.params.todate
        );
        console.log('CarDetails', response)
        if (response.code == 0) {
            setCarData(response.data)
            console.log('hello', carData)
        } else {
            Alert.alert('Alert', 'Unable to get Vechile details')
        }
    }
    const handelWishlist = async (carId: any) => {
        const response = await wishlist(carId)
        console.log('fav', response)
        if (response.code == 0) {
            handelVicheDetails(props.route.params?.id)
        } else {
            Alert.alert('Alert', 'unable to get wishlist details')
        }
    }
    const removeWishlistbutton = async (carId: any) => {
        const response = await removeWishlist(carId)
        console.log('remove', response)
        if (response.code == 0) {
            handelVicheDetails(props.route.params?.id)
        } else {
            Alert.alert('Alert', 'unable to get remove wishlist details')
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
                                            }}>  +91 9704611443</Text>
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
                                                handelOtp()
                                                setOtpModal(false)
                                            }}
                                        />
                                    </View>
                                </View>
                            </BottomModelView>
                        </Modal>
                    </View>
                }
            </View>
            <View style={{ flex: 1 }}>
                <View>
                    {carData && <Carousel
                        autoPlay={false}
                        ref={ref}
                        width={wp(100)}
                        style={{}}
                        height={hp(25)}
                        data={carData.gallery}
                        renderItem={({ item }: { item: any }) => (
                            <View>
                                <Image source={{ uri: item.image }}
                                    style={{
                                        height: hp(25), width: wp(100),
                                        borderBottomLeftRadius: 20,
                                        borderBottomRightRadius: 20
                                    }} />
                            </View>
                        )}
                    />}
                </View>
                <View style={{
                    position: 'absolute',
                    top: hp(3),
                    marginHorizontal: wp(5),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: wp(90)
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Pressable onPress={() => props.navigation.goBack()}>
                            <Image
                                source={require('../assets/Back.png')}
                                style={BackButtonStyle.style}
                                tintColor='#ffffff'
                            />
                        </Pressable>
                        <Text
                            style={{
                                color: '#ffffff',
                                marginHorizontal: wp(2),
                                fontWeight: 'bold'
                            }}
                        >Vehicle details</Text>
                    </View>
                    {/* <View>
                        {carData.favorite_flag == 1
                            ?
                            <Pressable
                                onPress={() => {
                                    removeWishlistbutton(carData.carid)
                                    console.log('flag', carData.favorite_flag)
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
                                    handelWishlist(carData.carid)
                                    console.log('flag', carData.favorite_flag)
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
                    </View> */}
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,
                        marginHorizontal: wp(5),
                        paddingVertical: hp(2)
                    }}>
                    <Cardview>
                        <View style={{
                            paddingVertical: hp(1),
                            paddingHorizontal: hp(2)
                        }}>
                            <Text
                                style={{
                                    fontSize: 17,
                                    fontWeight: 'bold'
                                }}
                            >{carData && carData.brand_name} {carData && carData.model_name}</Text>
                            <Text
                                style={{
                                    fontSize: 13,
                                    marginVertical: wp(1.5),
                                    color: '#64748B'
                                }}>
                                {textExpanded ? (
                                    <>
                                        {carData && carData.car_description}{' '}
                                        <Text
                                            onPress={() => setTextExpanded(false)}
                                            style={{ color: '#FBC41D' }}
                                        >
                                            Show less &lt;&lt;
                                        </Text>
                                    </>
                                ) : (
                                    <>
                                        {carData && carData.car_description}
                                        {' '}
                                        <Text
                                            onPress={() => setTextExpanded(true)}
                                            style={{ color: '#FBC41D' }}
                                        >
                                            See all &gt;&gt;
                                        </Text>
                                    </>
                                )}
                            </Text>
                        </View>
                    </Cardview>
                    <View style={{ marginVertical: hp(2) }}>
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
                                                    tintColor='#8A8A8F'
                                                />
                                                <Text style={
                                                    ImageStyle.text
                                                }>{e.feature}</Text>
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
                                <View style={{ marginHorizontal: wp(5) }}>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold'
                                    }}>{carData && carData.hosted_by}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: '400'
                                        }}>{carData && carData.rating}</Text>
                                        <Rating
                                            readonly
                                            startingValue={carData && carData.rating}
                                            imageSize={13}
                                            ratingCount={5}
                                            fractions={1}
                                            style={{ marginLeft: 8 }}
                                        />
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
                                marginVertical: hp(1.5)
                            }}>Documents required</Text>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(2),
                                paddingHorizontal: hp(2)
                            }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={require('../assets/license.png')}
                                        style={{ height: 40, width: 40 }} />
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Driving License</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#64748B',
                                            fontWeight: '400', width: wp(60)
                                        }}>Digilocker or
                                            original -issued at
                                            least 6 months ago</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: wp(3.5)
                                }}>
                                    <Image
                                        source={require('../assets/id-card.png')}
                                        style={{ height: 40, width: 40 }} />
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>Aadhar/Passport</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#64748B',
                                            fontWeight: '400',
                                            width: wp(60)
                                        }}>Digilocker or
                                            original or copy</Text>
                                    </View>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                    <View style={{ marginVertical: hp(2) }}>
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
                                        <Image key={index}
                                            source={{ uri: e.image }}
                                            style={{
                                                height: 75,
                                                width: 120,
                                                marginRight: wp(2),
                                                borderRadius: 15
                                            }} />
                                    ))}
                                </ScrollView>
                            </View>
                        </Cardview>
                    </View>
                    <View>
                        <Cardview>
                            <View style={{
                                paddingVertical: hp(1),
                                paddingHorizontal: hp(2)
                            }}>
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    marginBottom: hp(1)
                                }}>Reviews</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                }}>
                                    <Image
                                        source={require('../assets/user.png')}
                                        style={{
                                            height: 45,
                                            width: 45,
                                            borderRadius: 22
                                        }}
                                    />
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }}>{carData && carData.reviews[0].name}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Rating
                                                readonly
                                                startingValue={carData && carData.reviews[0].rating}
                                                imageSize={11}
                                                ratingCount={5}
                                                fractions={1}
                                                style={{ marginLeft: 8 }}
                                            />
                                            <Text style={{
                                                fontSize: 12,
                                                fontWeight: '500',
                                                color: '#8A8A8F', marginHorizontal: wp(2)
                                            }}>15 minutes ago</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={{
                                    fontWeight: '500',
                                    marginVertical: hp(2)
                                }}>{carData && carData.reviews[0].review}</Text>
                            </View>
                        </Cardview>
                    </View>
                    <View style={{
                        marginTop: hp(5),
                        marginBottom: hp(4)
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
                                    }}>₹{carData && carData.price_per_hour} /Day</Text>
                                </View>
                                <PrimaryButton
                                    title='Book Now'
                                    onclick={() => handelButtonSubmit()} />
                            </View>
                        </Cardview>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default VehicleDetailsScreen