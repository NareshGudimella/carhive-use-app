import { Image, Modal, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { Rating } from "react-native-ratings";
import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";
import { BottomModelView } from "../components/BottomModelView";
import { Checkbox } from "react-native-paper";

class Componentprops extends Baseprops { }

const CarSummaryScreen: React.FC<Componentprops> = (props) => {

    const [termsAndConditions, setTermsAndCondition] = useState(false)
    const [typeofTandC, setTypeTandC] = useState('t&c')
    const [checked, setChecked] = useState(false);
    const [eligiabilityModal, setEligiabilityModal] = useState(false)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                termsAndConditions &&
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={termsAndConditions}
                    >
                        <BottomModelView>
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
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit,
                                                sed do eiusmod tempor incididunt
                                                ut labore et dolore magna aliqua.
                                                Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex
                                                ea commodo consequat. Duis
                                                aute irure dolor in
                                                reprehenderit in voluptate
                                                velit esse cillum dolore eu
                                                fugiat nulla pariatur. Excepteur
                                                sint occaecat cupidatat non
                                                proident, sunt in culpa qui
                                                officia deserunt mollit
                                                anim id est laborum."
                                            </Text>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                marginHorizontal: wp(1)
                                            }}>
                                                <Checkbox
                                                    status={checked ? 'checked' : 'unchecked'}
                                                    color="#FBC41D"
                                                    onPress={() => {
                                                        setChecked(!checked);
                                                    }}
                                                />
                                                <Text style={{
                                                    fontSize: 15,
                                                    fontWeight: 'bold'
                                                }}>
                                                    I agree to the Terms & Conditions.
                                                </Text>
                                            </View>
                                            <View style={{
                                                marginVertical: hp(2),
                                                marginTop: hp(4)
                                            }}>
                                                <PrimaryButton
                                                    title='Proceed'
                                                    onclick={() => {
                                                        setEligiabilityModal(true),
                                                            setTermsAndCondition(false)
                                                    }} />
                                            </View>
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
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit,
                                                    sed do eiusmod tempor incididunt
                                                    ut labore et dolore magna aliqua.
                                                    Ut enim ad minim veniam, quis
                                                    nostrud exercitation ullamco
                                                    laboris nisi ut aliquip ex
                                                    ea commodo consequat. Duis
                                                    aute irure dolor in
                                                    reprehenderit in voluptate
                                                    velit esse cillum dolore eu
                                                    fugiat nulla pariatur. Excepteur
                                                    sint occaecat cupidatat non
                                                    proident, sunt in culpa qui
                                                    officia deserunt mollit
                                                    anim id est laborum."
                                                </Text>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginHorizontal: wp(1)
                                                }}>
                                                    <Checkbox
                                                        status={checked ? 'checked' : 'unchecked'}
                                                        color="#FBC41D"
                                                        onPress={() => {
                                                            setChecked(!checked);
                                                        }}
                                                    />
                                                    <Text style={{
                                                        fontSize: 15,
                                                        fontWeight: 'bold'
                                                    }}>
                                                        I agree to the Terms & Conditions.
                                                    </Text>
                                                </View>
                                                <View style={{
                                                    marginVertical: hp(2),
                                                    marginTop: hp(4)
                                                }}>
                                                    <PrimaryButton
                                                        title='Proceed'
                                                        onclick={() => {
                                                            setEligiabilityModal(true),
                                                                setTermsAndCondition(false)
                                                        }} />
                                                </View>
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
                                                        Lorem ipsum dolor sit amet,
                                                        consectetur adipiscing elit,
                                                        sed do eiusmod tempor incididunt
                                                        ut labore et dolore magna aliqua.
                                                        Ut enim ad minim veniam, quis
                                                        nostrud exercitation ullamco
                                                        laboris nisi ut aliquip ex
                                                        ea commodo consequat. Duis
                                                        aute irure dolor in
                                                        reprehenderit in voluptate
                                                        velit esse cillum dolore eu
                                                        fugiat nulla pariatur. Excepteur
                                                        sint occaecat cupidatat non
                                                        proident, sunt in culpa qui
                                                        officia deserunt mollit
                                                        anim id est laborum."
                                                    </Text>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        marginHorizontal: wp(1)
                                                    }}>
                                                        <Checkbox
                                                            status={checked ? 'checked' : 'unchecked'}
                                                            color="#FBC41D"
                                                            onPress={() => {
                                                                setChecked(!checked);
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
                                                            marginVertical: hp(2),
                                                            marginTop: hp(4)
                                                        }}>
                                                        <PrimaryButton
                                                            title='Proceed'
                                                            onclick={() => {
                                                                setEligiabilityModal(true),
                                                                    setTermsAndCondition(false)
                                                            }} />
                                                    </View>
                                                </View> : <></>
                                }
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
                        <BottomModelView>
                            <View style={{
                                marginHorizontal: wp(5),
                                marginVertical: hp(2)
                            }}>
                                <Pressable
                                    onPress={() => setEligiabilityModal(false)}
                                    style={{
                                        backgroundColor: '#EEEEEE',
                                        borderRadius: 20,
                                        width: 35,
                                        height: 35,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginVertical: wp(2),
                                        alignSelf: 'center',
                                        position: 'absolute',
                                        top: hp(-8)
                                    }}>
                                    <Image
                                        source={require('../assets/close.png')}
                                        style={{
                                            height: 15,
                                            width: 15
                                        }} />
                                </Pressable>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                         marginVertical:hp(1)
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
                                        status={checked ? 'checked' : 'unchecked'}
                                        color="#FBC41D"
                                        onPress={() => {
                                            setChecked(!checked);
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
                                            props.navigation.navigate('PaymentScreen')
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
            <ScrollView style={{ flex: 1 }}>
                <View style={{
                    backgroundColor: '#ffffff',
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: wp(5),
                        marginVertical: hp(2)
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
                        <Image
                            source={require('../assets/image(4).png')}
                            style={{
                                height: hp(20),
                                width: wp(90),
                                borderRadius: 15,
                                marginHorizontal: wp(5)
                            }}
                        />
                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginVertical: hp(1),
                            textAlign: 'center',
                            marginBottom: hp(2)
                        }}>Range Rover Sport</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: wp(5) }}>
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
                                }}>29 April, Mon</Text>
                                <Text style={{
                                   color: '#27272780',
                                   fontWeight: '500', 
                                   marginTop: 2,
                                   fontSize:13
                                }}>5:00 AM</Text>
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
                                }}>29 April, Mon</Text>
                                <Text style={{
                                   color: '#27272780',
                                   fontWeight: '500', 
                                   marginTop: 2,
                                   fontSize:13
                                }}>5:00 AM</Text>
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
                                }}>Avinash Naidu</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Text>3.5</Text>
                                    <Rating
                                        readonly
                                        startingValue={3.4}
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
                                    }}>₹ 350</Text>
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
                                    }}>₹ 10</Text>
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
                                    }}>₹ 400</Text>
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
                                    }}>₹ 10</Text>
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
                                    }}>₹ 850</Text>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                </View>
            </ScrollView>
            <View
                style={{
                    backgroundColor: '#27272708',
                    marginVertical: hp(1.2),
                    marginHorizontal: wp(5)
                }}
            >
                <PrimaryButton title='Pay ₹850'
                    onclick={() => setTermsAndCondition(true)} />
            </View>
        </SafeAreaView>
    )
}
export default CarSummaryScreen