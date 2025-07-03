import { Alert, Image, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { Baseprops } from "../utils/navigation";
import { wp, hp } from "../utils/ResponsiveScreen";
import { Cardview } from "../components/Cardview";
import { SafeAreaView } from "react-native-safe-area-context";
import { excuteGetResponse } from "../apis/api";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import moment from "moment";

class Componentprops extends Baseprops { }

const shippingdata = [
    { id: 1, txt: 'Booking Placed', date: 'at 10/08/2025, 10:00AM', state: 'yes' },
    { id: 2, txt: 'Booking Accepted', date: 'at 10/08/2025, 10:00AM', state: 'yes' },
    { id: 3, txt: 'Vehicle Handed Over', date: 'Pending', state: 'No' },
    { id: 4, txt: 'Request for Return', date: 'Pending', state: 'No' },
    { id: 5, txt: 'Extended Service', date: 'Pending', state: 'No' },
    { id: 6, txt: 'Returned', date: 'Pending', state: 'No' }
]

const OrderDetailsScreen: React.FC<Componentprops> = (props) => {

    const [orderDetails, setOrderDetails] = useState<any>(null)
    useFocusEffect(
        useCallback(() => {
            console.log(props.route.params.Id)
            if (props.route.params && props.route.params.Id) {
                handelOrderDetails(props.route.params.Id)
            }
        }, [])
    )

    const handelOrderDetails = async (car_booking_id: any) => {
        const response = await excuteGetResponse(`secure/cars/bookings/details/${car_booking_id}`)
        console.log('orderDetails', response)
        if (response.code == 0) {
            setOrderDetails(response.data)
        } else {
            Alert.alert('Alert', 'unable to get details')
            return
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    margin: wp(5)
                }}>
                    <Pressable onPress={() => props.navigation.goBack()}>
                        <Image
                            source={require('../assets/Back.png')}
                            style={{
                                height: 40,
                                width: 40
                            }} />
                    </Pressable>
                    <Text style={{
                        marginHorizontal: wp(2),
                        fontWeight: 'bold',
                        fontSize: 16
                    }}>Order Details</Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{
                        marginHorizontal: wp(5),
                        marginTop: hp(12)
                    }}>
                        <Cardview>
                            <View style={{ marginBottom: hp(1) }}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                }}>
                                    {orderDetails && <Image
                                        source={{ uri: orderDetails.car_image }}
                                        style={{
                                            position: 'absolute',
                                            height: hp(20),
                                            width: hp(25),
                                            top: hp(-12),
                                            borderRadius: 15
                                        }}
                                    />}
                                    <Text
                                        style={{
                                            marginTop: hp(8.5),
                                            fontSize: 15,
                                            fontWeight: 'bold'
                                        }}>Booking ID : {orderDetails && orderDetails.booking_id}</Text>
                                    <Text
                                        style={{
                                            color: '#64748B',
                                            fontSize: 13,
                                            fontWeight: 'bold',
                                            marginVertical: 3
                                        }}>{orderDetails && orderDetails.brand} {orderDetails && orderDetails.model}</Text>
                                    <Text
                                        style={{
                                            color: '#FBC41D',
                                            fontWeight: 'bold',
                                            fontSize: 15
                                        }}>Rental</Text>
                                </View>
                                <View style={{
                                    borderWidth: 0.5,
                                    marginHorizontal: wp(5),
                                    borderColor: '#64748B',
                                    borderStyle: 'dashed',
                                    marginVertical: hp(1)
                                }} />
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginHorizontal: wp(6)
                                }}>
                                    <Text style={{
                                        color: '#64748B',
                                        fontSize: 15,
                                        fontWeight: '500'
                                    }}>Status :</Text>
                                    <Text
                                        style={{
                                            fontSize: 14,
                                            fontWeight: '500'
                                        }}> {orderDetails && orderDetails.status}</Text>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                    <View
                        style={{
                            marginHorizontal: wp(5)
                        }}>
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
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }}>{orderDetails && moment(orderDetails.from_date).format('DD MMM YYYY')}</Text>
                                    <Text style={{
                                        color: '#27272780',
                                        fontWeight: '500',
                                        marginTop: 2,
                                        fontSize: 13
                                    }}>{orderDetails && moment(orderDetails.from_date).format('HH:MM A')}</Text>
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
                                        fontSize: 14,
                                        fontWeight: 'bold'
                                    }}>{orderDetails && moment(orderDetails.to_date).format('DD MMM YYYY')}</Text>
                                    <Text style={{
                                        color: '#27272780',
                                        fontWeight: '500',
                                        marginTop: 2,
                                        fontSize: 13
                                    }}>{orderDetails && moment(orderDetails.to_date).format('HH:MM A')}</Text>
                                </View>
                            </View>
                        </Cardview>
                    </View>
                    <View style={{
                        marginHorizontal: wp(5),
                        marginVertical: hp(1.5)
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: hp(1)
                        }}>
                            Host Details
                        </Text>
                        <Cardview>
                            <View style={{
                                marginHorizontal: wp(5),
                                marginVertical: hp(2),
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
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
                                    <View style={{
                                        marginHorizontal: wp(3),
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            width: wp(50)
                                        }}>{orderDetails && orderDetails.vendor_name}</Text>
                                        <Text
                                            style={{
                                                fontWeight: '500',
                                                color: '#64748B',
                                                fontSize: 13
                                            }}>{orderDetails && orderDetails.registeration_number}</Text>
                                    </View>
                                </View>
                                <Pressable onPress={() => Linking.openURL(`tel:${orderDetails.vendor_mobile}`)}>
                                    <Image
                                        source={require('../assets/call1.png')}
                                        style={{
                                            height: 45,
                                            width: 45
                                        }} />
                                </Pressable>
                            </View>
                        </Cardview>
                    </View>
                    <View style={{
                        marginBottom: hp(2),
                        marginHorizontal: wp(5)
                    }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: hp(1)
                        }}>Bill Details</Text>
                        <Cardview>
                            <View style={{
                                marginHorizontal: wp(5),
                                marginVertical: hp(2.5)
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
                                    }}>₹ {orderDetails && orderDetails.trip_charges}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(1.5)
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
                                    }}>₹ {orderDetails && orderDetails.taxes}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: hp(1.5)
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
                                    }}>₹ {orderDetails && orderDetails.convenience_fee}</Text>
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
                                    }}>₹ {orderDetails && orderDetails.security_deposite}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginVertical: hp(1.5)
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
                                    }}>₹ {orderDetails && orderDetails.protection_fee}</Text>
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
                                        }}>({orderDetails && orderDetails.offercode})</Text>
                                    </View>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        color: '#FF0000'
                                    }}>-₹ {orderDetails && orderDetails.offer_price}</Text>
                                </View>
                                {
                                    orderDetails && orderDetails.extended_price != null &&
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginVertical: hp(1.5)
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{
                                                color: '#64748B',
                                                textDecorationLine: 'underline'
                                            }}>Extended trip Fee</Text>
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
                                        }}>₹ {orderDetails && orderDetails.extended_price}</Text>
                                    </View>

                                }
                                {
                                    orderDetails && orderDetails.extra_charges != null &&
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginVertical: hp(1.5)
                                    }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={{
                                                color: '#64748B',
                                                textDecorationLine: 'underline'
                                            }}>Extra kms Fee</Text>
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
                                        }}>₹ {orderDetails && orderDetails.extra_charges}</Text>
                                    </View>

                                }
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
                                    }}>₹ {orderDetails && orderDetails.total_price}</Text>
                                </View>

                            </View>
                        </Cardview>
                    </View>
                    <View style={{
                        marginHorizontal: wp(5),
                        marginBottom: hp(4)
                    }}>
                        <Cardview>
                            <View style={{
                                padding: hp(2),
                                marginVertical: hp(1)
                            }}>
                                {orderDetails && orderDetails.timeline.map((e: any, index: any) => (
                                    <View key={index} style={{
                                        flexDirection: 'row',
                                        marginHorizontal: wp(4)
                                    }}>
                                        <View style={{ width: 30, alignItems: 'center' }}>
                                            {index !== orderDetails.timeline.length - 1 && (
                                                <View
                                                    style={{
                                                        top: hp(1.5),
                                                        height: hp(7),
                                                        width: 2,
                                                        backgroundColor:
                                                            orderDetails.timeline[index + 1]?.active_flag === 1 ? '#FBC41D' : '#CBCBCB',
                                                    }}
                                                />
                                            )}

                                            <Image
                                                source={e.active_flag == 1 ?
                                                    require('../assets/true2.png') :
                                                    require('../assets/dot.png')}
                                                style={e.active_flag == 1 ?
                                                    {
                                                        height: 35,
                                                        width: 35,
                                                        position: 'absolute',
                                                    } : {
                                                        height: 30,
                                                        width: 30,
                                                        position: 'absolute',
                                                    }}
                                            />
                                        </View>
                                        <View style={{
                                            marginLeft: wp(4),
                                            marginTop: 2
                                        }}>
                                            <Text
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 'bold'
                                                }}>{e.booking_status}</Text>
                                            <Text style={{
                                                color: '#64748B',
                                                fontSize: 12,
                                                fontWeight: '500'
                                            }}>{e.booking_time}</Text>
                                        </View>
                                    </View>
                                ))}

                            </View>
                        </Cardview>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}
export default OrderDetailsScreen