import {
    Alert,
    Image, Linking, Modal, Pressable,
    ScrollView, Settings, Text, TextInput, View
} from "react-native";
import { Baseprops } from "../utils/navigation";
import { hp, wp } from "../utils/ResponsiveScreen";
import { input } from "../styles/TextInputStyle";
import BottomTabNavigation from "../components/BottomTab";
import { Cardview } from "../components/Cardview";
import { RadioButton } from "react-native-paper";
import { useCallback, useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { BottomModelView } from "../components/BottomModelView";
import { CenterModalView } from "../components/CenterModelView";
import { SafeAreaView } from "react-native-safe-area-context";
import { excuteGetResponse } from "../apis/api";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";

class Componentprops extends Baseprops { }

const RentalsScreen: React.FC<Componentprops> = (props) => {
    const [addressChecked, setAddressChecked] = useState('address');
    const [extendServiceModal, setExtendServiceModal] = useState(false)
    const [rentalData, setRentalData] = useState<any>([])
    const [price, setPrice] = useState<any>('')
    const [carId, setCarId] = useState<any>('')
    const [searchData, setSearchData] = useState<any>('')

    useFocusEffect(
        useCallback(() => {
            handelRentalDetails()
        }, [])
    )

    const handelRentalDetails = async () => {
        const response = await excuteGetResponse(`secure/cars/bookings`)
        console.log('Rental details', response)
        if (response.code == 0) {
            setRentalData(response.data)
        } else {

            Alert.alert(
                'Alert',
                'Unable to get Rental Details',
                [
                    { text: 'Login your account', onPress: () => console.log('Login pressed') }
                ]
            );
        }
    }
    const handelPayment = async (booking_car_id: any) => {
        const response = await excuteGetResponse(`secure/cars/payment/${booking_car_id}`)
        console.log('payment', response)
        if (response.code == 0) {
            props.navigation.navigate('PaymentSuccessScreen',
                { id: response.data.booking_id, price: response.data.total_price })
        } else {
            Alert.alert('Alert', 'unable to get Booking Payment Details')
        }

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                extendServiceModal &&
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
                                            borderColor: '#FBC41D',
                                            marginHorizontal: wp(2)
                                        }}>
                                        <Text style={{
                                            color: '#FBC41D',
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
                                            borderColor: '#FBC41D',
                                            backgroundColor: '#FBC41D',
                                            marginHorizontal: wp(2)
                                        }}>
                                        <Text style={{
                                            fontWeight: '500'
                                        }}>Extend Now</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </CenterModalView>
                    </Modal>
                </View>
            }
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
                                        style={{ marginVertical: hp(1.5) }}>
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
                                                    }}>{moment(e.from_date).format('DD MMM YYYY HH:DD A')} -
                                                    {moment(e.to_date).format('DD MMM YYYY HH:DD A')}</Text>
                                            </View>
                                        </Cardview>
                                    </Pressable> :
                                    e.status == 'ACCEPTED' ?
                                        <Pressable
                                            onPress={() => props.navigation.navigate('OrderDetailsScreen', { Id: e.car_booking_id })}
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
                                                            Delivery date :{moment(e.to_date).format('DD MMM YYYY HH:DD A')}
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
                                                            <Pressable onPress={() => Linking.openURL(`tel${e.vendor_mobile}`)}>
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
                                                            onPress={() => setAddressChecked('address')}
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
                                            </Cardview>
                                        </Pressable> :
                                        e.status == 'ONGOING' ?
                                            <Pressable
                                                onPress={() => props.navigation.navigate('OrderDetailsScreen', { Id: e.car_booking_id })}
                                                style={{
                                                    marginVertical: hp(1.5)
                                                }}>
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

                                                                }}> {moment(e.to_date).format('DD MMM YYYY HH:DD A')}
                                                            </Text>
                                                        </View>
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
                                                    </View>
                                                </Cardview>
                                            </Pressable>
                                            : e.status == 'COMPLETED' ?
                                                <Pressable
                                                    onPress={() => props.navigation.navigate('OrderDetailsScreen', { Id: e.car_booking_id })}
                                                    style={{ marginVertical: hp(1.5) }}>
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
                                                                }}>{moment(e.from_date).format('DD MMM YYYY HH:DD A')}
                                                                - {moment(e.to_date).format('DD MMM YYYY HH:DD A')}</Text>
                                                            <View style={{
                                                                marginBottom: hp(2),
                                                                marginHorizontal: wp(10)
                                                            }}>
                                                                <PrimaryButton
                                                                    title='Rate your Experience'
                                                                    onclick={() => props.navigation.navigate('RattingScreen', { id: e.car_booking_id })} />
                                                            </View>
                                                        </View>
                                                    </Cardview>
                                                </Pressable>
                                                : e.status == 'EXTEND' ?
                                                    <Pressable
                                                        onPress={() => props.navigation.navigate('OrderDetailsScreen', { Id: e.car_booking_id })}
                                                        style={{
                                                            marginVertical: hp(1.5)
                                                        }}>
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

                                                                        }}> {moment(e.extended_date).format('DD MMM YYYY HH:DD A')}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                        </Cardview>
                                                    </Pressable>
                                                    : e.status == 'EXTENDED' ?
                                                        <Pressable
                                                            onPress={() => props.navigation.navigate('OrderDetailsScreen', { Id: e.car_booking_id })}
                                                            style={{
                                                                marginVertical: hp(1.5)
                                                            }}>
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
                                                                            Extended Time :
                                                                        </Text>
                                                                        <Text
                                                                            style={{
                                                                                fontSize: 12,
                                                                                fontWeight: 'bold',

                                                                            }}> {moment(e.extended_date).format('DD MMM YYYY HH:DD A')}
                                                                        </Text>
                                                                    </View>
                                                                    {
                                                                        e.submit_flag == 1 ?
                                                                            <View style={{
                                                                                marginBottom: hp(2),
                                                                                marginHorizontal: wp(10)
                                                                            }}>
                                                                                <Pressable
                                                                                    onPress={() => {
                                                                                        handelPayment(e.car_booking_id)
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