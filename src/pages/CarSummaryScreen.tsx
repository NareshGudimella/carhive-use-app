import { Alert, Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { Rating } from "react-native-ratings";
import PrimaryButton from "../components/PrimaryButton";
import { useCallback, useState } from "react";
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
    useFocusEffect(
        useCallback(() => {
            console.log('id', (props.route.params && props.route.params.carid))
            handelSummeryScreen(props.route.params && props.route.params.carid)
        }, [])
    )

    const handelSummeryScreen = async (carid: any) => {
        const response = await summery(carid,
            props.route.params.fromDate,
            props.route.params.toDate,
            props.route.params.lat,
            props.route.params.long
        )
        console.log('Summeryresponse', response)
        if (response.code == 0) {
            setCarDetails(response.data)
        } else {
            Alert.alert('Alert', 'Unable to get details')
        }
    }
    const handelModelData = async () => {
        const response = await excuteGetResponse(`secure/cars/policies/${carDetails.carid}`)
        console.log('t&c', response)
        if (response.code == 0) {
            setModelcancelData(response.data)
        } else {
            Alert.alert('Alert', 'Unable to get details')
        }
    }
    const handelPaymentDetails = async () => {
        const response = await carBookings(terms_condition_flag, eligiabilityflag,
            carDetails.from_date, carDetails.to_date, carDetails.carid,
            carDetails.coupon, carDetails.trip_charges, carDetails.taxes,
            carDetails.convenience_fee, carDetails.security_deposite,
            carDetails.protection_fee, carDetails.total_price
        )
        console.log('paymentDetails', response)
        if (response.code == 0) {
            const response1 = await excuteGetResponse(`secure/cars/payment/${response.booking_car_id}`)
            console.log('SuccessPayment', response1)
            if (response1.code == 0) {
                props.navigation.navigate('PaymentSuccessScreen')
            }
        } else {
            Alert.alert('Alert', 'unable to get Booking Payment Details')
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                                }}>{carDetails && carDetails.reviews[0].name}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Text>{carDetails && carDetails.reviews[0].rating}</Text>
                                    <Rating
                                        readonly
                                        startingValue={carDetails && carDetails.reviews[0].rating}
                                        imageSize={10}
                                        ratingCount={5}
                                        fractions={1}
                                        style={{ marginLeft: 8 }}
                                    />
                                </View>
                            </View>
                        </View>
                    </Cardview>
                    <View style={{ marginVertical: hp(2) }}>
                        <Cardview>
                            <View style={{
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
                                    <Text style={{
                                        color: '#64748B',
                                        marginHorizontal: wp(3)
                                    }}>Apply Coupon Code</Text>
                                </View>
                                <Image source={require('../assets/arrow-left.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: '#FBC41D'
                                    }} />
                            </View>
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
                                        }}>(ABCD1234)</Text>
                                    </View>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: '#FF0000'
                                    }}>-₹ 100</Text>
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