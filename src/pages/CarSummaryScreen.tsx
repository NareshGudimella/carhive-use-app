import { Alert, Image, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { Rating } from "react-native-ratings";
import PrimaryButton from "../components/PrimaryButton";
import { useCallback, useEffect, useState } from "react";
import { BottomModelView } from "../components/BottomModelView";
import { Checkbox } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { carBookings, excuteGetResponse, excuteResponse, summery } from "../apis/api";
import { useFocusEffect } from "@react-navigation/native";

class Componentprops extends Baseprops { }

const CarSummaryScreen: React.FC<Componentprops> = (props) => {

    const [termsAndConditions, setTermsAndCondition] = useState(false)
    const [typeofTandC, setTypeTandC] = useState('t&c')
    const [checked, setChecked] = useState(false);
    const [eligiabilityCheck, setEligiabilityCheck] = useState(false)
    const [eligiabilityflag, setEligiabilityflag] = useState('')
    const [eligiabilityModal, setEligiabilityModal] = useState(false)
    const [terms_condition_flag, setTerms_condition_flag] = useState('')
    const [carDetails, setCarDetails] = useState<any>(null)
    const [ModelcancelData, setModelcancelData] = useState<any>(null)
    const [couponModalScreen, setCoupanModalScreen] = useState(false)
    const [cuopon, setCoupons] = useState([])
    const [couponcode, setCouponcode] = useState<any>('')

    useFocusEffect(
        useCallback(() => {
            loadSummeryScreen(props.route.params && props.route.params.carid)
            handelCouponCode()
        }, [])
    )

    useEffect(() => {
        if (couponcode != '')
            loadSummeryScreen(props.route.params && props.route.params.carid, couponcode)
    }, [couponcode])

    const loadSummeryScreen = async (carid: any, offercode?: any) => {
        const response = await summery(carid,
            props.route.params.fromDate,
            props.route.params.toDate,
            props.route.params.lat,
            props.route.params.long,
            offercode
        )
        console.log('Summeryresponse', response)
        if (response.code == 0) {
            setCarDetails(response.data)
        } else if (response.code == 1 && response.message == 'Offer_Expired_or_Not_Started') {
            Alert.alert('Alert', 'Offer Expired')
            setCouponcode('')
        } else if (response.code == 1 && response.message == 'Offer_Not_Applicable_minimum_amount_1233.00') {
            Alert.alert('Alert', 'This offer isn’t applicable for this ride, as your minimum balance needs to be above ₹1200.')
            setCouponcode('')
        } else if (response.code == 1 && response.message == 'Offer_Not_Applicable') {
            Alert.alert('Alert', 'Offer not available')
            setCouponcode('')
        } else {
            Alert.alert('Alert', 'Unable to getdetails')
        }
    }
    const handelModelData = async () => {
        const response = await excuteGetResponse(`secure/cars/policies/${carDetails.carid}`)
        console.log('t&c', response, carDetails.carid)
        if (response.code == 0) {
            setModelcancelData(response.data)
        } else {
            Alert.alert('Alert', 'Unable to get details')
        }
    }
    const handelPaymentDetails = async () => {
        const response = await carBookings(terms_condition_flag, eligiabilityflag,
            carDetails.from_date, carDetails.to_date, carDetails.carid,
            couponcode != '' ? couponcode : '', carDetails.trip_charges, carDetails.taxes,
            carDetails.convenience_fee, carDetails.security_deposite,
            carDetails.protection_fee, carDetails.total_price
        )
        console.log('paymentDetails', response, couponcode)
        if (response.code == 0) {
            const response1 = await excuteGetResponse(`secure/cars/payment/${response.booking_car_id}`)
            console.log('SuccessPayment', response1)
            if (response1.code == 0) {
                props.navigation.navigate('PaymentSuccessScreen', { price: response1.data.total_price })
            }
        } else {
            Alert.alert('Alert', 'unable to get Booking Payment Details')
        }
    }
    const handelCouponCode = async () => {
        const response = await excuteGetResponse(`secure/cars/offers`)
        console.log('cuoponcodes', response)
        if (response.code == 0) {
            setCoupons(response.data)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                couponModalScreen &&
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={couponModalScreen}
                        onRequestClose={() => {
                            setCoupanModalScreen(!couponModalScreen);
                        }}
                    >

                        <BottomModelView onclick={() => setCoupanModalScreen(false)}>
                            <View style={{ margin: wp(5) }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                }}>
                                    <Pressable onPress={() => setCoupanModalScreen(false)}>
                                        <Image source={require('../assets/Back.png')}
                                            style={{
                                                height: 30,
                                                width: 30
                                            }} />
                                    </Pressable>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        marginHorizontal: wp(2.5)
                                    }}>Coupon Code</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#ffffff',
                                    elevation: 2,
                                    borderRadius: 10,
                                    paddingVertical: wp(1.5),
                                    paddingHorizontal: wp(1.5),
                                    marginVertical: hp(2)
                                }}>
                                    <TextInput
                                        style={{
                                            width: wp(62),
                                            marginHorizontal: wp(2),
                                            fontWeight: 'bold'
                                        }}
                                        onChangeText={setCouponcode}
                                        value={couponcode}
                                        placeholder="Enter Coupon code"
                                        placeholderTextColor='#757575' />
                                    <Pressable
                                        onPress={() => {
                                            setCoupanModalScreen(false)
                                        }}
                                        style={{
                                            backgroundColor: '#FBC41D',
                                            paddingVertical: 2,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            paddingHorizontal: wp(6),
                                            borderRadius: 10

                                        }}>
                                        <Text
                                            style={{
                                                color: '#ffffff',
                                                fontSize: 14,
                                                fontWeight: 'bold'
                                            }}>Apply</Text>
                                    </Pressable>
                                </View>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: 'bold'
                                }}>Available</Text>
                                <View>
                                    {cuopon && cuopon.map((e: any, index: any) => (
                                        <View key={index} style={{ marginVertical: hp(1) }}>
                                            <Cardview>
                                                <View style={{
                                                    marginVertical: hp(1.5),
                                                    marginHorizontal: wp(3)
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between'
                                                    }}>
                                                        <Text
                                                            style={{
                                                                fontSize: 16,
                                                                fontWeight: 'bold'
                                                            }}>{e.offercode}</Text>
                                                        <Pressable
                                                            onPress={() => {
                                                                setCouponcode(e.offercode)
                                                            }}
                                                            style={[couponcode == e.offercode ? { backgroundColor: '#009940' } : { backgroundColor: '#FBC41D' }, {
                                                                paddingVertical: 2,
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                paddingHorizontal: wp(6),
                                                                borderRadius: 10,
                                                                height: hp(3.5)

                                                            }]}>
                                                            <Text
                                                                style={{
                                                                    color: '#ffffff',
                                                                    fontSize: 14,
                                                                    fontWeight: 'bold'
                                                                }}>{couponcode == e.offercode ? 'Applied' : 'Apply'}</Text>
                                                        </Pressable>
                                                    </View>
                                                    <View style={{
                                                        borderWidth: 0.5,
                                                        borderColor: '#75757533',
                                                        marginVertical: hp(1),
                                                        borderStyle: 'dashed'
                                                    }} />
                                                    <Text
                                                        style={{
                                                            fontSize: 13,
                                                            fontWeight: '500',
                                                            color: '#64748B',
                                                            width: wp(70),
                                                            marginHorizontal: wp(2)
                                                        }}
                                                    >Use code firstride & get 60% off
                                                        on ride maximum discount you get ₹100</Text>
                                                </View>
                                            </Cardview>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </BottomModelView>
                    </Modal>
                </View>
            }
            {
                termsAndConditions &&
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={termsAndConditions}
                        onRequestClose={() => {
                            setTermsAndCondition(!termsAndConditions);
                        }}
                    >
                        <BottomModelView onclick={() => setTermsAndCondition(false)}>
                            <View>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    top: -30
                                }}>
                                    <Pressable onPress={() => setTermsAndCondition(false)} style={{
                                        position: 'absolute',
                                        backgroundColor: '#ffffff',
                                        padding: hp(1),
                                        borderRadius: 20
                                    }}>
                                        <Image source={require('../assets/close.png')}
                                            style={{
                                                height: 20,
                                                width: 20
                                            }} />
                                    </Pressable>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginHorizontal: wp(5),
                                    paddingVertical: hp(2)
                                }}>
                                    <Pressable
                                        style={typeofTandC == 't&c' ? {
                                            backgroundColor: '#FBC41D',
                                            borderRadius: 10,
                                            width: wp(28),
                                            paddingVertical: hp(1),
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        } : {
                                            width: wp(28),
                                            paddingVertical: hp(1),
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                        onPress={() => setTypeTandC('t&c')}>
                                        <Text
                                            style={typeofTandC == 't&c' ? {
                                                fontSize: 16,
                                                fontWeight: 'bold'
                                            } : {
                                                fontSize: 15,
                                                fontWeight: '500'
                                            }}>T & C</Text>
                                    </Pressable>
                                    <Pressable
                                        style={typeofTandC == 'Cancellation' ? {
                                            backgroundColor: '#FBC41D',
                                            borderRadius: 10,
                                            width: wp(28),
                                            paddingVertical: hp(1),
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        } : {
                                            width: wp(28),
                                            paddingVertical: hp(1),
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                        onPress={() => setTypeTandC('Cancellation')}>
                                        <Text
                                            style={typeofTandC == 'Cancellation' ? {
                                                fontSize: 16,
                                                fontWeight: 'bold'
                                            } : {
                                                fontSize: 15,
                                                fontWeight: '500'
                                            }}>Cancellation</Text>
                                    </Pressable>
                                    <Pressable
                                        style={typeofTandC == 'Modification' ? {
                                            backgroundColor: '#FBC41D',
                                            borderRadius: 10,
                                            width: wp(28),
                                            paddingVertical: hp(1),
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        } : {
                                            width: wp(28),
                                            paddingVertical: hp(1),
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                        onPress={() => setTypeTandC('Modification')}>
                                        <Text
                                            style={typeofTandC == 'Modification' ? {
                                                fontSize: 16,
                                                fontWeight: 'bold'
                                            } : {
                                                fontSize: 15,
                                                fontWeight: '500'
                                            }}>Modification</Text>
                                    </Pressable>
                                </View>
                                <View>
                                    {
                                        typeofTandC == 't&c' ?
                                            <View style={{ marginHorizontal: wp(5) }}>
                                                <Text style={{
                                                    color: '#64748B',
                                                    fontWeight: '500',
                                                    lineHeight: hp(2.5),
                                                    marginHorizontal: wp(3),
                                                    marginVertical: hp(1)
                                                }}>
                                                    {ModelcancelData && ModelcancelData.terms_conditions}
                                                </Text>
                                            </View> :
                                            typeofTandC == 'Cancellation' ?
                                                <View style={{ marginHorizontal: wp(5) }}>
                                                    <Text style={{
                                                        color: '#64748B',
                                                        fontWeight: '500',
                                                        lineHeight: hp(2.5),
                                                        marginHorizontal: wp(3),
                                                        marginVertical: hp(1)
                                                    }}>
                                                        {ModelcancelData && ModelcancelData.cancellation}
                                                    </Text>
                                                </View> :
                                                typeofTandC == 'Modification' ?
                                                    <View style={{ marginHorizontal: wp(5) }}>
                                                        <Text style={{
                                                            color: '#64748B',
                                                            fontWeight: '500',
                                                            lineHeight: hp(2.5),
                                                            marginHorizontal: wp(3),
                                                            marginVertical: hp(1)
                                                        }}>
                                                            {ModelcancelData && ModelcancelData.modification}
                                                        </Text>
                                                    </View> : <></>
                                    }
                                </View>
                                <View style={{ marginHorizontal: wp(5) }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginHorizontal: wp(1)
                                    }}>
                                        <Checkbox
                                            status={checked ? 'checked' : 'unchecked'}
                                            color="#FBC41D"
                                            onPress={() => {
                                                const value = !checked;
                                                setChecked(value);

                                                if (value) {
                                                    setTerms_condition_flag('1');
                                                    console.log('t&c flag', 1);
                                                } else {
                                                    setTerms_condition_flag('0');
                                                    console.log('t&c flag', 0);
                                                }
                                            }}
                                        />
                                        <Text style={{
                                            fontSize: 15,
                                            fontWeight: 'bold'
                                        }}>
                                            I agree to the Terms & Conditions.
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginVertical: hp(3),
                                            marginTop: hp(2)
                                        }}>
                                        <PrimaryButton
                                            title='Proceed'
                                            onclick={() => {
                                                setEligiabilityModal(true),
                                                    setTermsAndCondition(false)
                                            }} />
                                    </View>
                                </View>
                            </View>
                        </BottomModelView>
                    </Modal>
                </View>
            }
            {
                eligiabilityModal &&
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={eligiabilityModal}
                    >
                        <BottomModelView onclick={() => setEligiabilityModal(false)}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                top: -30
                            }}>
                                <Pressable onPress={() => setEligiabilityModal(false)} style={{
                                    position: 'absolute',
                                    backgroundColor: '#ffffff',
                                    padding: hp(1),
                                    borderRadius: 20
                                }}>
                                    <Image source={require('../assets/close.png')}
                                        style={{
                                            height: 20,
                                            width: 20
                                        }} />
                                </Pressable>
                            </View>
                            <View style={{
                                marginHorizontal: wp(5),
                                marginVertical: hp(2)
                            }}>

                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        marginVertical: hp(1)
                                    }}
                                >Important points for your booking
                                </Text>
                                <Text
                                    style={{
                                        color: '#64748B',
                                        fontWeight: '400',
                                        marginVertical: hp(1)
                                    }}
                                >To Take Delivery of the car ,
                                    you will need to present in
                                    person and show these documents
                                    to our delivery executive :</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: hp(1)
                                }}>
                                    <Image
                                        source={require('../assets/personalcard.png')}
                                        style={{
                                            height: 32,
                                            width: 40
                                        }} />
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>
                                            Driving License
                                        </Text>
                                        <Text style={{
                                            color: '#64748B',
                                            fontWeight: '400',
                                            width: wp(60)
                                        }}>Digilocker or original -issued
                                            at least 6 months ago</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: hp(1)
                                }}>
                                    <Image
                                        source={require('../assets/personalcard1.png')}
                                        style={{
                                            height: 32,
                                            width: 40
                                        }} />
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>
                                            Aadhar/Passport
                                        </Text>
                                        <Text style={{
                                            color: '#64748B',
                                            fontWeight: '400',
                                            width: wp(60)
                                        }}>Digilocker or original or copy</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: hp(1)
                                }}>
                                    <Image
                                        source={require('../assets/personalcard2.png')}
                                        style={{
                                            height: 32,
                                            width: 40
                                        }} />
                                    <View style={{ marginHorizontal: wp(3) }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>
                                            21+ Years of age
                                        </Text>
                                        <Text style={{
                                            color: '#64748B',
                                            fontWeight: '400',
                                            width: wp(60)
                                        }}>As per driving license</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginHorizontal: wp(1)
                                }}>
                                    <Checkbox
                                        status={eligiabilityCheck ? 'checked' : 'unchecked'}
                                        color="#FBC41D"
                                        onPress={() => {
                                            const newValue = !eligiabilityCheck;
                                            setEligiabilityCheck(newValue);

                                            if (newValue) {
                                                setEligiabilityflag('1');
                                                console.log('eligiableflag', eligiabilityflag)
                                            } else {
                                                setEligiabilityflag('0');
                                                console.log('eligiableflag', eligiabilityflag)
                                            }
                                        }}
                                    />
                                    <Text style={{
                                        fontSize: 13,
                                        fontWeight: '500',
                                        width: wp(70),
                                        top: 5,
                                        marginHorizontal: wp(2)
                                    }}>
                                        I acknowledge that in the absence of
                                        the documents at the time of delivery,
                                        the car will not be handed over and
                                        cancellation charge (up to Rs 5,000)
                                        will apply
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginVertical: hp(2),
                                        marginTop: hp(4)
                                    }}>
                                    <PrimaryButton
                                        title='Proceed'
                                        onclick={() => {
                                            setEligiabilityModal(false)
                                            handelPaymentDetails()
                                        }} />
                                </View>
                                <View style={{
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text
                                        style={{
                                            color: "#9CA3AF",
                                            width: wp(70),
                                            textAlign: "center",
                                            lineHeight: hp(2.5)
                                        }}
                                    >
                                        By signing up you agree to
                                        <Text style={{ color: "#FBC41D" }}>
                                            {" "}
                                            Terms of Services & Privacy Policy.
                                        </Text>
                                    </Text>
                                </View>
                            </View>
                        </BottomModelView>
                    </Modal>
                </View>
            }
            <View style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: '#ffffff',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: wp(5),
                        marginVertical: hp(3),
                        marginTop: hp(4)
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
                        }}>Summary</Text>
                    </View>
                    <View>
                        {carDetails && <Image
                            source={{ uri: carDetails.gallery[0].image }}
                            style={{
                                height: hp(20),
                                width: wp(90),
                                borderRadius: 15,
                                marginHorizontal: wp(5)
                            }}
                        />}
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginVertical: hp(1),
                            textAlign: 'center',
                            marginBottom: hp(2)
                        }}>{carDetails && carDetails.brand_name} {carDetails && carDetails.model_name}</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: wp(5) }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginVertical: hp(1.5)
                    }}>Trip Date & Time</Text>
                    <Cardview>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginHorizontal: wp(10),
                            marginVertical: hp(2)
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>{carDetails && carDetails.from_date?.slice(0, 10)}</Text>
                                <Text style={{
                                    color: '#27272780',
                                    fontWeight: '500',
                                    marginTop: 2,
                                    fontSize: 13
                                }}>{carDetails && carDetails.from_date?.slice(10, 16)}</Text>
                            </View>
                            <Image
                                source={require('../assets/arrow.png')}
                                style={{ height: 30, width: 20 }}
                            />
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontSize: 15,
                                    fontWeight: 'bold'
                                }}>{carDetails && carDetails.to_date?.slice(0, 10)}</Text>
                                <Text style={{
                                    color: '#27272780',
                                    fontWeight: '500',
                                    marginTop: 2,
                                    fontSize: 13
                                }}>{carDetails && carDetails.to_date?.slice(10, 16)}</Text>
                            </View>
                        </View>
                    </Cardview>
                    {carDetails && carDetails.reviews.length > 0 &&
                        <View>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                marginVertical: hp(1.5)
                            }}>Host Details</Text>
                            <Cardview>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: wp(4),
                                    marginVertical: hp(1)
                                }}>
                                    <Image
                                        source={require('../assets/user.png')}
                                        style={{
                                            height: 50,
                                            width: 50
                                        }}
                                    />
                                    <View style={{ marginHorizontal: wp(4) }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold'
                                        }}>{carDetails && carDetails.reviews.length > 0 && carDetails.reviews[0].name}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Text>{carDetails && carDetails.reviews.length > 0 && carDetails.reviews[0].rating}</Text>
                                            <Rating
                                                readonly
                                                startingValue={carDetails && carDetails.reviews.length > 0 && carDetails.reviews[0].rating}
                                                imageSize={10}
                                                ratingCount={5}
                                                fractions={1}
                                                style={{ marginLeft: 8 }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </Cardview>
                        </View>}
                    <View style={{ marginVertical: hp(2) }}>
                        <Cardview >
                            <Pressable
                                onPress={() => setCoupanModalScreen(true)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginHorizontal: wp(4),
                                    marginVertical: hp(1)
                                }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        source={require('../assets/offer.png')}
                                        style={{
                                            height: 40,
                                            width: 40
                                        }} />
                                    {
                                        couponcode != 0 ?
                                            <Text style={{
                                                color: '#64748B',
                                                marginHorizontal: wp(3)
                                            }}>{couponcode}</Text>
                                            : <Text style={{
                                                color: '#64748B',
                                                marginHorizontal: wp(3)
                                            }}>Apply Coupon Code</Text>}
                                </View>
                                <Image source={require('../assets/arrow-left.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: '#FBC41D'
                                    }} />
                            </Pressable>
                        </Cardview>
                    </View>

                    <View style={{ marginBottom: hp(3) }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: hp(1)
                        }}>Bill Details</Text>
                        <Cardview>
                            <View style={{
                                marginHorizontal: wp(5),
                                marginVertical: hp(2)
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{
                                            color: '#64748B',
                                            textDecorationLine: 'underline'
                                        }}>Trip Charges</Text>
                                        <Image
                                            source={require('../assets/info.png')}
                                            style={{
                                                height: 10,
                                                width: 10,
                                                marginTop: 3,
                                                marginHorizontal: 3
                                            }}
                                        />
                                    </View>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 15
                                    }}>₹ {carDetails && carDetails.trip_charges}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(1)
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{
                                            color: '#64748B',
                                            textDecorationLine: 'underline'
                                        }}>Taxes</Text>
                                        <Image
                                            source={require('../assets/info.png')}
                                            style={{
                                                height: 10,
                                                width: 10,
                                                marginTop: 3,
                                                marginHorizontal: 3
                                            }}
                                        />
                                    </View>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 15
                                    }}>₹ {carDetails && carDetails.taxes}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(1)
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{
                                            color: '#64748B',
                                            textDecorationLine: 'underline'
                                        }}>Convenience Fees</Text>
                                        <Image
                                            source={require('../assets/info.png')}
                                            style={{
                                                height: 10,
                                                width: 10,
                                                marginTop: 3,
                                                marginHorizontal: 3
                                            }}
                                        />
                                    </View>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 15
                                    }}>₹ {carDetails && carDetails.convenience_fee}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{
                                            color: '#64748B',
                                            textDecorationLine: 'underline'
                                        }}>Security Deposit </Text>
                                        <Text style={{
                                            color: '#64748B66'
                                        }}>(Refundable)</Text>
                                    </View>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 15
                                    }}>₹ {carDetails && carDetails.security_deposite}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(1)
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{
                                            color: '#64748B',
                                            textDecorationLine: 'underline'
                                        }}>Trip Protection Fee</Text>
                                        <Image
                                            source={require('../assets/info.png')}
                                            style={{
                                                height: 10,
                                                width: 10,
                                                marginTop: 3,
                                                marginHorizontal: 3
                                            }}
                                        />
                                    </View>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 15
                                    }}>₹ {carDetails && carDetails.protection_fee}</Text>
                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{
                                            color: '#64748B',
                                            textDecorationLine: 'underline'
                                        }}>Coupon</Text>
                                        <Text style={{
                                            color: '#0D9D32'
                                        }}>({carDetails && carDetails.Offercode})</Text>
                                    </View>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: '#FF0000'
                                    }}>-₹ {carDetails && carDetails.coupon}</Text>
                                </View>
                                <View style={{
                                    borderWidth: 0.4,
                                    borderStyle: 'dashed',
                                    marginVertical: hp(1.5)
                                }} />
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        color: '#64748B'
                                    }}>To Pay</Text>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 'bold'
                                    }}>₹ {carDetails && carDetails.total_price}</Text>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                </ScrollView>
            </View>
            <View
                style={{
                    backgroundColor: '#27272708',
                    marginVertical: hp(1.2),
                    marginHorizontal: wp(5)
                }}
            >
                <PrimaryButton
                    title={`Pay  ₹${carDetails && carDetails.total_price}`}
                    onclick={() => {
                        handelModelData()
                        setTermsAndCondition(true)
                    }} />
            </View>
        </SafeAreaView>
    )
}
export default CarSummaryScreen